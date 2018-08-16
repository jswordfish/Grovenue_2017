package com.v2tech.services;

import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.Mentor;
import com.v2tech.domain.MentorWorkExperience;
import com.v2tech.repository.MentorWorkExperienceRepository;

@Service
public class MentorWorkExperienceService {
	
	@Autowired
	MentorWorkExperienceRepository workExperienceRepository;
	
	@Autowired
	MentorService mentorService;
	
	public void saveOrUpdateMentorWorkExperience(MentorWorkExperience workExperience) {
		Mentor mentor = mentorService.findMentorByEmail(workExperience.getUserEmail());
		if(mentor == null) {
			throw new V2GenericException("MENTOR_DOES_NOT_EXIST");
		
		}
		
		MentorWorkExperience workExperience2 = workExperienceRepository.findMentorWorkExperienceByEmailAndCompanyAndDesignation(workExperience.getUserEmail(), workExperience.getCompany(), workExperience.getDesignation());
		if(workExperience2 == null) {
			//create
			workExperienceRepository.save(workExperience);
		}
		else {
			Mapper mapper = new DozerBeanMapper();
			workExperience.setId(workExperience2.getId());
			mapper.map(workExperience, workExperience2);
			workExperienceRepository.save(workExperience2);
		}
	}
	
	public List<MentorWorkExperience> getMentorWorkExperiences(String mentorEmail){
		return workExperienceRepository.findMentorWorkExperienceByEmail(mentorEmail);
	}

}
