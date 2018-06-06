package com.v2tech.services;

import java.util.Date;
import java.util.Random;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.ReferalMappingUsageSummary;
import com.v2tech.domain.ReferralMapping;
import com.v2tech.domain.User;
import com.v2tech.repository.ReferalMappingUsageSummaryRepository;
import com.v2tech.repository.ReferralMappingRepository;

@Service
@Transactional
public class ReferralMappingService {
	@Autowired
	ReferralMappingRepository repository;
	
	@Autowired
	ReferalMappingUsageSummaryRepository summaryRepository;
	
	@Autowired
	UserReferralPointsMappingService pointsMappingService;
	
	@Autowired
	UserService userService;
	
	Random random = new Random();
	
	Random post = new Random();
	private String STRING = "ABCDEFGHIJKLMNOPQRSTUVWZYZ";
	
	private  final Integer LENGTH = 2;
	
	public void save(ReferralMapping mapping ) {
		if(mapping.getReferralCode() == null || mapping.getReferralCode().isEmpty()) {
			throw new V2GenericException("BLANK_REFERRAL_CODE");
		}
		
		if(mapping.getOriginatedByUser() == null || mapping.getOriginatedByUser().isEmpty()) {
			throw new V2GenericException("MISSING_MANDATORY_PARAMS");
		}
		
		ReferralMapping mapping2 = repository.findUniqueReferralMappingByReferralCode(mapping.getReferralCode());
			if(mapping2 == null) {
				//create
				mapping.setStatus(true);
				mapping.setCreatedDate(new Date());
				repository.save(mapping);
			}
			else {
				//update
				throw new V2GenericException("EXISTS");
			}
	}
	
	private String getReferralCode(String userFirstName) {
		String prefix = "";
		if(userFirstName.length() >= 3) {
			prefix += userFirstName.substring(0, 3).toUpperCase();
		}
		else if(userFirstName.length() == 2) {
			prefix += userFirstName.substring(0, 2).toUpperCase()+"Z";
		}
		else {
			throw new V2GenericException("FIRST_NAME_SMALL");
		}
		
		Integer num = random.nextInt(99);
		String postfix = "";
			
				int ran = post.nextInt(STRING.length() - 1);
					if(ran == -1) {
						ran = 0;
					}
				int ran2 = post.nextInt(STRING.length() - 1);
					if(ran2 == -1) {
						ran2 = 0;
					}
		postfix = ""+ STRING.charAt(ran) + STRING.charAt(ran2);
			String numString = "";
			if(num < 10) {
				numString = "0"+num;
			}
			else {
				numString = ""+num;
			}
		
		String referralCode = prefix + numString + postfix;
		return referralCode;
	}
	
	public String generateReferralForUser(String userFirstName, String userName) {
		
		String referralCode = getReferralCode(userFirstName);
			while(repository.findUniqueReferralMappingByReferralCode(referralCode) != null) {
				referralCode = getReferralCode(userFirstName);
			}
					
		ReferralMapping	mapping = new ReferralMapping();
		mapping.setOriginatedByUser(userName);
		mapping.setReferralCode(referralCode);
		save(mapping);
		return referralCode;
		
	}
	
	public Boolean redeemReferalCode(String referralCode, String friendUserName) {
		
		ReferralMapping mapping2 = repository.findUniqueReferralMappingByReferralCode(referralCode);
			if(mapping2 == null) {
				return false;
			}
			
		Set<User> users = userService.findUsersByUserName(friendUserName);
			if(users.size() == 0) {
				return false;
			}	
			/**
			 * Don't award points if already redeemed by the same user. Now status is irrevelant
			 */
//			if(!mapping2.getStatus()) {
//				return false;
//			}
			//ReferralMapping mapping2 = repository.findUniqueReferralMappingByReferralCodeAndUsedByUser(referralCode, friendUserName);
			
			ReferalMappingUsageSummary summary = summaryRepository.findReferalMappingUsageSummaryByReferralCodeAndUsedByUser(referralCode, friendUserName);
				if(summary != null) {
					return false;
				}
				else {
					summary = new ReferalMappingUsageSummary();
					summary.setOriginatedByUser(mapping2.getOriginatedByUser());
					summary.setRedeemedDate(new Date());
					summary.setReferralCode(referralCode);
					summary.setUsedByUser(friendUserName);
					summaryRepository.save(summary);
				}
//			mapping2.setStatus(false);
//			mapping2.setRedeemedDate(new Date());
//			mapping2.setUsedByUser(friendUserName);
//			repository.save(mapping2);
			
			/**
			 * Award points to originator
			 */
			pointsMappingService.awardPoints(mapping2.getOriginatedByUser(), mapping2.getPointsToReferrer());
			
			/**
			 * Award points to friend
			 */
			pointsMappingService.awardPoints(friendUserName, mapping2.getPointsToFriend());
			return true;
			
	}

}
