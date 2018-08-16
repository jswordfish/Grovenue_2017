package com.v2tech.domain;

import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class SurveyFormData {
	
	@GraphId
	private Long id;

	String user;
	
	@Transient
	User usr;
	
	private SocialMediaType	socialMediaType					= SocialMediaType.NONE;
	
	Boolean schoolStudent = false;
	
	Boolean collegeStudent = true;
	
	Boolean workingProfessional = false;
	
	Boolean booksRecommendedByTeachers = true;;
	
	Boolean booksSuggestedByFriendsAndFamily = false;
	
	Boolean booksPrescribedBySchoolsAndClasses = false;
	
	Boolean booksByResearchOnline = false;
	
	Boolean trustOnlinePlatformForBooksRecommendation = false;
	
	Integer meetCareerCounsellingProfessional = 3;
	
	Integer paidOnlineCounsellingTest = 3;
	
	Integer speakToPeopleInthatCareer = 3;
	
	Integer onlineResearch = 3;
	
	Integer goByTeacherParentAdvice = 3;
	
	Integer askingTeacherSkillSet = 3;
	
	Integer pickingOnlineCoursesYourself = 3;
	
	Integer askingPeopleWorkingInIndustry = 3;
	
	Integer internShip = 3;
	
	Integer betterAcademicPerformance = 3;
	
	Boolean canMentorStudent_yesCanDoThat = true;
	
	Boolean canMentorStudent_yesIfTrained = false;
	
	Boolean canMentorStudent_No = false;
	
	Boolean canMentorStudent_Depends = false;
	
	Float moneyForMentoringPerHour = 100f;
	
	Boolean connectingWithWorkingProfessional_yesLot = true;
	
	Boolean connectingWithWorkingProfessional_yesLittle = false;
	
	Boolean connectingWithWorkingProfessional_No = false;
	
	Float moneyPayGettingMentoredPerHour = 100f;
	
	String bookIdentity = "test";
	
	String stream = "test stream";
	
	String subject = "maths";
	
	String bookName = "test book";
	
	Integer bookRating = 3;
	
	String bookReview = "review";
	
	String bookTitle;
	
	String bookAuthors;
	
	String publication;
	
	String standard;
	
	Long surveyTime;
	
	Boolean newBookAdded;
	
	Long createdTime;

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

	public Boolean getSchoolStudent() {
		return schoolStudent;
	}

	public void setSchoolStudent(Boolean schoolStudent) {
		this.schoolStudent = schoolStudent;
	}

	public Boolean getCollegeStudent() {
		return collegeStudent;
	}

	public void setCollegeStudent(Boolean collegeStudent) {
		this.collegeStudent = collegeStudent;
	}

	public Boolean getWorkingProfessional() {
		return workingProfessional;
	}

	public void setWorkingProfessional(Boolean workingProfessional) {
		this.workingProfessional = workingProfessional;
	}

	public Boolean getBooksRecommendedByTeachers() {
		return booksRecommendedByTeachers;
	}

	public void setBooksRecommendedByTeachers(Boolean booksRecommendedByTeachers) {
		this.booksRecommendedByTeachers = booksRecommendedByTeachers;
	}

	public Boolean getBooksSuggestedByFriendsAndFamily() {
		return booksSuggestedByFriendsAndFamily;
	}

	public void setBooksSuggestedByFriendsAndFamily(Boolean booksSuggestedByFriendsAndFamily) {
		this.booksSuggestedByFriendsAndFamily = booksSuggestedByFriendsAndFamily;
	}

	public Boolean getBooksPrescribedBySchoolsAndClasses() {
		return booksPrescribedBySchoolsAndClasses;
	}

	public void setBooksPrescribedBySchoolsAndClasses(Boolean booksPrescribedBySchoolsAndClasses) {
		this.booksPrescribedBySchoolsAndClasses = booksPrescribedBySchoolsAndClasses;
	}

	public Boolean getBooksByResearchOnline() {
		return booksByResearchOnline;
	}

	public void setBooksByResearchOnline(Boolean booksByResearchOnline) {
		this.booksByResearchOnline = booksByResearchOnline;
	}

	public Boolean getTrustOnlinePlatformForBooksRecommendation() {
		return trustOnlinePlatformForBooksRecommendation;
	}

	public void setTrustOnlinePlatformForBooksRecommendation(Boolean trustOnlinePlatformForBooksRecommendation) {
		this.trustOnlinePlatformForBooksRecommendation = trustOnlinePlatformForBooksRecommendation;
	}

	public Integer getMeetCareerCounsellingProfessional() {
		return meetCareerCounsellingProfessional;
	}

	public void setMeetCareerCounsellingProfessional(Integer meetCareerCounsellingProfessional) {
		this.meetCareerCounsellingProfessional = meetCareerCounsellingProfessional;
	}

	public Integer getPaidOnlineCounsellingTest() {
		return paidOnlineCounsellingTest;
	}

	public void setPaidOnlineCounsellingTest(Integer paidOnlineCounsellingTest) {
		this.paidOnlineCounsellingTest = paidOnlineCounsellingTest;
	}

	public Integer getSpeakToPeopleInthatCareer() {
		return speakToPeopleInthatCareer;
	}

	public void setSpeakToPeopleInthatCareer(Integer speakToPeopleInthatCareer) {
		this.speakToPeopleInthatCareer = speakToPeopleInthatCareer;
	}

	public Integer getOnlineResearch() {
		return onlineResearch;
	}

	public void setOnlineResearch(Integer onlineResearch) {
		this.onlineResearch = onlineResearch;
	}

	public Integer getGoByTeacherParentAdvice() {
		return goByTeacherParentAdvice;
	}

	public void setGoByTeacherParentAdvice(Integer goByTeacherParentAdvice) {
		this.goByTeacherParentAdvice = goByTeacherParentAdvice;
	}

	public Integer getAskingTeacherSkillSet() {
		return askingTeacherSkillSet;
	}

	public void setAskingTeacherSkillSet(Integer askingTeacherSkillSet) {
		this.askingTeacherSkillSet = askingTeacherSkillSet;
	}

	public Integer getPickingOnlineCoursesYourself() {
		return pickingOnlineCoursesYourself;
	}

	public void setPickingOnlineCoursesYourself(Integer pickingOnlineCoursesYourself) {
		this.pickingOnlineCoursesYourself = pickingOnlineCoursesYourself;
	}

	public Integer getAskingPeopleWorkingInIndustry() {
		return askingPeopleWorkingInIndustry;
	}

	public void setAskingPeopleWorkingInIndustry(Integer askingPeopleWorkingInIndustry) {
		this.askingPeopleWorkingInIndustry = askingPeopleWorkingInIndustry;
	}

	public Integer getInternShip() {
		return internShip;
	}

	public void setInternShip(Integer internShip) {
		this.internShip = internShip;
	}

	public Integer getBetterAcademicPerformance() {
		return betterAcademicPerformance;
	}

	public void setBetterAcademicPerformance(Integer betterAcademicPerformance) {
		this.betterAcademicPerformance = betterAcademicPerformance;
	}

	public Boolean getCanMentorStudent_yesCanDoThat() {
		return canMentorStudent_yesCanDoThat;
	}

	public void setCanMentorStudent_yesCanDoThat(Boolean canMentorStudent_yesCanDoThat) {
		this.canMentorStudent_yesCanDoThat = canMentorStudent_yesCanDoThat;
	}

	public Boolean getCanMentorStudent_yesIfTrained() {
		return canMentorStudent_yesIfTrained;
	}

	public void setCanMentorStudent_yesIfTrained(Boolean canMentorStudent_yesIfTrained) {
		this.canMentorStudent_yesIfTrained = canMentorStudent_yesIfTrained;
	}

	public Boolean getCanMentorStudent_No() {
		return canMentorStudent_No;
	}

	public void setCanMentorStudent_No(Boolean canMentorStudent_No) {
		this.canMentorStudent_No = canMentorStudent_No;
	}

	public Boolean getCanMentorStudent_Depends() {
		return canMentorStudent_Depends;
	}

	public void setCanMentorStudent_Depends(Boolean canMentorStudent_Depends) {
		this.canMentorStudent_Depends = canMentorStudent_Depends;
	}

	public Float getMoneyForMentoringPerHour() {
		return moneyForMentoringPerHour;
	}

	public void setMoneyForMentoringPerHour(Float moneyForMentoringPerHour) {
		this.moneyForMentoringPerHour = moneyForMentoringPerHour;
	}

	public Boolean getConnectingWithWorkingProfessional_yesLot() {
		return connectingWithWorkingProfessional_yesLot;
	}

	public void setConnectingWithWorkingProfessional_yesLot(Boolean connectingWithWorkingProfessional_yesLot) {
		this.connectingWithWorkingProfessional_yesLot = connectingWithWorkingProfessional_yesLot;
	}

	public Boolean getConnectingWithWorkingProfessional_yesLittle() {
		return connectingWithWorkingProfessional_yesLittle;
	}

	public void setConnectingWithWorkingProfessional_yesLittle(Boolean connectingWithWorkingProfessional_yesLittle) {
		this.connectingWithWorkingProfessional_yesLittle = connectingWithWorkingProfessional_yesLittle;
	}

	public Boolean getConnectingWithWorkingProfessional_No() {
		return connectingWithWorkingProfessional_No;
	}

	public void setConnectingWithWorkingProfessional_No(Boolean connectingWithWorkingProfessional_No) {
		this.connectingWithWorkingProfessional_No = connectingWithWorkingProfessional_No;
	}

	public Float getMoneyPayGettingMentoredPerHour() {
		return moneyPayGettingMentoredPerHour;
	}

	public void setMoneyPayGettingMentoredPerHour(Float moneyPayGettingMentoredPerHour) {
		this.moneyPayGettingMentoredPerHour = moneyPayGettingMentoredPerHour;
	}

	public String getBookIdentity() {
		return bookIdentity;
	}

	public void setBookIdentity(String bookIdentity) {
		this.bookIdentity = bookIdentity;
	}

	public String getStream() {
		return stream;
	}

	public void setStream(String stream) {
		this.stream = stream;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public Integer getBookRating() {
		return bookRating;
	}

	public void setBookRating(Integer bookRating) {
		this.bookRating = bookRating;
	}

	public String getBookReview() {
		return bookReview;
	}

	public void setBookReview(String bookReview) {
		this.bookReview = bookReview;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSurveyTime() {
		return surveyTime;
	}

	public void setSurveyTime(Long surveyTime) {
		this.surveyTime = surveyTime;
	}

	public User getUsr() {
		return usr;
	}

	public void setUsr(User usr) {
		this.usr = usr;
	}

	public String getBookTitle() {
		return bookTitle;
	}

	public void setBookTitle(String bookTitle) {
		this.bookTitle = bookTitle;
	}

	public String getBookAuthors() {
		return bookAuthors;
	}

	public void setBookAuthors(String bookAuthors) {
		this.bookAuthors = bookAuthors;
	}

	public String getPublication() {
		return publication;
	}

	public void setPublication(String publication) {
		this.publication = publication;
	}

	public String getStandard() {
		return standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public Boolean getNewBookAdded() {
		return newBookAdded;
	}

	public void setNewBookAdded(Boolean newBookAdded) {
		this.newBookAdded = newBookAdded;
	}

	public Long getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}
	
	
	
	
}
