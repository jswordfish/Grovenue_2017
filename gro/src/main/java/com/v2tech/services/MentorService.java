package com.v2tech.services;

import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.Mentor;
import com.v2tech.repository.MentorRepository;

@Service
public class MentorService {

	@Autowired
	MentorRepository mentorRepository;
	
	public Mentor findMentorByEmail(String email) {
		return mentorRepository.findMentorByEmail(email);
	}
	
	public void saveOrUpdate(Mentor mentor) {
		Mentor mentor2 = findMentorByEmail(mentor.getEmail());
		
		if(mentor2 == null) {
			//create
			mentorRepository.save(mentor);
		}
		else {
			//update
			mentor.setId(mentor2.getId());
			Mapper mapper = new DozerBeanMapper();
			mapper.map(mentor, mentor2);
			mentorRepository.save(mentor2);
		}
	}
	
	public void markMentorAsValidated(Mentor mentor) {
		Mentor mentor2 = findMentorByEmail(mentor.getEmail());
		if(mentor2 == null) {
			throw new V2GenericException("MENTOR_DOES_NOT_EXIST");
		}
		
		mentor2.setValidated(true);
		mentorRepository.save(mentor2);
	}
	
	public List<Mentor> findMentorsByCategory(String category){
		return mentorRepository.findMentorsByCategory(category);
	}
	
	public List<Mentor> findMentorsByCategoryAndLanguage(String category, String language){
		return mentorRepository.findMentorsByCategory(category, language);
	}
	
	public List<Mentor> findValidatedMentorsByCategory(String category, Boolean validated){
		return mentorRepository.findValidatedMentorsByCategory(category, validated);
	}
	
	public List<Mentor> findValidatedMentorsByCategoryAndLanguage(String category, String language, Boolean validated){
		return mentorRepository.findValidatedMentorsByCategory(category, language, validated);
	}
	
	public List<Mentor> findAllUnValidatedMentors(){
		return mentorRepository.findAllUnValidatedMentors();
	}
}
