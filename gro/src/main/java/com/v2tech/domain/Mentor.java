package com.v2tech.domain;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class Mentor {
	
	@GraphId
	private Long id;
	
	String mentorFirstName;
	
	String mentorLastName;
	
	String occupation;
	
	String company;
	
	String designation;
	
	String educationDegree;
	
	String degreeCollege;
	
	String degreeSpecialization;
	
	String mastersDegree;
	
	String mastersCollege;
	
	String mastersSpecialization;
	
	String phdDegree;
	
	String phdCollege;
	
	String phdSpecialization;
	
	String educationField;
	
	String location;
	
	String email;
	
	String mobile;
	
	String skypeId;
	/**
	 * comma separated
	 */
	String categories;
	
	String language;
	
	String preferredTime;
	
	Boolean validated = false;
	
	String topics;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	public String getMentorFirstName() {
		return mentorFirstName;
	}
	public void setMentorFirstName(String mentorFirstName) {
		this.mentorFirstName = mentorFirstName;
	}
	public String getMentorLastName() {
		return mentorLastName;
	}
	public void setMentorLastName(String mentorLastName) {
		this.mentorLastName = mentorLastName;
	}
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getEducationDegree() {
		return educationDegree;
	}
	public void setEducationDegree(String educationDegree) {
		this.educationDegree = educationDegree;
	}
	public String getEducationField() {
		return educationField;
	}
	public void setEducationField(String educationField) {
		this.educationField = educationField;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getSkypeId() {
		return skypeId;
	}
	public void setSkypeId(String skypeId) {
		this.skypeId = skypeId;
	}
	public String getCategories() {
		return categories;
	}
	public void setCategories(String categories) {
		this.categories = categories;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getPreferredTime() {
		return preferredTime;
	}
	public void setPreferredTime(String preferredTime) {
		this.preferredTime = preferredTime;
	}
	public Boolean getValidated() {
		return validated;
	}
	public void setValidated(Boolean validated) {
		this.validated = validated;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getTopics() {
		return topics;
	}
	public void setTopics(String topics) {
		this.topics = topics;
	}
	public String getDegreeCollege() {
		return degreeCollege;
	}
	public void setDegreeCollege(String degreeCollege) {
		this.degreeCollege = degreeCollege;
	}
	public String getDegreeSpecialization() {
		return degreeSpecialization;
	}
	public void setDegreeSpecialization(String degreeSpecialization) {
		this.degreeSpecialization = degreeSpecialization;
	}
	public String getMastersDegree() {
		return mastersDegree;
	}
	public void setMastersDegree(String mastersDegree) {
		this.mastersDegree = mastersDegree;
	}
	public String getMastersCollege() {
		return mastersCollege;
	}
	public void setMastersCollege(String mastersCollege) {
		this.mastersCollege = mastersCollege;
	}
	public String getMastersSpecialization() {
		return mastersSpecialization;
	}
	public void setMastersSpecialization(String mastersSpecialization) {
		this.mastersSpecialization = mastersSpecialization;
	}
	public String getPhdDegree() {
		return phdDegree;
	}
	public void setPhdDegree(String phdDegree) {
		this.phdDegree = phdDegree;
	}
	public String getPhdCollege() {
		return phdCollege;
	}
	public void setPhdCollege(String phdCollege) {
		this.phdCollege = phdCollege;
	}
	public String getPhdSpecialization() {
		return phdSpecialization;
	}
	public void setPhdSpecialization(String phdSpecialization) {
		this.phdSpecialization = phdSpecialization;
	}
	
	

}
