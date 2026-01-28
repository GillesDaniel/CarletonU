@echo off
setlocal

if "%JAVA_HOME%"=="" set JAVA_HOME=.\..\..\..\tools\java\jre

rem ------------- set Ant specific settings --------------
set ANT_HOME=.\..\..\..\tools\ant
set ANT_OPTS=%ANT_OPTS% -Xmx256m
rem ------------------------------------------------------

%ANT_HOME%\bin\ant -buildfile .\buildapplets.xml %*