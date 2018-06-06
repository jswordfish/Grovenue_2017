package com.v2tech.services;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.User;
import com.v2tech.domain.UserReferralPointsMapping;
import com.v2tech.repository.UserReferralPointsMappingRepository;

@Service
@Transactional
public class UserReferralPointsMappingService {
	@Autowired
	UserReferralPointsMappingRepository repository;
	
	@Autowired
	UserService userService;
	
	@Transactional
	public void saveOrUpdate(UserReferralPointsMapping userRef ) {
		if(userRef.getUserName() == null || userRef.getUserName().isEmpty()) {
			throw new V2GenericException("MISSING_MANDATORY_DATA");
		}
		
		List<UserReferralPointsMapping> refs =  repository.findUserReferralPointsMappingByUser(userRef.getUserName());
			if(refs.size() > 1) {
				throw new V2GenericException("MULTIPLE_RECORDS_SAME_KEY");
			}
		
			if(refs.size() == 0) {
				//create
				repository.save(userRef)	;
			}
			else {
				//update
				UserReferralPointsMapping userRef2 = refs.get(0);
				userRef2.setReferralPoints(userRef.getReferralPoints());
				repository.save(userRef2)	;
			}
	}
	
	
	
	
	@Transactional
	public void awardPoints(String userName, Float points) {
		UserReferralPointsMapping mapping = repository.findUniqueUserReferralPointsMappingByUser(userName);
		if(mapping == null) {
			Set<User> users = userService.findUsersByUserName(userName);
				if(users.size() == 0) {
					throw new V2GenericException("CANT_AWARD_POINTS_TO_NONEXISTENT_USER");
				}
			mapping = new UserReferralPointsMapping();
			mapping.setUserName(userName);
		}
		
		mapping.setReferralPoints(mapping.getReferralPoints() + points);
		repository.save(mapping)	;
	}
}
