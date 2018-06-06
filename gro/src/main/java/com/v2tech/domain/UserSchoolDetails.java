package com.v2tech.domain;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class UserSchoolDetails {
	@GraphId
	private Long			id;
	
	private String			user							= "";
	private SocialMediaType	socialMediaType					= SocialMediaType.NONE;

	String nameOfSchool;
	
	String stateOfSchool;
	
	String schoolBoard;
	
	String standard;
	
	String class10Score;
	
	String class12Score;
	
	String streamFor11Or12;
	
	String targetExam;
	
	String fieldOfStudy;
	
	String yearForUGExams;

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

	public String getNameOfSchool() {
		return nameOfSchool;
	}

	public void setNameOfSchool(String nameOfSchool) {
		this.nameOfSchool = nameOfSchool;
	}

	public String getStateOfSchool() {
		return stateOfSchool;
	}

	public void setStateOfSchool(String stateOfSchool) {
		this.stateOfSchool = stateOfSchool;
	}

	public String getSchoolBoard() {
		return schoolBoard;
	}

	public void setSchoolBoard(String schoolBoard) {
		this.schoolBoard = schoolBoard;
	}

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public String getClass10Score() {
		return class10Score;
	}

	public void setClass10Score(String class10Score) {
		this.class10Score = class10Score;
	}

	public String getClass12Score() {
		return class12Score;
	}

	public void setClass12Score(String class12Score) {
		this.class12Score = class12Score;
	}

	public String getStreamFor11Or12() {
		return streamFor11Or12;
	}

	public void setStreamFor11Or12(String streamFor11Or12) {
		this.streamFor11Or12 = streamFor11Or12;
	}

	public String getTargetExam() {
		return targetExam;
	}

	public void setTargetExam(String targetExam) {
		this.targetExam = targetExam;
	}

	public String getFieldOfStudy() {
		return fieldOfStudy;
	}

	public void setFieldOfStudy(String fieldOfStudy) {
		this.fieldOfStudy = fieldOfStudy;
	}

	public String getYearForUGExams() {
		return yearForUGExams;
	}

	public void setYearForUGExams(String yearForUGExams) {
		this.yearForUGExams = yearForUGExams;
	}
	
	
}
