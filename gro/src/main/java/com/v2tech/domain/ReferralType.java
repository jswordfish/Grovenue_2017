package com.v2tech.domain;

public enum ReferralType {

	
	P0("P0"),
	P1("P1"),
	
	Q0("Q0"),
	Q1("Q1"),
	
	R0("R0"),
	R1("R1");
	
	private String value;
	
	
	
	private ReferralType(String typeVal){
		this.value = typeVal;
	}
	
	public String getValue(){
		return value;
	}
	
	
	
}
