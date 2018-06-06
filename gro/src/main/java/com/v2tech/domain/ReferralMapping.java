package com.v2tech.domain;

import java.util.Date;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class ReferralMapping {

	@GraphId
	Long id;
	
	Float pointsToReferrer = 20f;
	
	Float pointsToFriend = 10f;
	
	String referralCode;
	
	//String referralPrefix = ReferralType.P0.getValue();
	
	
	Boolean status;

	String originatedByUser;
	
	String usedByUser;
	
	private Date			createdDate;
	
	private Date redeemedDate;
	
	

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Float getPointsToReferrer() {
		return pointsToReferrer;
	}


	public void setPointsToReferrer(Float pointsToReferrer) {
		this.pointsToReferrer = pointsToReferrer;
	}


	public Float getPointsToFriend() {
		return pointsToFriend;
	}


	public void setPointsToFriend(Float pointsToFriend) {
		this.pointsToFriend = pointsToFriend;
	}


	public String getReferralCode() {
		return referralCode;
	}


	public void setReferralCode(String referralCode) {
		this.referralCode = referralCode;
	}


	

	public Boolean getStatus() {
		return status;
	}


	public void setStatus(Boolean status) {
		this.status = status;
	}


	public String getOriginatedByUser() {
		return originatedByUser;
	}


	public void setOriginatedByUser(String originatedByUser) {
		this.originatedByUser = originatedByUser;
	}


	public String getUsedByUser() {
		return usedByUser;
	}


	public void setUsedByUser(String usedByUser) {
		this.usedByUser = usedByUser;
	}


	public Date getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public Date getRedeemedDate() {
		return redeemedDate;
	}


	public void setRedeemedDate(Date redeemedDate) {
		this.redeemedDate = redeemedDate;
	}


	
	
	
	
}
