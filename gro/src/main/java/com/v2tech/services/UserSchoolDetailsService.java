package com.v2tech.services;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.v2tech.base.V2GenericException;
import com.v2tech.domain.User;
import com.v2tech.domain.UserSchoolDetails;
import com.v2tech.repository.UserSchoolDetailsRepository;

@Service
public class UserSchoolDetailsService {
	@Autowired
	UserService userService;
	
	@Autowired
	UserSchoolDetailsRepository schoolDetailsRepository;
	
	public UserSchoolDetails getSchoolDetails(String user, String socialMediaType) {
		return schoolDetailsRepository.findUserByUserName(user, socialMediaType);
	}
	
	public void saveOrUpdate(UserSchoolDetails userSchoolDetails) {
		if(userSchoolDetails.getUser() == null || userSchoolDetails.getUser().trim().length() == 0) {
			throw new V2GenericException("INSUFFICIENT_DATA - User name can not be null or empty");
		}
		
		User user = userService.getUserByUserNameAndSocialMediaType(userSchoolDetails.getUser(), userSchoolDetails.getSocialMediaType().getType());
			if(user == null) {
				throw new V2GenericException("USER_DOES_NOT_EXIST - Check user name "+userSchoolDetails.getUser()+" social media "+userSchoolDetails.getSocialMediaType().getType());
			}
			
		UserSchoolDetails userSchoolDetails2 = getSchoolDetails(userSchoolDetails.getUser(), userSchoolDetails.getSocialMediaType().getType());
			if(userSchoolDetails2 == null) {
				//create
				schoolDetailsRepository.save(userSchoolDetails);
			}
			else {
				//update
				Mapper mapper = new DozerBeanMapper();
				userSchoolDetails.setId(userSchoolDetails2.getId());
				mapper.map(userSchoolDetails, userSchoolDetails2);
				schoolDetailsRepository.save(userSchoolDetails2);
			}
	}

}
