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
<%! public void rmdir(String dirStr) {
		java.io.File dir = new java.io.File(dirStr);
		if (dir == null || !dir.exists())
			return;
		java.io.File[] F = dir.listFiles();
		if (F == null)
			return;
		for(java.io.File f : F) { 
			if (f.isDirectory())
				rmdir(f.getAbsolutePath());
			else
				f.delete();
		}
		dir.delete();
	} // Deletes the directory with subdirectories %>
<%
// -------------------------------------------------------------------------------------------------------------------------------
// Application that prints TreeGrid and exports it to PDF
// It uses Google Chrome Headless as command line tool
// -------------------------------------------------------------------------------------------------------------------------------
try 
{
   final boolean win = java.lang.System.getProperty("os.name").toLowerCase().indexOf("windows")>=0; // true = on windows, false on linux
   java.util.concurrent.ExecutorService threadPool = java.util.concurrent.Executors.newCachedThreadPool();
   final String Chrome = psdi.server.MXServer.getMXServer().getProperty("skd.pdf.converter.path");
   String timeoutProperty = psdi.server.MXServer.getMXServer().getProperty("skd.pdf.export.timeout");
   int timeout = timeoutProperty != null && timeoutProperty.length() > 0 ? Integer.parseInt(timeoutProperty) : 1; // Default timeout is 1 minute.
   final int calculatedTimeout = timeout * 60 * 10; // Convert to seconds

   // --- Initialization ---
   String ProjectName = request.getParameter("ProjectName");
   final String OutputPath = psdi.server.MXServer.getMXServer().getProperty("mxe.doclink.doctypes.defpath") + java.io.File.separatorChar + "PDF" + java.io.File.separator + ProjectName + java.io.File.separator;
   
   final String BaseUrl = psdi.server.MXServer.getMXServer().getProperty("skd.pdf.export.baseurl");
   String requestURL = (request.getRequestURL()+"").replaceAll("[^\\/\\\\]*$","");
   System.out.println("Request URL : " + requestURL);
   if (BaseUrl != null && BaseUrl.length() > 0)
   {
	   String requestBaseURL = requestURL.substring(0, requestURL.indexOf("/webclient"));
	   requestURL = requestURL.replaceAll(requestBaseURL, BaseUrl);
   }
   final String Url = requestURL;
   System.out.println("URL : " + Url);
   String name = request.getParameter("PDFName"); name = name==null || name.equals("") ? request.getParameter("File")+".pdf" : name+"."+request.getParameter("PDFFormat");
   final String finalName = name;
   String currentPath = psdi.server.MXServer.getMXServer().getProperty("skd.pdf.export.basedir");
   if (currentPath == null || currentPath.length() == 0)
   {
	   currentPath = application.getRealPath(request.getServletPath().replaceAll("[^\\/\\\\]*$",""));
   }
   final String Path = currentPath + java.io.File.separator;

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
   if (dupFiles.size() > 0)
   {
	   name = name.substring(0, name.indexOf(".pdf")) + "(" + dupFiles.size() + ").pdf";
   }

   final String PdfName = name;

   java.io.FileWriter W = new java.io.FileWriter(OutputPath+name+".PROCESSING");
   W.close();
   
   request.setCharacterEncoding("utf-8");
   String xmlData = request.getParameter("Data");
   xmlData = xmlData.replaceAll("&quot;", "\"");
   xmlData = xmlData.replaceAll("&amp;", "&");
   final String decodedXmlData = xmlData;
   
   String Layoutxml = request.getParameter("Layoutxml");
   String Dataxml = request.getParameter("Dataxml");
   Layoutxml = Layoutxml.replaceAll("&#037;", "%");
   Layoutxml = Layoutxml.replaceAll("&amp;", "&");
   Dataxml = Dataxml.replaceAll("&#037;", "%");
   Dataxml = Dataxml.replaceAll("&amp;", "&");

   if (BaseUrl != null && BaseUrl.length() > 0)
   {
	   String requestBaseURL = Layoutxml.substring(0, Layoutxml.indexOf("/ui"));
	   Layoutxml = Layoutxml.replaceAll(requestBaseURL, BaseUrl);
	   requestBaseURL = Dataxml.substring(0, Dataxml.indexOf("/ui"));
	   Dataxml = Dataxml.replaceAll(requestBaseURL, BaseUrl);
   }
   
   final String decodedLayoutxml = Layoutxml;
   final String decodedDataxml = Dataxml;

   String cookieStr = "";
   for (int i=0; i<request.getCookies().length; i++) {
	   cookieStr += request.getCookies()[i].getName() + "=" + request.getCookies()[i].getValue() + ";";
   }
   final String allCookies = cookieStr;

   final String Source = request.getParameter("Source");
   final String PrintDPI = request.getParameter("PrintDPI");
   final String PrintPageWidth = request.getParameter("PrintPageWidth");
   final String PrintPageHeight = request.getParameter("PrintPageHeight");
   final String PrintMarginWidth = request.getParameter("PrintMarginWidth");
   final String PrintMarginHeight = request.getParameter("PrintMarginHeight");
   final String PDFFitPage = request.getParameter("PDFFitPage");
   
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
			   } 
			   catch(Exception E) {
				   E.printStackTrace();
				   System.out.print("<h3>PDF export error!</h3>Cannot write to directory "+Path);
				   rmdir(OutputPath+"Default");	// Deletes the whole temporary directory
				   return;
			   }

			   // --- Writes Layoutxml to temporary file ---
			   String LayoutxmlTemp = null; while(LayoutxmlTemp==null||new java.io.File(Path+LayoutxmlTemp).isFile()) LayoutxmlTemp = "TempLayout_"+Math.abs((new java.util.Random()).nextInt())+".xml";
			   try {
			      java.io.FileWriter layoutTempW = new java.io.FileWriter(Path+LayoutxmlTemp);
			      java.net.URL LayoutURL = new java.net.URL(decodedLayoutxml);
			      java.net.URLConnection conn = LayoutURL.openConnection();
			      conn.addRequestProperty("Cookie", allCookies);
			      java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
			      String line;
			      while ((line = reader.readLine()) != null) {
			    	  layoutTempW.write(line);
			      }
			      reader.close();
			      layoutTempW.close();
			   } catch(Exception E) { 
				   E.printStackTrace();
				   System.out.print("Cannot write to directory "+Path);
				   return;
			   }

			   // --- Writes Dataxml to temporary file ---
			   String DataxmlTemp = null; while(DataxmlTemp==null||new java.io.File(Path+DataxmlTemp).isFile()) DataxmlTemp = "TempData_"+Math.abs((new java.util.Random()).nextInt())+".xml";
			   try {
			      java.io.FileWriter dataTempW = new java.io.FileWriter(Path+DataxmlTemp);
			      java.net.URL DataURL = new java.net.URL(decodedDataxml);
			      java.net.URLConnection conn = DataURL.openConnection();
			      conn.addRequestProperty("Cookie", allCookies);
			      java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
			      String line;
			      while ((line = reader.readLine()) != null) {
			    	  dataTempW.write(line);
			      }
			      reader.close();
			      dataTempW.close();
			   } catch(Exception E) {
				   E.printStackTrace();
				   System.out.print("Cannot write to directory "+Path);
				   return;
			   }

			   // --- Runs the conversion ---
			   String Arg = "--headless --no-sandbox --allow-running-insecure-content --ignore-certificate-errors --disable-gpu --user-data-dir="+OutputPath+" "+Url+Source+"?"+Url+Cfg+"@"+LayoutxmlTemp+"@"+DataxmlTemp+"@"+PrintDPI+"@"+PrintPageWidth+"@"+PrintPageHeight+"@"+PrintMarginWidth+"@"+PrintMarginHeight+"@"+PDFFitPage;

			   int Step = 50; // Set Step to number of pages to split large files by these pages and merge the resulted PDFs later, usual value is 50 ~ 100 ---
			   int EmptyPDF = 20;
			   // --- Multiple conversions for very large files ---
			   if(Step>0) {
					String[] Out = new String[1000]; 
				    int k = 0, cnt = 0, len = -1;
				    int tempFilesCounter = 0;
				    for (;k<10;k++){
				        String O = null; while(O==null||new java.io.File(OutputPath+"/"+O).isFile()) O = "TempPages_" + Math.abs((new java.util.Random()).nextInt()) + ".pdf";
				        Out[k] = O;

						String stepArgs = Arg + "@" + (k*Step+1) + "@" + (k*Step+Step);
						System.out.println("Command: " + Chrome + " " + stepArgs);
						String[] args = stepArgs.split(" ");
						java.util.List<String> listArgs = new java.util.ArrayList<String>();
						listArgs.add(Chrome);
						listArgs.add("--print-to-pdf="+OutputPath+O);
						listArgs.addAll(java.util.Arrays.asList(args));

				        java.lang.Process P = java.lang.Runtime.getRuntime().exec(listArgs.toArray(new String[0]));

				        for (int i=0;i<calculatedTimeout;i++){ // Waits maximally 50 seconds
				            //if(P.waitFor((long)500,java.util.concurrent.TimeUnit.MILLISECONDS)) break; // JAVA 8
				            java.lang.Thread.sleep(100); try { P.exitValue(); break; } catch (Exception E) { } // JAVA 7
				            if(new java.io.File(OutputPath+O).isFile()){ // Checks if the file already exists, because Chrome sometimes creates successfully the file, but hangs after that
				               try {
				                  java.io.FileWriter F = new java.io.FileWriter(OutputPath+"/"+O,true);
				                  F.close();
				                  P.destroy();
				                  P.waitFor();
				                  P = null;
				                  break;
				                  }
				               catch (Exception E) { }
				               }
				         }
				         try {
				        	 if(P!=null && P.exitValue()!=0) {
				        	 	System.out.println("<h3>PDF export error!</h3>Chrome failed with exit code: "+P.exitValue());
				        	 	new java.io.File(Path+Cfg).delete();
				        	 	rmdir(OutputPath+"Default");          // Deletes the whole temporary directory
				        	 	return; 
				        	 }
				         }
				         catch (Exception E) { 
				        	 E.printStackTrace();
				        	 P.destroy();
				        	 P.waitFor();
				        	 System.out.println("<h3>PDF export error!</h3>Timeout expired.<br>Command line: " + Chrome + " " + Arg);
				        	 new java.io.File(Path+Cfg).delete();
				        	 rmdir(OutputPath+"Default");          // Deletes the whole temporary directory
				        	 return;
				         }
				         tempFilesCounter = k;
				         int l = (int) new java.io.File(OutputPath+O).length() / 1000;
				         if ((l==len || l==EmptyPDF) && ++cnt==2) {
				         	break;
				         } // OK, 3 empty pages on the end, finishes the loop
				         len = l;
				    }
				    new java.io.File(Path+Cfg).delete();         // Deletes the temporary file with configuration and changes

				    // --- Merges the resulted PDF ---
				    if(k>1){
				       String arg = "";
				       for(int j=0;j<k;j++) arg += " "+OutputPath+Out[j];
				       System.out.println("java -Dsun.java2d.cmm=sun.java2d.cmm.kcms.KcmsServiceProvider -jar " + (win ? "\"" : "") + Path + "." + java.io.File.separator + "PdfBox" + java.io.File.separator + "pdfbox-app-2.0.24.jar" + (win ? "\"" : "") + " PDFMerger "+arg+" "+OutputPath+PdfName);
				       java.lang.Process P = java.lang.Runtime.getRuntime().exec("java -Dsun.java2d.cmm=sun.java2d.cmm.kcms.KcmsServiceProvider -jar " + (win ? "\"" : "") + Path + "." + java.io.File.separator + "PdfBox" + java.io.File.separator + "pdfbox-app-2.0.24.jar" + (win ? "\"" : "") + " PDFMerger "+arg+" "+OutputPath+PdfName);
				       P.waitFor();
				       for (int j = 0; j <= tempFilesCounter; j++) new java.io.File(OutputPath+Out[j]).delete(); // Deletes the temporary PDF files
				       if (P.exitValue() != 0) {
				    	   rmdir(OutputPath+"Default");          // Deletes the whole temporary directory
					       System.out.print("Pdf merge failed with exit code " + P.exitValue());
					       return; 
					   }
					}
					else 
					{
					   new java.io.File(OutputPath+Out[0]).renameTo(new java.io.File(OutputPath+PdfName)); // Renaming PDF file
				    }
			   }
			   else
			   {
				    System.out.println("Command: " + Chrome + " " + Arg);
				    String[] args = Arg.split(" ");
				    java.util.List<String> listArgs = new java.util.ArrayList<String>();
				    listArgs.add(Chrome);
				    listArgs.add("--print-to-pdf="+OutputPath+PdfName);
				    listArgs.addAll(java.util.Arrays.asList(args));
	 			    java.lang.Process P = java.lang.Runtime.getRuntime().exec(listArgs.toArray(new String[0]));

				    for(int i=0;i<calculatedTimeout;i++){ // Waits maximally two minutes, increase if exporting very large files
					    //if(P.waitFor((long)500,java.util.concurrent.TimeUnit.MILLISECONDS)) break; // JAVA 8
					    java.lang.Thread.sleep(240);
					    try {
					    	P.exitValue();
					    	break;
					      } catch (Exception E) {
					      } // JAVA 7
					      if(new java.io.File(OutputPath+PdfName).isFile()){ // Checks if the file already exists, because Chrome sometimes creates successfully the file, but hangs after that
					         try {
					            java.io.FileWriter F = new java.io.FileWriter(OutputPath+PdfName,true);
					            F.close();
					            P.destroy();
					            P.waitFor();
					            P = null;
					            break;
					         }
					         catch (Exception E) { }
					      }
					}
			   }

			   new java.io.File(OutputPath+PdfName).renameTo(new java.io.File(OutputPath+PdfName+".READY")); // Renaming PDF file to add .READY suffix
	           new java.io.File(OutputPath+PdfName+".PROCESSING").delete(); // Deletes the temporary PDF.
	           rmdir(OutputPath+java.io.File.separator+"Default"); // Deletes the temporary PDF.
			   new java.io.File(Path+LayoutxmlTemp).delete(); // Deletes the temporary Layoutxml file
			   new java.io.File(Path+DataxmlTemp).delete(); // Deletes the temporary Dataxml file			   
		   }
		   catch(Exception E)
		   {
			  try
			  {
				  new java.io.File(OutputPath+PdfName+".PROCESSING").delete(); // Deletes the temporary PDF.
				  rmdir(OutputPath+java.io.File.separator+"Default"); // Deletes the temporary PDF.
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
} catch(Exception E)
{
   E.printStackTrace();
}
//------------------------------------------------------------------------------------------------------------------
%>
