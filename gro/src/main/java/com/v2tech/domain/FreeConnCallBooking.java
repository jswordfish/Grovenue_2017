package com.v2tech.domain;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class FreeConnCallBooking {
	
	@GraphId
	private Long id;
	
	String freeConfCallName;
	
	Long bookedFrom;
	
	Long bookedTill;
	
	String mentorEmail;
	
	String userEmail;
	
	Long mentorRequestId;
	
	Long bookingTime;
	
	Boolean locked = false;
	
	public FreeConnCallBooking() {
		
	}
	
	public FreeConnCallBooking(String freeConfCallName, Long bookedFrom, Long bookedTill, String mentorEmail, String userEmail, Long mentorRequestId) {
		this.freeConfCallName = freeConfCallName;
		this.bookedFrom = bookedFrom;
		this.bookedTill = bookedTill;
		this.mentorEmail = mentorEmail;
		this.userEmail = mentorEmail;
		this.bookingTime = System.currentTimeMillis();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFreeConfCallName() {
		return freeConfCallName;
	}

	public void setFreeConfCallName(String freeConfCallName) {
		this.freeConfCallName = freeConfCallName;
	}

	public Long getBookedFrom() {
		return bookedFrom;
	}

	public void setBookedFrom(Long bookedFrom) {
		this.bookedFrom = bookedFrom;
	}

	public Long getBookedTill() {
		return bookedTill;
	}

	public void setBookedTill(Long bookedTill) {
		this.bookedTill = bookedTill;
	}

	public String getMentorEmail() {
		return mentorEmail;
	}

	public void setMentorEmail(String mentorEmail) {
		this.mentorEmail = mentorEmail;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public Long getMentorRequestId() {
		return mentorRequestId;
	}

	public void setMentorRequestId(Long mentorRequestId) {
		this.mentorRequestId = mentorRequestId;
	}

	public Long getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(Long bookingTime) {
		this.bookingTime = bookingTime;
	}

	public Boolean getLocked() {
		return locked;
	}

	public void setLocked(Boolean locked) {
		this.locked = locked;
	}
	
	

}
