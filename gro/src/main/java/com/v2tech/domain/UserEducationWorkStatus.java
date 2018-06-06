package com.v2tech.domain;

public enum UserEducationWorkStatus {
SCHOOL("SCHOOL"), COLLEGE("COLLEGE") ,WORKING_PROFESSIONAL("WORKING_PROFESSIONAL");
	
	String userEducationStatus;
	
	private UserEducationWorkStatus(String userEducationStatus){
		this.userEducationStatus = userEducationStatus;
	}

	public String getUserEducationStatus() {
		return userEducationStatus;
	}

	public void setUserEducationStatus(String userEducationStatus) {
		this.userEducationStatus = userEducationStatus;
	}

	

}
