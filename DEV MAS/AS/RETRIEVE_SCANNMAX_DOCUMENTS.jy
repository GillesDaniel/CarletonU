from com.ibm.json.java import JSONObject
from com.ibm.json.java import JSONArray
from jarray import array

from java.io import BufferedReader, IOException, InputStreamReader
from java.lang import System, Class, String, StringBuffer
from java.nio.charset import Charset
from java.util import Date, Properties, List, ArrayList

from org.apache.http import HttpHeaders, HttpVersion
from org.apache.http.client.methods import HttpPost, HttpGet
from org.apache.http.entity import StringEntity
from org.apache.http.impl.client import HttpClients

from java.net import InetAddress

from org.apache.http.params import BasicHttpParams, HttpProtocolParamBean, HttpConnectionParams

from psdi.mbo import Mbo, MboRemote, MboSet, MboSetRemote
from psdi.security import UserInfo
from psdi.server import MXServer
from psdi.util.logging import MXLoggerFactory

import sys
from sys import *

logger = MXLoggerFactory.getLogger("maximo.script.scannmax")
setConnectionTimeout = 5
setSoTimeout = 30

def httpPostAsJson(url, jsonString, headers, parseJson = True):
	try:
		params = BasicHttpParams()
		paramsBean = HttpProtocolParamBean(params)
		paramsBean.setVersion(HttpVersion.HTTP_1_1)
		paramsBean.setContentCharset("UTF-8")
		paramsBean.setUseExpectContinue(True)
		HttpConnectionParams.setConnectionTimeout(params, setConnectionTimeout * 1000)
		HttpConnectionParams.setSoTimeout(params, setSoTimeout * 1000)
		request = HttpPost(url)
		request.setParams(params)
		for h in headers:
			request.addHeader(h['key'], h['value'])
		entity = StringEntity(jsonString, "UTF-8")
	
		request.setEntity(entity)

		client = HttpClients.createDefault()
		# Do the actual request
		response = client.execute(request)
		
		status = response.getStatusLine().getStatusCode()
		if status < 200 and status > 201:
			raise Exception("Status " + str(status) + " while posting to : " + str(url) + " in httpPostAsJson.")
		# Serialize the json response
		if parseJson:
			obj = JSONObject.parse(response.getEntity().getContent())
			return obj
		
	except Exception, e:
		raise Exception("httpPostAsJson failed with error: " + str(e))

def httpGet(url, headers):
	try:
		params = BasicHttpParams()
		paramsBean = HttpProtocolParamBean(params)
		paramsBean.setVersion(HttpVersion.HTTP_1_1)
		paramsBean.setContentCharset("UTF-8")
		paramsBean.setUseExpectContinue(True)
		HttpConnectionParams.setConnectionTimeout(params, setConnectionTimeout * 1000)
		HttpConnectionParams.setSoTimeout(params, setSoTimeout * 1000)
		request = HttpGet(url)
		request.setParams(params)
		for h in headers:
			request.addHeader(h['key'], h['value'])

		client = HttpClients.createDefault()

		# Do the actual request
		response = client.execute(request)
		status = response.getStatusLine().getStatusCode()
		if status != 200:
			raise Exception("Status " + str(status) + " while getting in httpGet.")
		# Serialize the json response
		array = JSONArray.parse(response.getEntity().getContent())
		return array
	except Exception, e:
		raise Exception("httpGet failed with error: " + str(e))

class DocumentInfoResponse:
  def __init__(self, scannmaxId, documentExist):
    self.scannmaxId = scannmaxId
    self.documentExist = documentExist
	
def saveDocumentInfo(doc):
	scannmaxid = None
	documentExist = True
	try:
		scannmaxSet = MXServer.getMXServer().getMboSet('SCANNMAX', MXServer.getMXServer().getSystemUserInfo())
		scannmaxSet.setWhere("HASH='" + doc['hash'] + "'")
		scannmaxEntry = scannmaxSet.moveFirst()
		if scannmaxEntry == None:
			documentExist = False
			scannmaxSet = MXServer.getMXServer().getMboSet("SCANNMAX", MXServer.getMXServer().getSystemUserInfo())
			scannmaxEntry = scannmaxSet.add()
			scannmaxEntry.setValue("HASH", doc['hash'])
			scannmaxEntry.setValue("EXTRACTEDJSON", doc['extractedJson'])
			scannmaxEntry.setValue("DESCRIPTION", doc['description'])
			scannmaxEntry.setValue("SITEID", doc['maximoSiteId'])
			scannmaxEntry.setValue("DOCUMENTNAME", doc['documentName'])
			scannmaxEntry.setValue("DOCUMENTDATA", doc['documentData'])
			scannmaxEntry.setValue("THUMBNAILDATA", doc['thumbnailData'])
			scannmaxEntry.setValue("DOCUMENTTYPE", doc['documentTypeJson'])
			logger.info("Saving document: " + doc['documentName'])

		scannmaxid = scannmaxEntry.getString("SCANNMAXID").decode('utf-8','ignore').encode("utf-8")
		scannmaxSet.save()
		scannmaxSet.close()
		logger.info("Document was saved with id: " + scannmaxid + " and hash: " + doc['hash'])
		return DocumentInfoResponse(scannmaxid, documentExist)
	except Exception, e:
		if documentExist == True:
			logger.error(str(e))
			return DocumentInfoResponse(scannmaxid, documentExist)
		elif documentExist == False:
			raise Exception("Fail to saveDocumentInfo: " + str(e))

def getToken():
	try:
		headers =   \
			[{"key": HttpHeaders.CONTENT_TYPE, "value": "application/json"},   \
			{"key": HttpHeaders.ACCEPT, "value": "application/json"}]
		json = JSONObject()
		json.put('Username', clientUsername)
		json.put('Password', clientPassword)
		ip = InetAddress.getLocalHost()
		hostname = ip.getHostName()
		json.put('Hostname', hostname)
		json_data = json.serialize()
		logger.info("Calling: " + scannmaxBaseUrl + scannmaxTokenUrl)
		jsonToken = httpPostAsJson(scannmaxBaseUrl + scannmaxTokenUrl, json_data, headers)
		logger.info("Successfully got scannmax token: " + jsonToken["token"][0:10] + "*******")
		return jsonToken["token"]
	except Exception, e:
		raise Exception("Failed to getToken with url: " + scannmaxBaseUrl + scannmaxTokenUrl + str(e))

def getFileInfos(token):
	try:
		headers =   \
			[{"key": HttpHeaders.CONTENT_TYPE, "value": "application/json"},   \
			{"key": HttpHeaders.ACCEPT, "value": "application/json"},   \
			{"key": HttpHeaders.AUTHORIZATION, "value": "bearer " + token}]
		getFileInfoUrl = scannmaxBaseUrl + scannmaxFileInfosUrl
		logger.info("Calling: " + getFileInfoUrl)
		fileInfos = httpGet(getFileInfoUrl, headers)
		logger.info("Successfully called: " + getFileInfoUrl)
		return fileInfos
	except Exception, e:
		raise Exception("Failed to getFileInfos with url: " + scannmaxBaseUrl + scannmaxFileInfosUrl + str(e))

def removeFile(token, ids):
	try:
		headers =   \
			[{"key": HttpHeaders.CONTENT_TYPE, "value": "application/json"},   \
			{"key": HttpHeaders.ACCEPT, "value": "application/json"},   \
			{"key": HttpHeaders.AUTHORIZATION, "value": "bearer " + token}]
		removeFileInfoUrl = scannmaxBaseUrl + scannmaxRemoveFileUrl
		logger.info("Calling: " + removeFileInfoUrl)
		response = httpPostAsJson(removeFileInfoUrl, ids, headers, False)
		logger.info("Successfully called: " + removeFileInfoUrl)
		return response
	except Exception, e:
		raise Exception("Failed to removeFile with url: " + scannmaxBaseUrl + scannmaxRemoveFileUrl + str(e))

try:
	logger.info("Start scannmax automation script")
	properties = MXServer.getMXServer().getConfig()
	clientUsername = properties.getProperty("scannmax.client.username")
	clientPassword = properties.getProperty("scannmax.client.password")
	scannmaxBaseUrl = properties.getProperty("scannmax.api.baseUrl")
	scannmaxTokenUrl = properties.getProperty("scannmax.api.account.token")
	scannmaxRemoveFileUrl = properties.getProperty("scannmax.api.maximo.removeFile")
	scannmaxFileInfosUrl = properties.getProperty("scannmax.api.maximo.getExtractedFileInfos")
	token = getToken()
	fileInfos = getFileInfos(token)
	if len(fileInfos) > 0:
		ids = JSONArray()
		for doc in fileInfos:
			documentInfoResponse = saveDocumentInfo(doc)
			if documentInfoResponse.scannmaxId is not None:
				ids.add(doc["extractedFileInfosId"])
			elif documentInfoResponse.documentExist == True:
				ids.add(doc["extractedFileInfosId"])
		
		jsonIds = JSONObject()
		jsonIds.put("extractedFileInfosIds", ids)
		removeFile(token, jsonIds.serialize())
	logger.info("Scannmax automation script done")

except Exception, e:
	logger.error("An unhandled exception has occurred in the method main : " + str(e))