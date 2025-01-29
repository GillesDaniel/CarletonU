###########################################################################################################
# PROPERTY OF BPD ZENITH                                                                                  #
# AUTHOR P IRVING                                                                                         #
# DATE 05/11/2020                                                                                         #
###########################################################################################################
from java.util import HashMap

if mbo.getBoolean("MCESPPRINT"):
    if not mbo.getString("URLNAME").startswith(service.getProperty("mce.sharepoint.url")):
        errorgroup = "mcedpsp"
        errorkey = "notsp"
    else:
        if mbo.isNull("MCESPFILENAME") or mbo.isNull("MCESPURL"):
            ctx = HashMap()
            ctx.put("mbo", mbo)
            service.invokeScript("MCESPSAVE", ctx)