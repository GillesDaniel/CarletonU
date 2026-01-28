<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:max="http://www.ibm.com/maximo"
                xmlns:kb="http://www.ibm.com/xmlns/prod/tivoli/swkb"
                version="1.0"
                xmlns:java="http://xml.apache.org/xalan/java"
                exclude-result-prefixes="java">

<xsl:output method="xml" omit-xml-declaration="no" indent="yes" encoding="UTF-8"/>

<!-- ===================================================================== -->
<!-- Create the top-level elements even if there are no records        -->
<!-- ===================================================================== -->
<xsl:template match="/">
    <xsl:element name="SyncTAMITINTSWVAR" namespace="http://www.ibm.com/maximo">
      <xsl:attribute name="creationDateTime">
        <xsl:value-of select="SoftwareKnowledgeBase/@creationDate"/>
      </xsl:attribute>
      <xsl:element name="TAMITINTSWVARSet" namespace="http://www.ibm.com/maximo">
    	<xsl:apply-templates select="/SoftwareKnowledgeBase/IdentityLinks/Link" />
      </xsl:element>
    </xsl:element>
</xsl:template>

<!-- ===================================================================== -->
<!-- There can be @descendant with no guid reference within a file because of filtering, so we -->
<!-- pass in the guids (rather than looking them up here). There may be additional  -->
<!-- references already in tloamsoftware from other loads. -->

<!-- Create TLOAMSOFTWARE structure from this Product, Version or Release   -->
<!-- ===================================================================== -->
<xsl:template match="/SoftwareKnowledgeBase/IdentityLinks/Link">

    <xsl:element name="TLOAMSOFTWARE" namespace="http://www.ibm.com/maximo">
      <xsl:attribute name="action">Change</xsl:attribute>
      
   	  <xsl:element name="TARGETSOFTWAREID" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@primary"/>
      </xsl:element>
      
   	  <xsl:element name="UNIQUEID"         namespace="http://www.ibm.com/maximo">
         <!-- We use must this predicate construct instead of '@descendant' because 'descendant' 
           is an XPath keyword -->
        <xsl:value-of select="@*[name(.)='descendant']"/>
      </xsl:element>
   	  
    </xsl:element>
</xsl:template>

</xsl:stylesheet>
