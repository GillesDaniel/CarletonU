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
    <xsl:element name="SyncTAMITINTSWPRTNUM" namespace="http://www.ibm.com/maximo">
      <xsl:attribute name="creationDateTime">
        <xsl:value-of select="/SoftwareKnowledgeBase/@creationDate"/>
      </xsl:attribute>
   		<xsl:element name="TAMITINTSWPRTNUMSet" namespace="http://www.ibm.com/maximo">

	        <!-- ===================================================================== -->
	        <!-- Process only the PartNumbers child element if any                   -->
	        <!-- ===================================================================== -->
	        <xsl:apply-templates select="/SoftwareKnowledgeBase/KbIdentity/PartNumbers/PartNumber" ></xsl:apply-templates>

	    </xsl:element>
    </xsl:element>

</xsl:template>

<!-- ===================================================================== -->
<!-- Process PartNumbers elements                                          -->
<!-- ===================================================================== -->
<xsl:template match="PartNumber">
      <xsl:if test="@ccid">
        <!-- ======================================================================= -->
        <!-- For each PartNumber, create the proper structure for records with ccid  -->
        <!-- ======================================================================= -->
        <!-- <xsl:for-each select="PartNumber">-->
            <xsl:element name="TAMITSWPRTNUM" namespace="http://www.ibm.com/maximo">
                <xsl:attribute name="action">AddChange</xsl:attribute>

                <xsl:element name="GUID" namespace="http://www.ibm.com/maximo">
                   <xsl:value-of select="@guid"/>
                </xsl:element>

                <xsl:element name="PARTNUMBER" namespace="http://www.ibm.com/maximo">
                   <xsl:value-of select="@partNumber"/>
                </xsl:element>

                <xsl:element name="DESCRIPTION" namespace="http://www.ibm.com/maximo">
                   <xsl:value-of select="@name"/>
                </xsl:element>

                <xsl:element name="ISPVU" namespace="http://www.ibm.com/maximo">
	               <xsl:call-template name="convertTrueFalse">
			  		  <xsl:with-param name="value">
						<xsl:value-of select="@isPVU"/>
			  		  </xsl:with-param>
				   </xsl:call-template>
                </xsl:element>

                <xsl:element name="ISSUBCAP" namespace="http://www.ibm.com/maximo">
	               <xsl:call-template name="convertTrueFalse">
			  		  <xsl:with-param name="value">
						<xsl:value-of select="@isSubCap"/>
			  		  </xsl:with-param>
				   </xsl:call-template>
                </xsl:element>

                <xsl:element name="CCID" namespace="http://www.ibm.com/maximo">
                   <xsl:value-of select="@ccid"/>
                </xsl:element>

                <xsl:element name="QUANTITY" namespace="http://www.ibm.com/maximo">
                   <xsl:value-of select="@quantity"/>
                </xsl:element>

                <xsl:element name="CHARGETYPE" namespace="http://www.ibm.com/maximo">
                   <xsl:value-of select="@chargeUnit"/>
                </xsl:element>

                <xsl:element name="PRODUCTIDS" namespace="http://www.ibm.com/maximo">
                   <xsl:value-of select="@productIds"/>
                </xsl:element>
		
      			<xsl:call-template name="AddDeleted"/>
            </xsl:element>
     </xsl:if>
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
  
<!-- ====================================================================== -->
<!-- Convert 'false' to 0, any other value including "" to 1.               -->
<!-- Assumption is that the absence of an attribute means "false".          -->
<!-- ====================================================================== -->
  <xsl:template name="convertTrueFalse">
    <xsl:param name="value" />
	<xsl:choose>
	  <xsl:when test="$value">
		<xsl:choose>
		  <xsl:when test='$value="false"'>0</xsl:when>
		  <xsl:otherwise>1</xsl:otherwise>
		</xsl:choose>
       </xsl:when>
       <xsl:otherwise>
          <xsl:text>0</xsl:text>
        </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
