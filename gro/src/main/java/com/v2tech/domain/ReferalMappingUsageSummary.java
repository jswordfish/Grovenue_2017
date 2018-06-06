package com.v2tech.domain;

import java.util.Date;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
@NodeEntity
public class ReferalMappingUsageSummary {
	@GraphId
	Long id;
	
	
	String referralCode;
	

	String originatedByUser;
	
	String usedByUser;
	
	private Date redeemedDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReferralCode() {
		return referralCode;
	}

	public void setReferralCode(String referralCode) {
		this.referralCode = referralCode;
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

	public Date getRedeemedDate() {
		return redeemedDate;
	}

	public void setRedeemedDate(Date redeemedDate) {
		this.redeemedDate = redeemedDate;
	}
	
	
}
