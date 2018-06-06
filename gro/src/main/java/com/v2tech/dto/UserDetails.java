package com.v2tech.dto;

import java.util.ArrayList;
import java.util.List;

import com.v2tech.domain.User;
import com.v2tech.domain.UserCollegeDetails;
import com.v2tech.domain.UserInternshipDetails;
import com.v2tech.domain.UserSchoolDetails;
import com.v2tech.domain.UserWorkDetails;

public class UserDetails {
	
	User user;
	
	UserSchoolDetails schoolDetails;
	
	UserCollegeDetails collegeDetails;
	
	List<UserInternshipDetails> internshipDetails = new ArrayList<>();
	
	List<UserWorkDetails> workDetails =  new ArrayList<>();

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public UserSchoolDetails getSchoolDetails() {
		return schoolDetails;
	}

	public void setSchoolDetails(UserSchoolDetails schoolDetails) {
		this.schoolDetails = schoolDetails;
	}

	public UserCollegeDetails getCollegeDetails() {
		return collegeDetails;
	}

	public void setCollegeDetails(UserCollegeDetails collegeDetails) {
		this.collegeDetails = collegeDetails;
	}

	public List<UserInternshipDetails> getInternshipDetails() {
		return internshipDetails;
	}

	public void setInternshipDetails(List<UserInternshipDetails> internshipDetails) {
		this.internshipDetails = internshipDetails;
	}

	public List<UserWorkDetails> getWorkDetails() {
		return workDetails;
	}

	public void setWorkDetails(List<UserWorkDetails> workDetails) {
		this.workDetails = workDetails;
	}
	
	

}
