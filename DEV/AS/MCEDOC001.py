#BPD Gallery Config
# Launch Point Object / Doclinks / Initialize Value
# Author PIRVING 2020
# Requires additional attribute DOCLINKS.BPDIMG, SAME AS LDTEXT
# Requires relationship from DOCLINKS to DOCLINKS called BPDGALLERY
# docinfoid in (select docinfoid from docinfo where docinfoid in 
# (select docinfoid from doclinks where ownertable=:ownertable and ownerid=:ownerid) 
# and lower(right(urlname,3)) in ('pdf','txt','gif','jpg','bmp','png'))
from java.net import URLEncoder
from psdi.iface.util import XMLUtils
from javax.xml.bind import DatatypeConverter

from com.ibm.tivoli.maximo.cos import COSApi

try:
    if mbo.getString("MCEIMG") == "":
        secureAttach = service.getProperty("mxe.doclink.securedAttachment")
        topLevelFilePath = service.getProperty("mxe.doclink.doctypes.topLevelPaths")
        isCos = False
            
        if "cos:doclinks" in str(topLevelFilePath).lower():
            isCos = True
            
        if secureAttach == "true":
            
            if isCos == True:
                cosApi = COSApi(False)
                bucketname = service.getProperty("mxe.cosbucketname")
                urlString = mbo.getString("URLNAME").split("/")
                fileName = urlString[-1]
                attachedDoc = cosApi.getFile(bucketname,fileName)
                urlName = str(fileName)
                
            else:
                urlName = mbo.getString("URLNAME")
                #Get Byte Information
                attachedDoc = XMLUtils.readXMLFileToBytes(urlName)
            
            #Encode Byte Information
            origString = DatatypeConverter.printBase64Binary(attachedDoc)
            
            try:
                imageStr = "<div>"
                if urlName.lower().endswith("jpg") or urlName.lower().endswith("gif") or urlName.lower().endswith("png"):
                    imageStr = "<a href=\""
                    imageStr = imageStr + urlName
                    imageStr = imageStr + "\" target=\"_blank\">"
                    imageStr = imageStr + "<img style=\"max-height:990px; max-width:990px\" alt=\"\" src=\""
                    imageStr = imageStr + "data:image/png;base64," 
                    imageStr = imageStr + str(origString)
                    imageStr = imageStr + "\" />"
                    imageStr = imageStr + "</a></div>"
                elif urlName.endswith("pdf"):
                    imageStr = imageStr + '<embed id="plugin" width="95%" height="95%" src="data:application/pdf;base64,'+str(origString)+'" headers="Accept-Ranges: bytes Connection: keep-alive Content-Type: application/pdf" background-color="0xFF525659" top-toolbar-height="56" javascript="allow" full-frame=""></div>'
                elif urlName.endswith("txt"):
                    imageStr = imageStr + '<embed id="plugin" width="95%" height="95%" src="data:text/plain;base64,'+str(origString)+'" headers="Accept-Ranges: bytes Connection: keep-alive Content-Type: text/plain" background-color="0xFF525659" top-toolbar-height="56" javascript="allow" full-frame=""></div>'
                    service.log_debug("Debug message")
                    service.log_debug("ERROR img_str" + str(imageStr))
            except:
                print imageStr
                imageStr = "<div><p>Secure Document cannot be displayed</p></div>"
                mbo.setValue("MCEIMG",imageStr,10L)
                
            mbo.getMboValue("MCEIMG").setToBeValidated(False)
            mbo.setValue("MCEIMG",imageStr,10L)
            mbo.getMboValue("MCEIMG").setToBeValidated(False)
        else:
            try:
                weburl = mbo.getString("WEBURL")
                #weburl = weburl.replace("\xa0", " ")
                weburl = weburl.replace("&amp;", "&")
                
                def replaceSymbols(text):
                    urlParts = text.rsplit('/', 1)
                    urlPrefix = urlParts[0] + '/'
                    restOfText = urlParts[1]
                    urlEncodedRest = ""
                    
                    for char in restOfText:
                        if char.isalnum() or char in ['-', '_', '.', '~']:
                            urlEncodedRest += char
                        else:
                            urlEncodedChar = URLEncoder.encode(char, "UTF-8")
                            urlEncodedRest += urlEncodedChar
                    return urlPrefix + urlEncodedRest
                    
                weburl = str(replaceSymbols(weburl))
                
                try:
                    weburlnobrack = weburl.replace('(','%28').replace(')','%29')
                except:
                    weburlnobrack=weburl;

                imageStr = "<div>"

                if weburl.lower().endswith("jpg") or weburl.lower().endswith("gif") or weburl.lower().endswith("png"):
                    imageStr = "<a href=\""
                    imageStr = imageStr + weburlnobrack
                    imageStr = imageStr + "\" target=\"_blank\">"
                    imageStr = imageStr + "<img style=\"max-height:990px; max-width:990px\" alt=\"\" src=\""
                    imageStr = imageStr + weburlnobrack
                    imageStr = imageStr + "\" />"
                    imageStr = imageStr + "</a></div>"
                elif weburl.endswith("pdf"):
                    imageStr = imageStr + '<embed id="plugin" width="95%" height="95%" src="'+weburl+'" headers="Accept-Ranges: bytes Connection: keep-alive Content-Type: application/pdf" background-color="0xFF525659" top-toolbar-height="56" javascript="allow" full-frame=""></div>'
                elif weburl.endswith("txt"):
                    imageStr = imageStr + '<embed id="plugin" width="95%" height="95%" src="'+weburl+'" headers="Accept-Ranges: bytes Connection: keep-alive Content-Type: text/plain" background-color="0xFF525659" top-toolbar-height="56" javascript="allow" full-frame=""></div>'

                print ""
                print imageStr
                print ""
                mbo.setValue("MCEIMG",imageStr,10L)
            except:
                imageStr = "<div><p>Document cannot be displayed</p></div>"
                mbo.setValue("MCEIMG",imageStr,10L)
    else:
        print mbo.getString("MCEIMG")
except:
    print ("The MCEDOC001 script is throwing an error. Please contact your system administrator")