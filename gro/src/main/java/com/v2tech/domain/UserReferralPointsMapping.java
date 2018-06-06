package com.v2tech.domain;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class UserReferralPointsMapping {

	@GraphId
	Long id;
	
	
	String userName;
	
	Float referralPoints = 0f;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Float getReferralPoints() {
		return referralPoints;
	}

	public void setReferralPoints(Float referralPoints) {
		this.referralPoints = referralPoints;
	}
	
	
}
