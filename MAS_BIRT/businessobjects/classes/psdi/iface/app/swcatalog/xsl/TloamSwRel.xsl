<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:max="http://www.ibm.com/maximo"
                xmlns:kb="http://www.ibm.com/xmlns/prod/tivoli/swkb"
                version="1.0"
                xmlns:java="http://xml.apache.org/xalan/java"
                exclude-result-prefixes="java">

<xsl:output method="xml" omit-xml-declaration="no" indent="yes" encoding="UTF-8"/>

<!-- ===================================================================== -->
<!-- Process top level element                             -->
<!-- ===================================================================== -->
<xsl:template match="/" > 

<!-- ===================================================================== -->
<!-- Create top level element                                              -->
<!-- ===================================================================== -->
    <xsl:element name="SyncTAMITINTSWREL" namespace="http://www.ibm.com/maximo">
        <xsl:attribute name="creationDateTime">
        	<xsl:value-of select="SoftwareKnowledgeBase/@creationDate"/>
       	</xsl:attribute>
       	
    	<xsl:element name="TAMITINTSWRELSet" namespace="http://www.ibm.com/maximo">

	        <!-- ===================================================================== -->
	        <!-- Process only the Relationships tree                                        -->
	        <!-- ===================================================================== -->
	        <xsl:apply-templates select="SoftwareKnowledgeBase/KbIdentity/Relationships/Relationship"></xsl:apply-templates>
       
   		</xsl:element>
    </xsl:element>
</xsl:template>


<!-- ===================================================================== -->
<!-- Add TLOAMSWREL Element                                            -->
<!-- ===================================================================== -->
<xsl:template name="AddTAMITINTSWREL" match="Relationship">

    <xsl:element name="TLOAMSWREL" namespace="http://www.ibm.com/maximo">
      <xsl:attribute name="action">AddChange</xsl:attribute>
        <xsl:element name="PARENTSW" namespace="http://www.ibm.com/maximo">
            <xsl:value-of select="@source"/>
        </xsl:element>
        <xsl:element name="CHILDSW" namespace="http://www.ibm.com/maximo">
            <xsl:value-of select="@sink"/>
        </xsl:element>
        <xsl:element name="RELATIONSHIPTYPE" namespace="http://www.ibm.com/maximo">
            <xsl:value-of select="@type"/>
        </xsl:element>
        
		<xsl:call-template name="AddDeleted"/>
        
    </xsl:element>
    
</xsl:template>

<!-- ===================================================================== -->
<!-- Add Deleted -->
<!-- ===================================================================== -->
  <xsl:template name="AddDeleted">
    <xsl:choose>
      <xsl:when test="@deleted = 'true'">
        <xsl:element name="DELETEDATE" namespace="http://www.ibm.com/maximo">
          <xsl:value-of select="@modified"/>
        </xsl:element>
        <xsl:element name="ISDELETED" namespace="http://www.ibm.com/maximo">
          <xsl:text>1</xsl:text>
        </xsl:element>
      </xsl:when>
      <xsl:otherwise>
	  	  <!-- may be undeleted: empty element to clear the date -->
        <xsl:element name="DELETEDATE" namespace="http://www.ibm.com/maximo" />
        <xsl:element name="ISDELETED" namespace="http://www.ibm.com/maximo">
          <xsl:text>0</xsl:text>
        </xsl:element>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
    

</xsl:stylesheet>
