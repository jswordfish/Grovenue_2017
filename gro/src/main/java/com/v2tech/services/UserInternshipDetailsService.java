package com.v2tech.services;

import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.User;
import com.v2tech.domain.UserInternshipDetails;
import com.v2tech.repository.UserInternshipDetailsRepository;
@Service
public class UserInternshipDetailsService {
	@Autowired
	UserService userService;

	@Autowired
	UserInternshipDetailsRepository internshipDetailsRepository;

		public UserInternshipDetails getInternshipDetails(String user, String socialMediaType, String company) {
			return internshipDetailsRepository.findUserByUserName(user, socialMediaType, company);
		}
		
		public List<UserInternshipDetails> getDetails(String user, String socialMediaType){
			return internshipDetailsRepository.findInternshipDetails(user, socialMediaType);
		}
		
		public void saveOrUpdate(UserInternshipDetails userInternshipDetails) {
			if(userInternshipDetails.getUser() == null || userInternshipDetails.getUser().trim().length() == 0) {
				throw new V2GenericException("INSUFFICIENT_DATA - User name can not be null or empty");
			}
			
			User user = userService.getUserByUserNameAndSocialMediaType(userInternshipDetails.getUser(), userInternshipDetails.getSocialMediaType().getType());
				if(user == null) {
					throw new V2GenericException("USER_DOES_NOT_EXIST - Check user name "+userInternshipDetails.getUser()+" social media "+userInternshipDetails.getSocialMediaType().getType());
				}
				
			UserInternshipDetails userInternshipDetails2 = getInternshipDetails(userInternshipDetails.getUser(), userInternshipDetails.getSocialMediaType().getType(), userInternshipDetails.getCompany());
				if(userInternshipDetails2 == null) {
					//create
					internshipDetailsRepository.save(userInternshipDetails);
				}
				else {
					//update
					Mapper mapper = new DozerBeanMapper();
					userInternshipDetails.setId(userInternshipDetails2.getId());
					mapper.map(userInternshipDetails, userInternshipDetails2);
					internshipDetailsRepository.save(userInternshipDetails2);
				}
		}
}
