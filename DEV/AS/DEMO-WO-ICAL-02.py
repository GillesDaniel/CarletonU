from java.util import Date

if mbo.isNull("schedfinish"):
  evalresult = mbo.getDate("targcompdate")
else:
  evalresult = mbo.getDate("schedfinish")