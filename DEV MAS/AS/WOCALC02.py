from psdi.server import MXServer
from java.util import Calendar, GregorianCalendar

if not mbo.toBeAdded():
  if not mbo.isNull("targcompdate"):
    cal = GregorianCalendar()
    cal.setTime(MXServer.getMXServer().getDate())
    cal1 = GregorianCalendar()
    cal1.setTime(mbo.getDate("targcompdate"))
    diff = int((cal1.getTimeInMillis()-cal.getTimeInMillis())/1000/60/60/24)
    mbo.setValue("daystoend", diff)