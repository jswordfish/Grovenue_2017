package com.v2tech.domain;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class FreeConfCallNoDetails {

	@GraphId
	private Long id;
	
	String name;
	
	String dialInNumber;
	
	String accessCode;
	
	String onlineMeeting;
	
	String hostPin;
	
	String internationalDialInNumber;
	
	String playBackNumber;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDialInNumber() {
		return dialInNumber;
	}

	public void setDialInNumber(String dialInNumber) {
		this.dialInNumber = dialInNumber;
	}

	public String getAccessCode() {
		return accessCode;
	}

	public void setAccessCode(String accessCode) {
		this.accessCode = accessCode;
	}

	public String getOnlineMeeting() {
		return onlineMeeting;
	}

	public void setOnlineMeeting(String onlineMeeting) {
		this.onlineMeeting = onlineMeeting;
	}

	public String getHostPin() {
		return hostPin;
	}

	public void setHostPin(String hostPin) {
		this.hostPin = hostPin;
	}

	public String getInternationalDialInNumber() {
		return internationalDialInNumber;
	}

	public void setInternationalDialInNumber(String internationalDialInNumber) {
		this.internationalDialInNumber = internationalDialInNumber;
	}

	public String getPlayBackNumber() {
		return playBackNumber;
	}

	public void setPlayBackNumber(String playBackNumber) {
		this.playBackNumber = playBackNumber;
	}
	
	
}
