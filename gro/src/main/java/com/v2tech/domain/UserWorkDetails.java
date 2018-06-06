package com.v2tech.domain;

import java.util.Date;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
@NodeEntity
public class UserWorkDetails {
	@GraphId
	private Long			id;
	
	private String			user							= "";
	private SocialMediaType	socialMediaType					= SocialMediaType.NONE;
	
	private Integer sequence;
	
	Boolean current;
	
	String company;
	
	String designation;
	
	String role;
	
	String industry;
	
	Boolean aimingForHigherEducation;
	
	String examPreparingFor;
	
	/**
	 * Comma separated
	 */
	String skills;
	
	Date startDate;
	
	Date endDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public SocialMediaType getSocialMediaType() {
		return socialMediaType;
	}

	public void setSocialMediaType(SocialMediaType socialMediaType) {
		this.socialMediaType = socialMediaType;
	}

	public Integer getSequence() {
		return sequence;
	}

	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}

	public Boolean getCurrent() {
		return current;
	}

	public void setCurrent(Boolean current) {
		this.current = current;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}
	
	

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public Boolean getAimingForHigherEducation() {
		return aimingForHigherEducation;
	}

	public void setAimingForHigherEducation(Boolean aimingForHigherEducation) {
		this.aimingForHigherEducation = aimingForHigherEducation;
	}

	public String getExamPreparingFor() {
		return examPreparingFor;
	}

	public void setExamPreparingFor(String examPreparingFor) {
		this.examPreparingFor = examPreparingFor;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	
}
