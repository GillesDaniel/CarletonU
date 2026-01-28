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
<!-- Define global variables                                               -->
<!-- ===================================================================== -->
  <xsl:key name="manufacturerKeys" match="Manufacturer" use="@guid"/>
  <xsl:key name="productKeys" match="DistributedProduct|DistributedVersion|MainframeVersion" use="@guid" /> 

<!-- ===================================================================== -->
<!-- Process top level element SoftwareCatalog                             -->
<!-- ===================================================================== -->
  <xsl:template match="/">
    <xsl:element name="SyncTAMITINTSW" namespace="http://www.ibm.com/maximo">
      <xsl:attribute name="creationDateTime">
        <xsl:value-of select="SoftwareKnowledgeBase/@creationDate"/>
      </xsl:attribute>
      <xsl:element name="TAMITINTSWSet" namespace="http://www.ibm.com/maximo">

        <!-- ======================================================================== -->
        <!-- Process IBM SwKBT catalog first                                          -->
        <!-- SwKBT has a fixed guid=12345678901234567890123456789012 for IBM catalog  -->
        <!-- Custom catalog (extend IBM catalog) will have a different guid           -->
        <!-- ======================================================================== -->
        <xsl:for-each select="SoftwareKnowledgeBase/KbIdentity">
        <xsl:choose>
          <xsl:when test="@guid = '12345678901234567890123456789012'">
 		      <xsl:apply-templates select="SoftwareItems" ></xsl:apply-templates>
          </xsl:when>
        </xsl:choose>
        </xsl:for-each>

        <!-- ===================================================================== -->
        <!-- Process other catalog                                                 -->
        <!-- ===================================================================== -->
        <xsl:for-each select="SoftwareKnowledgeBase/KbIdentity">
        <xsl:choose>
          <xsl:when test="not(@guid = '12345678901234567890123456789012')">
 		      <xsl:apply-templates select="SoftwareItems" ></xsl:apply-templates>
          </xsl:when>
        </xsl:choose>
        </xsl:for-each>
        
      </xsl:element>
    </xsl:element>
  </xsl:template>

<!-- ===================================================================== -->
<!-- Process Products elements                                            -->
<!--   lastUpdate - last time an import was successfull                    -->
<!-- ===================================================================== -->
  <xsl:template match="SoftwareItems">
    <xsl:param name="lastUpdate"/>

    <!-- ===================================================================== -->
    <!-- Create the TLOAMINTSWSet element                                      -->
    <!-- ===================================================================== -->
        <!-- ===================================================================== -->
        <!-- Process each of the Product types                                        -->
        <!-- ===================================================================== -->
      <xsl:for-each select="*">
        <xsl:choose>
	    		
          <xsl:when test="name(.) = 'DistributedProduct'">
            <xsl:call-template name="CreateTLOAMSOFTWARE">
              <xsl:with-param name="platform">DISTRIBUTED</xsl:with-param>
              <xsl:with-param name="productType">PRODUCT</xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:when test="name(.) = 'DistributedVersion'">
            <xsl:call-template name="CreateTLOAMSOFTWARE">
              <xsl:with-param name="platform">DISTRIBUTED</xsl:with-param>
              <xsl:with-param name="productType">VERSION</xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:when test="name(.) = 'DistributedRelease'">
            <xsl:call-template name="CreateTLOAMSOFTWARE">
              <xsl:with-param name="platform">DISTRIBUTED</xsl:with-param>
              <xsl:with-param name="productType">RELEASE</xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:when test="name(.) = 'MainframeProduct'">
            <xsl:call-template name="CreateTLOAMSOFTWARE">
              <xsl:with-param name="platform">MAINFRAME</xsl:with-param>
              <xsl:with-param name="productType">PRODUCT</xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:when test="name(.) = 'MainframeVersion'">
            <xsl:call-template name="CreateTLOAMSOFTWARE">
              <xsl:with-param name="platform">MAINFRAME</xsl:with-param>
              <xsl:with-param name="productType">VERSION</xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:when test="name(.) = 'MainframeFeature'">
            <xsl:call-template name="CreateTLOAMSOFTWARE">
              <xsl:with-param name="platform">MAINFRAME</xsl:with-param>
              <xsl:with-param name="productType">RELEASE</xsl:with-param>
            </xsl:call-template>
          </xsl:when>

        </xsl:choose>
      </xsl:for-each>

  </xsl:template>

<!-- ===================================================================== -->
<!-- Create TLOAMSOFTWARE structure from this Product, Version or Release   -->
<!-- ===================================================================== -->
  <xsl:template name="CreateTLOAMSOFTWARE">
    <xsl:param name="platform"/>
    <xsl:param name="productType"/>

    <!-- ===================================================================== -->
    <!-- Create the Object element                                       -->
    <!-- ===================================================================== -->
    <xsl:element name="TLOAMSOFTWARE" namespace="http://www.ibm.com/maximo">
      <xsl:attribute name="action">AddChange</xsl:attribute>

      <xsl:element name="UNIQUEID" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@guid"/>
      </xsl:element>
		
      <!-- If there is a preferred alias, substitute that for the software name. -->
      <xsl:element name="SWNAME" namespace="http://www.ibm.com/maximo">
        <xsl:choose>
          <xsl:when test="./alias[@preferred='true']">
            <xsl:value-of select="./alias[@preferred='true']/@name"/>
          </xsl:when>
          <xsl:otherwise>
			<xsl:choose>
			  <!-- mainframe features follow a special naming rule -->
			  <xsl:when test="($platform = 'MAINFRAME') and ($productType = 'RELEASE')">
				<xsl:choose>
				  <xsl:when test="(not (@EID)) or (@EID = '')">
					  <!-- no EID: version name - hyphen - feature name -->
					  <xsl:value-of select="key('productKeys', @version)/@name"/>
					  <xsl:text disable-output-escaping="yes"> - </xsl:text>
					  <xsl:value-of select="@name"/>
				  </xsl:when>
				  <xsl:otherwise>
					  <!-- there is EID: feature name - hyphen - EID -->
					  <xsl:value-of select="@name"/>
					  <xsl:text disable-output-escaping="yes"> - </xsl:text>
					  <xsl:value-of select="@EID"/>
				  </xsl:otherwise>
				</xsl:choose>
			  </xsl:when>
			  <xsl:otherwise>
				  <xsl:value-of select="@name"/>
			  </xsl:otherwise>
			</xsl:choose>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:element>
		
      <xsl:element name="PLATFORMBASE" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="$platform"/>
      </xsl:element>
		
      <xsl:element name="FUNC" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@function"/>
      </xsl:element>
		
      <xsl:element name="ROLE" namespace="http://www.ibm.com/maximo">
        <xsl:choose>
           <xsl:when test="@productRole">
             <!-- There is an expicit value for the role -->
             <xsl:choose>
			   <!-- Convert SOFTWARE_PRODUCT to SOFTWAREPRODUCT -->
               <xsl:when test="@productRole = 'SOFTWARE_PRODUCT'">
                 <xsl:text>SOFTWAREPRODUCT</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="@productRole"/>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:when>
          <xsl:otherwise>
            <!-- No expicit value for the role -->
            <xsl:choose>
              <xsl:when test="$platform = 'MAINFRAME'">
                <xsl:choose>
                  <xsl:when test="$productType = 'RELEASE'">
                    <!-- This is actually a mainframe feature -->
                    <xsl:text>FEATURE</xsl:text>
                  </xsl:when>
                  <xsl:otherwise>
                    <!-- Defaults to SOFTWAREPRODUCT if there's no productRole property at all (such as for mainframe versions) -->
                    <!-- could perhaps inherit from parent but it is a SOFTWAREPRODUCT because it is not a feature -->
                    <xsl:text>SOFTWAREPRODUCT</xsl:text>
                  </xsl:otherwise>
                </xsl:choose>
              </xsl:when>
              <xsl:when test="$platform = 'DISTRIBUTED'">
                <!-- Defaults to SOFTWAREPRODUCT if there's no productRole property at all - shoud not happen for distributed -->
                <!-- could perhaps inherit from parent but it is a required attribute in SwKBT -->
                <xsl:text>SOFTWAREPRODUCT</xsl:text>
              </xsl:when>
            </xsl:choose>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:element>
		
      <xsl:element name="PRODUCTID" namespace="http://www.ibm.com/maximo">
       <xsl:choose>
          <xsl:when test="$platform = 'MAINFRAME'">
			<xsl:value-of select="@productId"/>
          </xsl:when>
          <xsl:when test="$platform = 'DISTRIBUTED'">
			<xsl:value-of select="@productIds"/>
          </xsl:when>
        </xsl:choose>
      </xsl:element>
		
      <xsl:element name="TYPE" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="$productType"/>
      </xsl:element>
		
      <xsl:element name="EXTERNALID" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@externalId"/>
      </xsl:element>
		
      <xsl:element name="URL" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@website"/>
      </xsl:element>
		
      <xsl:element name="DESCRIPTION" namespace="http://www.ibm.com/maximo">
        <xsl:choose>
          <xsl:when test='@description !=""'>
            <xsl:value-of select="substring(@description, 1, 99)"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="substring(@name, 1, 99)"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:element>
      <xsl:element name="ACTIVATIONDATE" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@activationDate"/>
      </xsl:element>
      <xsl:element name="MANUFACTURER" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="key('manufacturerKeys', @manufacturer)/@name"/>
      </xsl:element>
		
      <!-- Use a hard-coded reference to our own entry -->
      <xsl:element name="CATALOGSOURCEID" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="$TLOAMSWCATALOGID"/>
      </xsl:element>
		
        <!-- All entries are English -->
      <xsl:element name="LANGCODE" namespace="http://www.ibm.com/maximo">
        <xsl:text>EN</xsl:text>
      </xsl:element>

     <xsl:element name="ISPVU" namespace="http://www.ibm.com/maximo">
       <!-- Different values for the ispvu flag on mainframe and distributed -->
       <xsl:choose>
          <xsl:when test="$platform = 'MAINFRAME'">
             <xsl:call-template name="convertTrueFalse">
			  <xsl:with-param name="value">
				<xsl:value-of select="@pvu"/>
			  </xsl:with-param>
			</xsl:call-template>
          </xsl:when>

 	  <xsl:when test="$platform = 'DISTRIBUTED'">
	    <xsl:choose>
		    <xsl:when test= "$productType = 'PRODUCT'">
		  	 <xsl:call-template name="convertTrueFalse">
				  <xsl:with-param name="value">
					<!--  <xsl:value-of select="@pvu|@PVU"/> -->
        			<xsl:choose>
          				<xsl:when test="@pvu">
            				<xsl:value-of select="@pvu"/>
          				</xsl:when>
          				<xsl:when test="@PVU">
            				<xsl:value-of select="@PVU"/>
          				</xsl:when>
					</xsl:choose>     
				  </xsl:with-param>
			</xsl:call-template>
		    </xsl:when>
		    <xsl:when test= "$productType = 'VERSION'">
		  	 <xsl:call-template name="convertTrueFalse">
				  <xsl:with-param name="value">
					<xsl:value-of select="key('productKeys', @product)/@pvu"/>
				  </xsl:with-param>
			</xsl:call-template>
		    </xsl:when>
		    <xsl:when test= "$productType = 'RELEASE'">
		  	 <xsl:call-template name="convertTrueFalse">
				  <xsl:with-param name="value">
					<xsl:value-of select="key('productKeys', key('productKeys', @version)/@product)/@pvu"/>
				  </xsl:with-param>
			</xsl:call-template>
		    </xsl:when>
		    <xsl:otherwise>
			  <xsl:text>0</xsl:text> 
		    </xsl:otherwise>
	   </xsl:choose>
          </xsl:when>
           <xsl:otherwise>
            <xsl:text>0</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
       </xsl:element>
      
      
      <xsl:element name="ISSUBCAP" namespace="http://www.ibm.com/maximo">
       <!-- Different values for the subcapacity flag on mainframe and distributed -->
       <xsl:choose>
          <xsl:when test="$platform = 'MAINFRAME'">
             <xsl:choose>
                <xsl:when test="@subCapacityLicensing">
                   <!-- Value of subCapacityLicensing empty or 'Not eligible' means full capacity; different values  'Execution-based', 'Reference-based', 'z/OS-based' all mean subcapacity is available -->
                   <xsl:choose>
                      <xsl:when test='@subCapacityLicensing=""'>0</xsl:when>
                      <xsl:when test='@subCapacityLicensing="Not eligible"'>0</xsl:when>
                      <xsl:otherwise>1</xsl:otherwise>
                   </xsl:choose>
			    </xsl:when>
			    <xsl:otherwise>
                   <!-- Defaults to 0 if there's no subCapacityLicensing property at all -->
				   <xsl:text>0</xsl:text>
				</xsl:otherwise>
             </xsl:choose>
          </xsl:when>
          <xsl:when test="$platform = 'DISTRIBUTED'">
	    <xsl:choose>
		    <xsl:when test= "$productType = 'PRODUCT'">
		  	 <xsl:call-template name="convertTrueFalse">
				  <xsl:with-param name="value">
					<xsl:value-of select="@subCapacityLicensing"/>
				  </xsl:with-param>
			</xsl:call-template>
		    </xsl:when>
		    <xsl:when test= "$productType = 'VERSION'">
		  	 <xsl:call-template name="convertTrueFalse">
				  <xsl:with-param name="value">
					<xsl:value-of select="key('productKeys', @product)/@subCapacityLicensing"/>
				  </xsl:with-param>
			</xsl:call-template>
		    </xsl:when>
		    <xsl:when test= "$productType = 'RELEASE'">
		  	 <xsl:call-template name="convertTrueFalse">
				  <xsl:with-param name="value">
					<xsl:value-of select="key('productKeys', key('productKeys', @version)/@product)/@subCapacityLicensing"/>
				  </xsl:with-param>
			</xsl:call-template>
		    </xsl:when>
		    <xsl:otherwise>
			  <xsl:text>0</xsl:text> 
		    </xsl:otherwise>
	   </xsl:choose>
          </xsl:when>
           <xsl:otherwise>
            <xsl:text>0</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
       </xsl:element>
      
       <!-- shows up as 'IPLA="IPLA"' or not at all -->
      <xsl:element name="ISIPLA" namespace="http://www.ibm.com/maximo">
        <xsl:choose>
          <xsl:when test="@IPLA">
            <xsl:text>1</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>0</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:element>
             
      <!-- ===================================================================== -->
      <!-- Mainframe product/version only -->
      <!-- ===================================================================== -->
      <xsl:element name="VULEXHIBITID" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@VUE"/>
      </xsl:element>

      <xsl:element name="SSPID" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@SS"/>
      </xsl:element>

      <xsl:element name="SSEID" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@SSEnId"/>
      </xsl:element>

      <xsl:element name="EID" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@EID"/>
      </xsl:element>

      <!-- ===================================================================== -->
      <!-- For releases and features, look up the version from the parent -->
      <!-- ===================================================================== -->
      <xsl:element name="VERSION" namespace="http://www.ibm.com/maximo">
        <xsl:choose>
          <xsl:when test="$productType = 'RELEASE'">
            <xsl:value-of select="key('productKeys', @version)/@version"/>
          </xsl:when>
          <xsl:when test="$productType = 'VERSION'">
            <xsl:value-of select="@version"/>
          </xsl:when>
        	<!-- Leave blank for PRODUCT -->
        </xsl:choose>
      </xsl:element>

      <!-- ===================================================================== -->
      <!-- Put release and version in parent element. Do it for mainframe features too -->
      <!-- This will be substituted with looked-up tloamsoftwareid in -->
      <!-- psdi.tloam.iface.app.swcatalog.mea.TloamMaxSoftwareProcess.java  -->
      <!-- ===================================================================== -->
      <xsl:element name="PARENT" namespace="http://www.ibm.com/maximo">
        <xsl:choose>
          <xsl:when test="$productType = 'RELEASE'">
            <xsl:value-of select="@version"/>
          </xsl:when>
          <xsl:when test="$productType = 'VERSION'">
            <xsl:value-of select="@product"/>
          </xsl:when>
        	<!-- Leave blank for PRODUCT -->
        </xsl:choose>
      </xsl:element>

      <xsl:element name="RELEASE" namespace="http://www.ibm.com/maximo">
        <xsl:value-of select="@release"/>
      </xsl:element>
		
      <xsl:element name="CCID" namespace="http://www.ibm.com/maximo">
       <xsl:choose>
          <xsl:when test="$platform = 'MAINFRAME'">
			<xsl:text></xsl:text>
          </xsl:when>
          <xsl:otherwise>
			<xsl:value-of select="@productId"/>
          </xsl:otherwise>
        </xsl:choose>
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
		 
		 <!--	<xsl:when test="$value='false'">0</xsl:when>-->
		  <xsl:otherwise>1</xsl:otherwise>
		</xsl:choose>
       </xsl:when>
       <xsl:otherwise>
          <xsl:text>0</xsl:text>
        </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>