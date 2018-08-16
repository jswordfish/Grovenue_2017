package com.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.v2tech.domain.Book;
import com.v2tech.domain.Mentor;
import com.v2tech.domain.MentorRequest;
import com.v2tech.domain.MentorWorkExperience;

public class TestMisc {
	@Test
	public void testBook() throws JsonProcessingException{
		Book book = new Book();
		book.setISBN("isbn_toBeDeleted");
		book.setBookTitle("to be deleted");
		book.setAuthors("jais");
		
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(mapper.writeValueAsString(book));
	}
	@Test
	public void testCreateMentorRequest1() throws JsonProcessingException {
		MentorRequest request = new MentorRequest();
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(request);
		System.out.println(json);
	}
	
	
	@Test
	public void testCreateMentorWorkExp() throws JsonProcessingException {
		MentorWorkExperience experience1 = new  MentorWorkExperience();
		experience1.setUserEmail("jatin.sutaria@thev2technologies.com");
		experience1.setFirstName("Jatin");
		experience1.setLastName("Sutaria");
		experience1.setDesignation("Team Lead");
		experience1.setCompany("Infrasoft Technologies");
		
		MentorWorkExperience experience2 = new  MentorWorkExperience();
		experience2.setUserEmail("jatin.sutaria@thev2technologies.com");
		experience2.setFirstName("Jatin");
		experience2.setLastName("Sutaria");
		experience2.setDesignation("Founder");
		experience2.setCompany("V2 Technologies");
		
		List<MentorWorkExperience> exps = new ArrayList<>();
		exps.add(experience1);
		exps.add(experience2);
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(exps);
		System.out.println(json);
	}
	
	@Test
	public void testCreateMentor() throws JsonProcessingException {
		Mentor mentor = new Mentor();
		mentor.setCategories("AI and Machine Learning");
		mentor.setCompany("V2 Technologies");
		mentor.setEducationDegree("BE");
		mentor.setEducationField("Big Data & Machine Learning");
		mentor.setEmail("jatin.sutaria@thev2technologies.com");
		mentor.setLanguage("English");
		mentor.setMentorFirstName("Jatin");
		mentor.setMentorLastName("Sutaria");
		mentor.setLocation("Mumbai");
		mentor.setMobile("9930070660");
		mentor.setOccupation("Technology Consulting Firm ");
		mentor.setPreferredTime("Late Evening Hours IST Time");
		mentor.setSkypeId("jatinsut");
		mentor.setDegreeCollege("SSVPS COE");
		mentor.setEducationDegree("BE in Electronics");
		mentor.setDegreeSpecialization("TeleCommunications");
		mentor.setMastersDegree("NA");
		mentor.setMastersCollege("NA");
		mentor.setMastersSpecialization("NA");
		mentor.setPhdDegree("NA");
		mentor.setPhdCollege("NA");
		mentor.setPhdSpecialization("NA");
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(mentor);
		System.out.println(json);
	}

}
