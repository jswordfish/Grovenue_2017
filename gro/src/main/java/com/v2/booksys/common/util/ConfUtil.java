package com.v2.booksys.common.util;

public class ConfUtil {
	/**
	 * Default location
	 */
	static String documentsLocation ="/u01/grovenue/application/software/appserver/apache-tomcat-8.5.4/webapps/fileserver/GrovenueData";
	
	/**
	 * Default location
	 */
	static String documentsServerBaseUrl = "http://www.grovenue.com/fileserver/GrovenueData/";
	
	

	public static String getDocumentsLocation() {
		return documentsLocation;
	}

	public static void setDocumentsLocation(String documentsLocation) {
		ConfUtil.documentsLocation = documentsLocation;
	}

	public static String getDocumentsServerBaseUrl() {
		return documentsServerBaseUrl;
	}

	public static void setDocumentsServerBaseUrl(String documentsServerBaseUrl) {
		ConfUtil.documentsServerBaseUrl = documentsServerBaseUrl;
	}
}
