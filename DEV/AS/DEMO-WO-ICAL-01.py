from java.util import Date

if mbo.isNull("schedstart"):
  evalresult = mbo.getDate("targstartdate")
else:
  evalresult = mbo.getDate("schedstart")