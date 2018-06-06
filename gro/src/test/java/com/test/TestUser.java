package com.test;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.v2tech.domain.User;
import com.v2tech.domain.UserType;
import com.v2tech.repository.UserRepository;
import com.v2tech.services.UserService;
import com.v2tech.webservices.ResourceWebService;

import scala.collection.immutable.HashMap;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:appContext.xml" })
@Transactional
public class TestUser
	{
		@Autowired
		UserRepository		userRepository;
		
		@Autowired
		ResourceWebService	resourceWebService;
		
		@Autowired
		UserService			userService;
		
		@Test
		public void testGetJson() throws Exception{
			User user = new User();
			user.setFirstName("jatin");
			user.setUser("jatin.sutaria@thev2technologies.com");
			ObjectMapper mapper = new ObjectMapper();
			String s = mapper.writeValueAsString(user);
			System.out.println(s);
		}
		
		@Test
		public void testEncode(){
			String str = "ttt@yyy.com";
			str = URLEncoder.encode(str);
			System.out.println(str);
		}
		
		@Test
		public void testFetchUser()
			{
				User user = new User();
				user.setUser("jatin.sutaria@thev2technologies.com");
				Set<User> users = userRepository.findUserByNameAndSocialMediaType(user.getUser(), user.getSocialMediaType().getType());
				System.out.println(users.size());
			}
			
		@Test
		public void testCreateAdminUser()
			{
				User user = new User();
				user.setUserType(UserType.ADMIN);
				user.setUser("admin@grovenue.com");
				user.setPassword("Welcome@1");
				user.setValidated(true);
				//Ruser
				userService.saveOrUpdate(user);
			}
		
		@Test
		public void testCreateAnonymousUser() throws Exception
			{
				User user = new User();
				user.setUserType(UserType.STUDENT);
				user.setUser("anonymous@grovenue.com");
				user.setPassword("anonymous");
				user.setValidated(true);
				ObjectMapper mapper = new ObjectMapper();
				String str = mapper.writeValueAsString(user);
				System.out.println(str);
				//Ruser
				userService.saveOrUpdate(user);
			}
		
		@Test
		public void testCreateAkashUsers()  throws IOException{
			List<String> lines = FileUtils.readLines(new File("final.txt"));
			Map<String, User> map = new java.util.HashMap<>();
			
			for(String str : lines) {
				String[] values = str.split("\\s*,\\s*");
				String college = values[0];
				String email = values[1];
				String mobile = values[2];
				User user = new User();
				user.setUser(email);
				user.setValidated(true);
				user.setContact(mobile);
				user.setNameOfCollege(college);
				user.setPassword("qwerty");
				map.put(email, user);
			}
			
			for(User user : map.values()) {
				userService.saveOrUpdate(user);
			}
			
 
		}
			
		@Test
		public void testCreateNormalUser()
			{
				User user = new User();
				user.setUserType(UserType.STUDENT);
				user.setUser("jatin.sutaria@thev2technologies.com");
				user.setPassword("Welcome@1");
				user.setFirstName("Jatin");
				user.setLastName("Sutaria");
				user.setValidated(true);
				//Ruser
				userService.saveOrUpdate(user);
			}
			
		
	}
