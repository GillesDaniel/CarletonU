<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:max="http://www.ibm.com/maximo"
                xmlns:kb="http://www.ibm.com/xmlns/prod/tivoli/swkb"
                version="1.0"
                xmlns:java="http://xml.apache.org/xalan/java"
                exclude-result-prefixes="java">
  
<xsl:output method="xml" omit-xml-declaration="no" indent="yes" encoding="UTF-8"/>

<!-- ===================================================================== -->
<!-- Start with the top level SoftwareCatalog element                      -->
<!-- ===================================================================== -->
<xsl:template match="/" >
   
    <!-- ===================================================================== -->
    <!-- Create top level element                                              -->
    <!-- ===================================================================== -->
    <xsl:element name="SyncTAMITINTMF" namespace="http://www.ibm.com/maximo">
      <xsl:attribute name="creationDateTime">
        <xsl:value-of select="/SoftwareKnowledgeBase/@creationDate"/>
      </xsl:attribute>
   		<xsl:element name="TAMITINTMFSet" namespace="http://www.ibm.com/maximo">

	        <!-- ===================================================================== -->
	        <!-- Process only the Manufacturers child element if any                   -->
	        <!-- ===================================================================== -->
	        <xsl:apply-templates select="/SoftwareKnowledgeBase/KbIdentity/Manufacturers/Manufacturer" ></xsl:apply-templates>

	    </xsl:element>
    </xsl:element>

</xsl:template>

<!-- ===================================================================== -->
<!-- Process Manufacturers elements                                         -->
<!-- ===================================================================== -->
<xsl:template match="Manufacturer">
        <!-- ===================================================================== -->
        <!-- For each Manufacturer, create the proper DPAM structure               -->
        <!-- ===================================================================== -->
        <!-- <xsl:for-each select="Manufacturer">-->
            <xsl:element name="DPAMMANUFACTURER" namespace="http://www.ibm.com/maximo">
                <xsl:attribute name="action">AddChange</xsl:attribute>
                <xsl:element name="MANUFACTURERNAME" namespace="http://www.ibm.com/maximo">
                   <xsl:value-of select="@name"/>
                </xsl:element>
            </xsl:element>

		<!-- </xsl:for-each>-->
</xsl:template>

</xsl:stylesheet>
