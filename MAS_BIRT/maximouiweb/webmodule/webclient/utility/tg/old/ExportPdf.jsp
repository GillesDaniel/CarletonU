<%--
/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
--%>

<%@page import="java.util.Collections"%>
<%
//------------------------------------------------------------------------------------------------------------------
try 
{
   java.util.concurrent.ExecutorService threadPool = java.util.concurrent.Executors.newCachedThreadPool();

   // --- Initialization ---
   boolean win = java.lang.System.getProperty("os.name").toLowerCase().indexOf("windows")>=0; // true = on windows, false on linux
   String arch = System.getProperty("os.arch");
   final String BaseUrl = psdi.server.MXServer.getMXServer().getProperty("skd.pdf.export.baseurl");
   String requestURL = (request.getRequestURL()+"").replaceAll("[^\\/\\\\]*$","");
   if (BaseUrl != null && BaseUrl.length() > 0)
   {
	   String requestBaseURL = requestURL.substring(0, requestURL.indexOf("/webclient"));
	   requestURL = requestURL.replaceAll(requestBaseURL, BaseUrl);
   }
   final String Url = requestURL;
   String name = request.getParameter("PDFName"); name = name==null || name.equals("") ? request.getParameter("File")+".pdf" : name+"."+request.getParameter("PDFFormat");
   final String finalName = name;
   final String Path = request.getRealPath(request.getServletPath().replaceAll("[^\\/\\\\]*$","")) + java.io.File.separator;
   String ProjectName = request.getParameter("ProjectName");
   final String OutputPath = psdi.server.MXServer.getMXServer().getProperty("mxe.doclink.doctypes.defpath") + java.io.File.separatorChar + "PDF" + java.io.File.separator + ProjectName + java.io.File.separator;

   java.io.File outputPathDir = new java.io.File(OutputPath);
   if (!outputPathDir.exists())
	   outputPathDir.mkdirs();

   String[] duplicates = outputPathDir.list(new java.io.FilenameFilter() {
	   public boolean accept(java.io.File dir, String fileName)
	   {
		   if (!fileName.contains(".pdf"))
			   return false;
		   String preffixName = fileName.substring(0, fileName.indexOf(".pdf"));
		   String preffiFinalName = finalName.substring(0, finalName.indexOf(".pdf"));
	   	   return preffixName.startsWith(preffiFinalName);
	   }
   });
   java.util.List<String> dupFiles = null;
   if (duplicates != null)
   {
	   dupFiles = java.util.Arrays.asList(duplicates);
   }
   else
   {
	   dupFiles = java.util.Collections.emptyList();
   }
   java.util.Collections.sort(dupFiles);
   name = name.substring(0, name.indexOf(".pdf")) + "(" + dupFiles.size() + ").pdf";

   final String PdfName = name;

   java.io.FileWriter W = new java.io.FileWriter(OutputPath+name+".PROCESSING");
   W.close();
   
   request.setCharacterEncoding("utf-8");
   String xmlData = request.getParameter("Data");
   xmlData = xmlData.replaceAll("&quot;", "\"");
   xmlData = xmlData.replaceAll("&amp;", "&");
   final String decodedXmlData = xmlData;

   final String Source = request.getParameter("Source");
   // --- Options ---
   final String [] Sizes = new String[] {"Custom","Letter","Legal","Ledger","A0","A1","A2","A3","A4","A5","A6","A7","A8","A9" };
   final String Size = Sizes[Integer.valueOf(request.getParameter("PDFPageSize"))];
   final String [] Orientations = new String[] {"Portrait","Landscape"};
   final String Orientation = Orientations[Integer.valueOf(request.getParameter("PDFPageOrientation"))];
   final int MarginWidth = Integer.valueOf(request.getParameter("PrintMarginWidth")) / 2;
   final int MarginHeight = Integer.valueOf(request.getParameter("PrintMarginHeight")) / 2;
   final int DPI = Integer.valueOf(request.getParameter("PrintDPI"));

   // --- Init the exec ---
   final String WKHtmlToPdfTool = psdi.server.MXServer.getMXServer().getProperty("skd.pdf.converter.path");
   final String App = (win?"":"/usr/bin/xvfb-run -a ") + WKHtmlToPdfTool;
   String Layoutxml = request.getParameter("Layoutxml");
   String Dataxml = request.getParameter("Dataxml");
   Layoutxml = Layoutxml.replaceAll("&#037;", "%");
   Layoutxml = Layoutxml.replaceAll("&amp;", "&");
   Dataxml = Dataxml.replaceAll("&#037;", "%");
   Dataxml = Dataxml.replaceAll("&amp;", "&");
   
   final String DecodedLayoutxml = Layoutxml;
   final String DecodedDataxml = Dataxml;
   
   String cookieStr = "";
   for (int i=0; i<request.getCookies().length; i++) {
	   cookieStr += request.getCookies()[i].getName() + "=" + request.getCookies()[i].getValue() + ";";
   }
   final String allCookies = cookieStr;
   
   Runnable exportThread = new Runnable() {
	   public void run()
	   {
		   try
		   {
			   // --- Writes configuration received from client ---
			   String Cfg = null; while(Cfg==null||new java.io.File(Path+Cfg).isFile()) Cfg = "Temp_"+Math.abs((new java.util.Random()).nextInt())+".xml";
			   try {
			      java.io.FileWriter W = new java.io.FileWriter(Path+Cfg);
			      W.write(decodedXmlData);
			      W.close();
			   } catch(Exception E) { System.out.print("Cannot write to directory "+Path); return; }

			   // --- Writes Layoutxml to temporary file ---
			   String LayoutxmlTemp = null; while(LayoutxmlTemp==null||new java.io.File(Path+LayoutxmlTemp).isFile()) LayoutxmlTemp = "TempLayout_"+Math.abs((new java.util.Random()).nextInt())+".xml";
			   try {
			      java.io.FileWriter layoutTempW = new java.io.FileWriter(Path+LayoutxmlTemp);
			      java.net.URL LayoutURL = new java.net.URL(DecodedLayoutxml);
			      java.net.URLConnection conn = LayoutURL.openConnection();
			      conn.addRequestProperty("Cookie", allCookies);
			      java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
			      String line;
			      while ((line = reader.readLine()) != null) {
			    	  layoutTempW.write(line);
			      }
			      reader.close();
			      layoutTempW.close();
			   } catch(Exception E) { System.out.print("Cannot write to directory "+Path); return; }

			   // --- Writes Dataxml to temporary file ---
			   String DataxmlTemp = null; while(DataxmlTemp==null||new java.io.File(Path+DataxmlTemp).isFile()) DataxmlTemp = "TempData_"+Math.abs((new java.util.Random()).nextInt())+".xml";
			   try {
			      java.io.FileWriter dataTempW = new java.io.FileWriter(Path+DataxmlTemp);
			      java.net.URL DataURL = new java.net.URL(DecodedDataxml);
			      java.net.URLConnection conn = DataURL.openConnection();
			      conn.addRequestProperty("Cookie", allCookies);
			      java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
			      String line;
			      while ((line = reader.readLine()) != null) {
			    	  dataTempW.write(line);
			      }
			      reader.close();
			      dataTempW.close();
			   } catch(Exception E) { System.out.print("Cannot write to directory "+Path); return; }

			   String Arg = " -q -s " + Size + " --javascript-delay 1000 --disable-smart-shrinking -O " + Orientation + " -B " + MarginHeight + " -L " + MarginWidth + " -R " + MarginWidth + " -T " + MarginHeight + " " + Url + Source + "?" + LayoutxmlTemp + "@" + DataxmlTemp + "@@" + "tg/" + Cfg + "@" + DPI;

			   int Step = 50; // Set Step to number of pages to split large files by these pages and merge the resulted PDFs later, usual value is 50 ~ 100 ---

			   // --- Multiple conversions for very large files ---
			   if(Step>0){

			      // --- Converts given pages from HTML to PDF ---
			      String[] Out = new String[1000]; 
			      int i = 0;
			      for(;i<1000;i++){
			         String O = null; while(O==null||new java.io.File(OutputPath+O).isFile()) O = "TempPages_" + Math.abs((new java.util.Random()).nextInt()) + ".pdf";
			         Out[i] = O;
			         System.out.println(App + Arg + "@" + (i*Step+1) + "@" + (i*Step+Step) + " " + OutputPath + O);
			         java.lang.Process P = java.lang.Runtime.getRuntime().exec(App + Arg + "@" + (i*Step+1) + "@" + (i*Step+Step) + " " + OutputPath + O);
			         P.waitFor();
			         System.out.println("Exit Code: " + P.exitValue());
			         if (P.exitValue() != 0 && P.exitValue() != 1 && P.exitValue() != 2) { 
			        	System.out.print("WKHtmlToPdf failed with exit code " + P.exitValue());
			            new java.io.File(Path+Cfg).delete();         // Deletes the temporary file with configuration and changes
			            for (int j = 0; j <= i; j++) new java.io.File(OutputPath+Out[j]).delete(); // Deletes the temporary PDF files
			            return; 
			            }
			         if(P.exitValue()==1) break;               // Exit code 1 means that it produced empty file because no pages were to export
			         }
			      new java.io.File(Path+Cfg).delete();         // Deletes the temporary file with configuration and changes

			      // --- Merges the resulted PDF ---
			      if(i>1){
			         String arg = "";
			         for(int j=0;j<i;j++) arg += " "+OutputPath+Out[j];
			         System.out.println("java -jar " + Path + "." + java.io.File.separator + "PdfBox" + java.io.File.separator + "pdfbox-app-2.0.24.jar PDFMerger "+arg+" "+OutputPath+PdfName);
			         java.lang.Process P = java.lang.Runtime.getRuntime().exec("java -jar " + Path + "." + java.io.File.separator + "PdfBox" + java.io.File.separator + "pdfbox-app-2.0.24.jar PDFMerger "+arg+" "+OutputPath+PdfName);
			         P.waitFor();
			         System.out.println("Exit Code: " + P.exitValue());
			         for (int j = 0; j <= i; j++) new java.io.File(OutputPath+Out[j]).delete(); // Deletes the temporary PDF files
			         if (P.exitValue() != 0) {
			            System.out.print("Pdf merge failed with exit code " + P.exitValue());
			            return; 
			            }
			         }
			      	else {
			      		new java.io.File(OutputPath+Out[0]).renameTo(new java.io.File(OutputPath+PdfName)); // Renaming PDF file
			      	}
			      }
			   
			   // --- Standard single HTML to PDF conversion ---
			   else {
			      System.out.println(App + Arg + " " + OutputPath + PdfName);
			      java.lang.Process P = java.lang.Runtime.getRuntime().exec(App + Arg + " " + OutputPath + PdfName);
			      P.waitFor();
			      System.out.println("Exit Code: " + P.exitValue());
			      if (P.exitValue() != 0 && P.exitValue() != 1 && P.exitValue() != 2) { System.out.print("WKHtmlToPdf failed with exit code " + P.exitValue()); return; }
			      new java.io.File(Path+Cfg).delete();         // Deletes the temporary file with configuration and changes
			      }

			   new java.io.File(OutputPath+PdfName).renameTo(new java.io.File(OutputPath+PdfName+".READY")); // Renaming PDF file to add .READY suffix
			   new java.io.File(OutputPath+PdfName+".PROCESSING").delete(); // Deletes the temporary PDF.
			   new java.io.File(Path+LayoutxmlTemp).delete(); // Deletes the temporary Layoutxml file
			   new java.io.File(Path+DataxmlTemp).delete(); // Deletes the temporary Dataxml file			   
		   }
		   catch(Exception E)
		   {
			  try
			  {
				  new java.io.File(OutputPath+PdfName+".PROCESSING").delete(); // Deletes the temporary PDF.
				  java.io.FileWriter W = new java.io.FileWriter(OutputPath+PdfName+".FAILED");
				  W.close();
			  }
			  catch (Exception writeE)
			  {
				  writeE.printStackTrace();
			  }
		      E.printStackTrace();
		   }
	   }
   };
   threadPool.submit(exportThread);
   response.setStatus(200);
}
catch(Exception E)
{
   E.printStackTrace();
}
//------------------------------------------------------------------------------------------------------------------
%>
