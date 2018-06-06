package com.v2tech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.SurveyFormData;
import com.v2tech.domain.User;
import com.v2tech.repository.SurveyFormRepository;

@Service
public class SurveyFormService {
	
	@Autowired
	UserService userService;
	
	@Autowired
	SurveyFormRepository surveyFormRepository;
	
	public void createSurveyRecord(SurveyFormData surveyFormData) {
		User user = userService.getUserByUserNameAndSocialMediaType(surveyFormData.getUser(), surveyFormData.getSocialMediaType().getType());
			if(user == null) {
				throw new V2GenericException("No_User_Associated");
			}
			
			surveyFormRepository.save(surveyFormData);
	}

}
