package com.v2tech.services;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.User;
import com.v2tech.domain.UserCollegeDetails;
import com.v2tech.repository.UserCollegeDetailsRepository;
@Service
public class UserCollegeDetailsService {
	
@Autowired
UserService userService;

@Autowired
UserCollegeDetailsRepository collegeDetailsRepository;

	public UserCollegeDetails getCollegeDetails(String user, String socialMediaType) {
		return collegeDetailsRepository.findUserByUserName(user, socialMediaType);
	}
	
	public void saveOrUpdate(UserCollegeDetails userCollegeDetails) {
		if(userCollegeDetails.getUser() == null || userCollegeDetails.getUser().trim().length() == 0) {
			throw new V2GenericException("INSUFFICIENT_DATA - User name can not be null or empty");
		}
		
		User user = userService.getUserByUserNameAndSocialMediaType(userCollegeDetails.getUser(), userCollegeDetails.getSocialMediaType().getType());
			if(user == null) {
				throw new V2GenericException("USER_DOES_NOT_EXIST - Check user name "+userCollegeDetails.getUser()+" social media "+userCollegeDetails.getSocialMediaType().getType());
			}
			
		UserCollegeDetails userCollegeDetails2 = getCollegeDetails(userCollegeDetails.getUser(), userCollegeDetails.getSocialMediaType().getType());
			if(userCollegeDetails2 == null) {
				//create
				collegeDetailsRepository.save(userCollegeDetails);
			}
			else {
				//update
				Mapper mapper = new DozerBeanMapper();
				userCollegeDetails.setId(userCollegeDetails2.getId());
				mapper.map(userCollegeDetails, userCollegeDetails2);
				collegeDetailsRepository.save(userCollegeDetails2);
			}
	}
}