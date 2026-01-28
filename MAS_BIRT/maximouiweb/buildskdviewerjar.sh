#!/bin/sh

export JAVA_HOME=../../../tools/java/jre
export ANT_HOME=../../../tools/ant
export ANT_OPTS="$ANT_OPTS -Xmx256M"
export CLASSPATH=

$ANT_HOME/bin/ant -buildfile ./buildskdviewerjar.xml $*

exit $?