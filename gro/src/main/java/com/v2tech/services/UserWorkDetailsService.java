package com.v2tech.services;

import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.User;
import com.v2tech.domain.UserWorkDetails;
import com.v2tech.repository.UserWorkDetailsRepository;

@Service
public class UserWorkDetailsService {
	@Autowired
	UserService userService;

	@Autowired
	UserWorkDetailsRepository userWorkDetailsRepository;
	
		public List<UserWorkDetails> getDetails(String user, String socialMediaType){
			return userWorkDetailsRepository.findWorkDetails(user, socialMediaType);
		}

		public UserWorkDetails getWorkDetails(String user, String socialMediaType, String company) {
			return userWorkDetailsRepository.findUserByUserName(user, socialMediaType, company);
		}
		
		public void saveOrUpdate(UserWorkDetails userWorkDetails) {
			if(userWorkDetails.getUser() == null || userWorkDetails.getUser().trim().length() == 0) {
				throw new V2GenericException("INSUFFICIENT_DATA - User name can not be null or empty");
			}
			
			User user = userService.getUserByUserNameAndSocialMediaType(userWorkDetails.getUser(), userWorkDetails.getSocialMediaType().getType());
				if(user == null) {
					throw new V2GenericException("USER_DOES_NOT_EXIST - Check user name "+userWorkDetails.getUser()+" social media "+userWorkDetails.getSocialMediaType().getType());
				}
				
			UserWorkDetails userWorkDetails2 = getWorkDetails(userWorkDetails.getUser(), userWorkDetails.getSocialMediaType().getType(), userWorkDetails.getCompany());
				if(userWorkDetails2 == null) {
					//create
					userWorkDetailsRepository.save(userWorkDetails);
				}
				else {
					//update
					Mapper mapper = new DozerBeanMapper();
					userWorkDetails.setId(userWorkDetails2.getId());
					mapper.map(userWorkDetails, userWorkDetails2);
					userWorkDetailsRepository.save(userWorkDetails2);
				}
		}
}
