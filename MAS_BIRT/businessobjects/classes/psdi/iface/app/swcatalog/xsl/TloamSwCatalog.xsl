<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:max="http://www.ibm.com/maximo"
                xmlns:kb="http://www.ibm.com/xmlns/prod/tivoli/swkb"
                version="1.0"
                xmlns:java="http://xml.apache.org/xalan/java"
                exclude-result-prefixes="java">

<xsl:output method="xml" omit-xml-declaration="no" indent="yes" encoding="UTF-8"/>

<!-- ===================================================================== -->
<!-- Global parameters                                                     -->
<!-- ===================================================================== -->
<xsl:param name="TLOAMSWCATALOGID"/>

<!-- ===================================================================== -->
<!-- Process top level element                             -->
<!-- ===================================================================== -->
<xsl:template match="/" > 

<!-- ===================================================================== -->
<!-- Create top level SET elements                                         -->
<!-- ===================================================================== -->
    <xsl:element name="SyncTAMITINTSWCAT" namespace="http://www.ibm.com/maximo">
        <xsl:attribute name="creationDateTime">
        	<xsl:value-of select="SoftwareKnowledgeBase/@creationDate"/>
       	</xsl:attribute>
       	
    	<xsl:element name="TAMITINTSWCATSet" namespace="http://www.ibm.com/maximo">

	        <xsl:apply-templates select="SoftwareKnowledgeBase"></xsl:apply-templates>
       
   		</xsl:element>
      
    </xsl:element>
</xsl:template>


<!-- ===================================================================== -->
<!-- Add TLOAMSWREL Element                                            -->
<!-- ===================================================================== -->
<xsl:template name="AddTAMITINTSWCAT" match="SoftwareKnowledgeBase">
    <xsl:element name="TLOAMSWCATALOG" namespace="http://www.ibm.com/maximo">
      <xsl:attribute name="action">Change</xsl:attribute>
        <!-- ===================================================================== -->
        <!-- ID is passed as a parameter -->
        <!-- ===================================================================== -->
        <xsl:element name="TLOAMSWCATALOGID" namespace="http://www.ibm.com/maximo">
           <xsl:value-of select="$TLOAMSWCATALOGID"/>
        </xsl:element>
        <xsl:element name="CREATEDDATE" namespace="http://www.ibm.com/maximo">
            <xsl:value-of select="@creationDate"/>
        </xsl:element>
        <xsl:element name="SCHEMAVERSION" namespace="http://www.ibm.com/maximo">
            <xsl:value-of select="@schemaVersion"/>
        </xsl:element>
       <!-- Different values for the subcapacity flag on mainframe and distributed -->
       <xsl:choose>
          <xsl:when test="$TLOAMSWCATALOGID= '2'">
				<xsl:element name="UNIQUEID" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="KbIdentity/@guid"/>
				</xsl:element>
				<xsl:element name="NAME" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="KbIdentity/@name"/>
				</xsl:element>
				<xsl:element name="DESCRIPTION" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="substring(KbIdentity/@name, 1, 99)"/>
				</xsl:element>
				<xsl:element name="VERSION" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="KbIdentity/@version"/>
				</xsl:element>
				<xsl:element name="CONTACTNAME" namespace="http://www.ibm.com/maximo">
				   <xsl:text></xsl:text>
				</xsl:element>
				<xsl:element name="DATAVERSION" namespace="http://www.ibm.com/maximo">
				   <xsl:text></xsl:text>
				</xsl:element>
				<xsl:element name="LASTMODIFICATION" namespace="http://www.ibm.com/maximo">
				   <xsl:text></xsl:text>
				</xsl:element>
          </xsl:when>
           <xsl:when test="$TLOAMSWCATALOGID= '0'">
				<xsl:element name="UNIQUEID" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="@databaseInstanceId"/>
				</xsl:element>
				<xsl:element name="NAME" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="@databaseInstanceName"/>
				</xsl:element>
				<xsl:element name="DESCRIPTION" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="substring(@databaseInstanceName, 1, 99)"/>
				</xsl:element>
				<xsl:element name="VERSION" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="@swkbtBuildNumber"/>
				</xsl:element>
				<xsl:element name="CONTACTNAME" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="@contact"/>
				</xsl:element>
				<xsl:element name="DATAVERSION" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="@dataVersion"/>
				</xsl:element>
				<xsl:element name="LASTMODIFICATION" namespace="http://www.ibm.com/maximo">
					<xsl:value-of select="@lastModification"/>
				</xsl:element>
          </xsl:when>
        </xsl:choose>
	</xsl:element>
</xsl:template>

</xsl:stylesheet>
