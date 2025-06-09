from java.nio.file import Files,Paths;

print "Starting MCEDPSP_DEL for MBO "+str(mbo.getUniqueIDValue())

#Get the actual File
path = mbo.getString("DOCINFO.URLNAME")
#Delete it
deleted = Files.deleteIfExists(Paths.get(path))

#Print a message to the logs if it failed to delete
if not deleted:
    print "Failed to delete file at "+path
    service.log("Failed to delete file at "+path)

#Carry on anyway, it maybe just didnt exist
#Delete the Doc Info Record(s)
docInfoSet = mbo.getMboSet("DOCINFO");
#Have to include the NoAccessCheck 2L because the doclink still exists
docInfoSet.deleteAll(2L)
#Delete the Doclinks Record
mbo.delete(2L);