package com.v2tech.domain;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
@NodeEntity
public class UserCollegeDetails {
	@GraphId
	private Long			id;
	
	private String			user							= "";
	private SocialMediaType	socialMediaType					= SocialMediaType.NONE;
	
	private String collegeLevel;
	
	private String state;
	
	private String city;
	
	private String institution;
	
	private String universityName;
	
	private String examQualifiedToGetIntoCollege;
	
	private Float percentileScoreInQualificationExam;
	
	private Float percentageScoreInQualificationExam;
	
	private Float marksOutOfQualificationExam;
	
	private Float marksScoredInQualificationExam;
	
	private String degree;
	
	private String specialization;
	
	private Float finalScoreGPA;
	
	private Float finalScorePercentage;
	
	private Float finalScoreCGPA;
	
	private String finalGrade;
	
	private String yearOfPassingOut;
	
	Boolean internshipDone;

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

	public String getCollegeLevel() {
		return collegeLevel;
	}

	public void setCollegeLevel(String collegeLevel) {
		this.collegeLevel = collegeLevel;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getInstitution() {
		return institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	public String getUniversityName() {
		return universityName;
	}

	public void setUniversityName(String universityName) {
		this.universityName = universityName;
	}

	public String getExamQualifiedToGetIntoCollege() {
		return examQualifiedToGetIntoCollege;
	}

	public void setExamQualifiedToGetIntoCollege(String examQualifiedToGetIntoCollege) {
		this.examQualifiedToGetIntoCollege = examQualifiedToGetIntoCollege;
	}

	public Float getPercentileScoreInQualificationExam() {
		return percentileScoreInQualificationExam;
	}

	public void setPercentileScoreInQualificationExam(Float percentileScoreInQualificationExam) {
		this.percentileScoreInQualificationExam = percentileScoreInQualificationExam;
	}

	public Float getPercentageScoreInQualificationExam() {
		return percentageScoreInQualificationExam;
	}

	public void setPercentageScoreInQualificationExam(Float percentageScoreInQualificationExam) {
		this.percentageScoreInQualificationExam = percentageScoreInQualificationExam;
	}

	public Float getMarksOutOfQualificationExam() {
		return marksOutOfQualificationExam;
	}

	public void setMarksOutOfQualificationExam(Float marksOutOfQualificationExam) {
		this.marksOutOfQualificationExam = marksOutOfQualificationExam;
	}

	public Float getMarksScoredInQualificationExam() {
		return marksScoredInQualificationExam;
	}

	public void setMarksScoredInQualificationExam(Float marksScoredInQualificationExam) {
		this.marksScoredInQualificationExam = marksScoredInQualificationExam;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public Float getFinalScoreGPA() {
		return finalScoreGPA;
	}

	public void setFinalScoreGPA(Float finalScoreGPA) {
		this.finalScoreGPA = finalScoreGPA;
	}

	public Float getFinalScorePercentage() {
		return finalScorePercentage;
	}

	public void setFinalScorePercentage(Float finalScorePercentage) {
		this.finalScorePercentage = finalScorePercentage;
	}

	public Float getFinalScoreCGPA() {
		return finalScoreCGPA;
	}

	public void setFinalScoreCGPA(Float finalScoreCGPA) {
		this.finalScoreCGPA = finalScoreCGPA;
	}

	public String getFinalGrade() {
		return finalGrade;
	}

	public void setFinalGrade(String finalGrade) {
		this.finalGrade = finalGrade;
	}

	public String getYearOfPassingOut() {
		return yearOfPassingOut;
	}

	public void setYearOfPassingOut(String yearOfPassingOut) {
		this.yearOfPassingOut = yearOfPassingOut;
	}

	public Boolean getInternshipDone() {
		return internshipDone;
	}

	public void setInternshipDone(Boolean internshipDone) {
		this.internshipDone = internshipDone;
	}
	
	
	
	
}
