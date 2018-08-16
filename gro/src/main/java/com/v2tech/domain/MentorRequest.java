package com.v2tech.domain;

import java.util.Date;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
@NodeEntity
public class MentorRequest {
	
	@GraphId
	private Long id;
	
	String userEmail;
	
	String firstName;
	
	String lastName;
	
	//String userSocialMedia;
	
	String userSkype;
	
	String userPhone;
	
	String mentorEmail;
	
	String category;
	
	String language;
	
	String requestDescription;
	
	Date requestSchedule;
	
	String mentorFirstName;
	
	String mentorLastName;
	
	Long timeSlot1Start;
	
	Long timeSlot1End;
	
	Long timeSlot2Start;
	
	Long timeSlot2End;
	
	Long timeSlot3Start;
	
	Long timeSlot3End;
	
	Boolean timeSlot1Accepted = false;
	
	Boolean timeSlot2Accepted = false;
	
	Boolean timeSlot3Accepted = false;
	
	Long mentorRequestCreateTime;

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserSkype() {
		return userSkype;
	}

	public void setUserSkype(String userSkype) {
		this.userSkype = userSkype;
	}

	public String getMentorEmail() {
		return mentorEmail;
	}

	public void setMentorEmail(String mentorEmail) {
		this.mentorEmail = mentorEmail;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getRequestDescription() {
		return requestDescription;
	}

	public void setRequestDescription(String requestDescription) {
		this.requestDescription = requestDescription;
	}

	public Date getRequestSchedule() {
		return requestSchedule;
	}

	public void setRequestSchedule(Date requestSchedule) {
		this.requestSchedule = requestSchedule;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getTimeSlot1Start() {
		return timeSlot1Start;
	}

	public void setTimeSlot1Start(Long timeSlot1Start) {
		this.timeSlot1Start = timeSlot1Start;
	}

	public Long getTimeSlot1End() {
		return timeSlot1End;
	}

	public void setTimeSlot1End(Long timeSlot1End) {
		this.timeSlot1End = timeSlot1End;
	}

	public Long getTimeSlot2Start() {
		return timeSlot2Start;
	}

	public void setTimeSlot2Start(Long timeSlot2Start) {
		this.timeSlot2Start = timeSlot2Start;
	}

	public Long getTimeSlot2End() {
		return timeSlot2End;
	}

	public void setTimeSlot2End(Long timeSlot2End) {
		this.timeSlot2End = timeSlot2End;
	}

	public Long getTimeSlot3Start() {
		return timeSlot3Start;
	}

	public void setTimeSlot3Start(Long timeSlot3Start) {
		this.timeSlot3Start = timeSlot3Start;
	}

	public Long getTimeSlot3End() {
		return timeSlot3End;
	}

	public void setTimeSlot3End(Long timeSlot3End) {
		this.timeSlot3End = timeSlot3End;
	}

	public Boolean getTimeSlot1Accepted() {
		return timeSlot1Accepted;
	}

	public void setTimeSlot1Accepted(Boolean timeSlot1Accepted) {
		this.timeSlot1Accepted = timeSlot1Accepted;
	}

	public Boolean getTimeSlot2Accepted() {
		return timeSlot2Accepted;
	}

	public void setTimeSlot2Accepted(Boolean timeSlot2Accepted) {
		this.timeSlot2Accepted = timeSlot2Accepted;
	}

	public Boolean getTimeSlot3Accepted() {
		return timeSlot3Accepted;
	}

	public void setTimeSlot3Accepted(Boolean timeSlot3Accepted) {
		this.timeSlot3Accepted = timeSlot3Accepted;
	}

	public Long getMentorRequestCreateTime() {
		return mentorRequestCreateTime;
	}

	public void setMentorRequestCreateTime(Long mentorRequestCreateTime) {
		this.mentorRequestCreateTime = mentorRequestCreateTime;
	}
	
	

}
