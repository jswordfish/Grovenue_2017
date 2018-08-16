package com.v2tech.webservices;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.v2.booksys.common.util.EmailGenericMessageThread;
import com.v2.booksys.common.util.EmailHtmlThread;
import com.v2.booksys.common.util.EmailResetPasswordThread;
import com.v2.booksys.common.util.EmailThread;
import com.v2.booksys.common.util.ReferralClient;
import com.v2.booksys.common.util.UtilService;
import com.v2tech.base.V2GenericException;
import com.v2tech.domain.Keyword;
import com.v2tech.domain.Mentor;
import com.v2tech.domain.MentorRequest;
import com.v2tech.domain.MentorWorkExperience;
import com.v2tech.domain.ResetPassword;
import com.v2tech.domain.SocialMediaType;
import com.v2tech.domain.SurveyFormData;
import com.v2tech.domain.User;
import com.v2tech.domain.UserCollegeDetails;
import com.v2tech.domain.UserInternshipDetails;
import com.v2tech.domain.UserSchoolDetails;
import com.v2tech.domain.UserType;
import com.v2tech.domain.UserWorkDetails;
import com.v2tech.domain.util.ResourceEntity;
import com.v2tech.domain.util.ServiceResponse;
import com.v2tech.dto.UserDetails;
import com.v2tech.repository.ResetPasswordRepository;
import com.v2tech.services.BookService;
import com.v2tech.services.CoachingClassService1;
import com.v2tech.services.CountryStateCityService;
import com.v2tech.services.DigitalToolService;
import com.v2tech.services.KeywordService;
import com.v2tech.services.MentorRequestService;
import com.v2tech.services.MentorService;
import com.v2tech.services.MentorWorkExperienceService;
import com.v2tech.services.ReferralMappingService;
import com.v2tech.services.ResetPasswordService;
import com.v2tech.services.ReviewService;
import com.v2tech.services.SurveyFormService;
import com.v2tech.services.UserCollegeDetailsService;
import com.v2tech.services.UserInternshipDetailsService;
import com.v2tech.services.UserKeywordRelationService;
import com.v2tech.services.UserSchoolDetailsService;
import com.v2tech.services.UserService;
import com.v2tech.services.UserWorkDetailsService;

@Path("/resourceService")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class ResourceWebService
	{
		
		Logger logger = LoggerFactory.getLogger(ResourceWebService.class);
	
		@Autowired
		UserService					userService;
		
		@Autowired
		ReviewService				reviewService;
		
		@Autowired
		KeywordService				keywordService;
		
		@Autowired
		BookService					bookService;
		
		@Autowired
		CoachingClassService1		coachingClassService;
		
		@Autowired
		UserKeywordRelationService	userKeywordRelationService;
		
		@Autowired
		CountryStateCityService		countryStateCityService;
		
		DateFormat					dateFormat	= new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		
		@Autowired
		DigitalToolService			digitalToolService;
		
		@Autowired
		ResetPasswordService  resetPasswordService;
		
		@Autowired
		ResetPasswordRepository resetPasswordRepository;
		
		@Autowired
		ReferralMappingService  referralService;
		
		@Autowired
		SurveyFormService surveyService;
		
		@Autowired
		UserSchoolDetailsService schoolDetailsService;
		
		@Autowired
		UserCollegeDetailsService collegeDetailsService;
		
		@Autowired
		UserInternshipDetailsService internshipDetailsService;
		
		@Autowired
		UserWorkDetailsService userWorkDetailsService;
		
		@PostConstruct
		public void init()
			{
				User user = new User();
				user.setUserType(UserType.ADMIN);
				user.setUser("grovenue.user@gmail.com");
				user.setPassword("grovenue@123");
				user.setValidated(true);
				userService.saveOrUpdate(user);
				
				User user1 = new User();
				user1.setUserType(UserType.SYSTEM);
				user1.setUser("admin@grovenue.com");
				user1.setPassword("admin@123");
				user1.setValidated(true);
				userService.saveOrUpdate(user1);
			}
			
		@Autowired
		public com.v2.booksys.common.util.InviteFriendsEmailService inviteFriendsEmailService;
		
		@GET
		@Path("/deleteUser")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response deleteUser(@QueryParam("userId") String userId)
			{
				System.out.println("userId " + userId);
				userService.deleteUser(userId);
				return Response.ok().build();
			}
			
		@POST
		@Path("/updatePassword/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response changePAssword(User user, @PathParam("token") String token)
			{
				if(!user.getSocialMediaType().getType().equalsIgnoreCase(SocialMediaType.NONE.getType())){
					return Response.status(Status.BAD_REQUEST).build();
				}
				
				
				userService.updatePassword(user);
				return Response.ok().build();
			}
		
		@POST
		@Path("/survey/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response createSurveyUserAndForm(SurveyFormData survey, @PathParam("token") String token){
			try {
				User user = survey.getUsr();
				survey.setUser(user.getUser());
				saveOrUpdateStudent(user, token);
				survey.setUsr(null);
				surveyService.createSurveyRecord(survey);
				return Response.ok().build();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				logger.error("Can't create survey record for user "+survey.getUsr().getUser(), e);
				return Response.status(Status.BAD_REQUEST).build();
			}
		}
		
		@POST
		@Path("/saveOrUpdateStudent/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateStudent(User user, @PathParam("token") String token){
			if (user == null)
			{
				throw new V2GenericException("Code-NullUserPassed,Msg-User can not be null");
			}
			
			user.setValidated(true);
			user.setSocialMediaType(SocialMediaType.NONE);
				if(user.getUser() == null) {
					user.setUser(user.getFirstName()+"."+user.getLastName()+"."+user.getStandardOfStudy());
				}
			
			user.setPassword("qwerty");
			user.setSocialMedia(false);
			user.setSocialMediaType(SocialMediaType.NONE);
			Date createdDate = new Date();
			user.setCreatedDate(createdDate);
			
		if ((user.getUser() != null) && (user.getUser().trim().length() == 0))
			{
				throw new V2GenericException("Code-InvalidUserNamePassed,Msg-Pass basic info");
			}
			
		
		User user1 = userService.getSingleUserBySocialMediaType(user);
		if (user1 != null)
			{
				return Response.ok().entity(user1).build();
					
			}
		else
			{
				
			user = userService.saveOrUpdate(user);
			//Send generic email
			try {
				String welcomeMailData = FileUtils.readFileToString(new File("surveymail.html"));
				welcomeMailData = welcomeMailData.replace("{FIRST_NAME}", user.getFirstName());
				welcomeMailData = welcomeMailData.replace("{USER_NAME}", user.getUser());
				welcomeMailData = welcomeMailData.replace("{PASSWORD}", user.getPassword());
				EmailGenericMessageThread client = new EmailGenericMessageThread(user.getUser(), "Welcome to Grovenue", welcomeMailData);
				Thread th = new Thread(client);
				th.start();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				String message = "Welcome mail could not be sent for "+user.getFullName() +" using "+user.getUser()+" email id";
				EmailGenericMessageThread client = new EmailGenericMessageThread("jatin.sutaria@thev2technologies.com", "Welcome Email sending failed", message);
				Thread th = new Thread(client);
				th.start();
			}
				
			}
	
		//Response.ok().e
		return Response.ok().entity(user).build();
		}
		
		@POST
		@Path("/saveOrUpdateStudentIntern/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateStudentIntern(User user, @PathParam("token") String token){
			if (user == null)
			{
				throw new V2GenericException("Code-NullUserPassed,Msg-User can not be null");
			}
			
			user.setValidated(true);
			user.setSocialMediaType(SocialMediaType.NONE);
				if(user.getUser() == null) {
					user.setUser(user.getFirstName()+"."+user.getLastName()+"."+user.getStandardOfStudy());
				}
			
			user.setPassword("qwerty");
			user.setSocialMedia(false);
			user.setSocialMediaType(SocialMediaType.NONE);
			Date createdDate = new Date();
			user.setCreatedDate(createdDate);
			
		if ((user.getUser() != null) && (user.getUser().trim().length() == 0))
			{
				throw new V2GenericException("Code-InvalidUserNamePassed,Msg-Pass basic info");
			}
			
		
		User user1 = userService.getSingleUserBySocialMediaType(user);
		if (user1 != null)
			{
				return Response.ok().entity(user1).build();
					
			}
		else
			{
				
			user = userService.saveOrUpdate(user);
			//Send generic email
			try {
				String welcomeMailData = FileUtils.readFileToString(new File("internmail.html"));
				welcomeMailData = welcomeMailData.replace("{FIRST_NAME}", user.getFirstName());
				welcomeMailData = welcomeMailData.replace("{USER_NAME}", user.getUser());
				welcomeMailData = welcomeMailData.replace("{PASSWORD}", user.getPassword());
				EmailGenericMessageThread client = new EmailGenericMessageThread(user.getUser(), "Welcome to Grovenue", welcomeMailData);
				Thread th = new Thread(client);
				th.start();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				String message = "Welcome mail could not be sent for "+user.getFullName() +" using "+user.getUser()+" email id";
				EmailGenericMessageThread client = new EmailGenericMessageThread("jatin.sutaria@thev2technologies.com", "Welcome Email sending failed", message);
				Thread th = new Thread(client);
				th.start();
			}
				
			}
	
		//Response.ok().e
		return Response.ok().entity(user).build();
		}
		
		@GET
		@Path("/getUserWithAllDetails/user/{user}/socialMedia/{socialMedia}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response getUserWithAllDetails(  @PathParam("user") String user, @PathParam("socialMedia") String socialMedia, @PathParam("token") String token) {
			User usr = new User(user, SocialMediaType.valueOf(socialMedia));
			User u = userService.getSingleUserBySocialMediaType(usr);
			if(u == null) {
				return Response.status(Status.PRECONDITION_FAILED).entity("NO USER FOUND").build();
			}
			
			UserSchoolDetails schoolDetails = schoolDetailsService.getSchoolDetails(user, socialMedia);
			UserCollegeDetails collegeDetails = collegeDetailsService.getCollegeDetails(user, socialMedia);
			List<UserInternshipDetails> userInternshipDetailsList = internshipDetailsService.getDetails(user, socialMedia);
			List<UserWorkDetails> workDetailsList = userWorkDetailsService.getDetails(user, socialMedia);
			
			UserDetails userDetails = new UserDetails();
			userDetails.setUser(u);
			userDetails.setSchoolDetails(schoolDetails);
			userDetails.setCollegeDetails(collegeDetails);
			userDetails.setInternshipDetails(userInternshipDetailsList);
			userDetails.setWorkDetails(workDetailsList);
			return Response.ok().entity(userDetails).build();
			
		}
		
		@POST
		@Path("/saveOrUpdateUserSchoolDetails/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateUserSchoolDetails(UserSchoolDetails schoolDetails, @PathParam("token") String token) {
			try {
			schoolDetailsService.saveOrUpdate(schoolDetails);
			return Response.ok().entity("ok").build();
			}
			catch(V2GenericException e) {
				return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
			}
		}
		
		@POST
		@Path("/saveOrUpdateUserWorkDetailsList/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateUserWorkDetailsList(List<UserWorkDetails> userWorkDetailsList, @PathParam("token") String token) {
			try {
				for(UserWorkDetails details : userWorkDetailsList) {
					userWorkDetailsService.saveOrUpdate(details);
				}
			
			return Response.ok().entity("ok").build();
			}
			catch(V2GenericException e) {
				return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
			}
		}
		
		
		@POST
		@Path("/saveOrUpdateUserWorkDetails/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateUserWorkDetails(UserWorkDetails userWorkDetails, @PathParam("token") String token) {
			try {
			userWorkDetailsService.saveOrUpdate(userWorkDetails);
			return Response.ok().entity("ok").build();
			}
			catch(V2GenericException e) {
				return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
			}
		}
		
		
		@POST
		@Path("/saveOrUpdateUserInternshipDetailsList/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateUserInternshipDetailsList(List<UserInternshipDetails> internshipDetailsList, @PathParam("token") String token) {
			try {
				for(UserInternshipDetails userInternshipDetails : internshipDetailsList) {
					internshipDetailsService.saveOrUpdate(userInternshipDetails);
				}
			
			return Response.ok().entity("ok").build();
			}
			catch(V2GenericException e) {
				return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
			}
		}
		
		@POST
		@Path("/saveOrUpdateUserInternshipDetails/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateUserInternshipDetails(UserInternshipDetails internshipDetails, @PathParam("token") String token) {
			try {
			internshipDetailsService.saveOrUpdate(internshipDetails);
			return Response.ok().entity("ok").build();
			}
			catch(V2GenericException e) {
				return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
			}
		}
		
		@POST
		@Path("/saveOrUpdateUserCollegeDetails/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateUserCollegeDetails(UserCollegeDetails collegeDetails, @PathParam("token") String token) {
			try {
			collegeDetailsService.saveOrUpdate(collegeDetails);
			return Response.ok().entity("ok").build();
			}
			catch(V2GenericException e) {
				return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
			}
		}
			
		@POST
		@Path("/saveOrUpdateUser/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateUser(User user, @PathParam("token") String token)
			{
				ServiceResponse response = new ServiceResponse();
				if (user == null)
					{
						throw new V2GenericException("Code-NullUserPassed,Msg-User can not be null");
					}
					
				if ((user.getUser() != null) && (user.getUser().trim().length() == 0))
					{
						throw new V2GenericException("Code-InvalidUserNamePassed,Msg-User can not be blank");
					}
					
				if ((user.getBirthDate() != null) && (user.getBirthDate().trim().length() > 8))
					{
						DateFormat format = new SimpleDateFormat("dd-MM-yyyy", Locale.ENGLISH);
						try
							{
								Date date = format.parse(user.getBirthDate());
								user.setBirthday(date);
							}
						catch (ParseException e)
							{
								// TODO Auto-generated catch block
								e.printStackTrace();
								throw new V2GenericException("Code-InvalidBirthDate,Msg-User Birth Date is invalid. Use dd/MM/yyyy format to enter date value");
							}
					}
				User user1 = userService.getSingleUserBySocialMediaType(user);
				if (user1 != null)
					{
						//throw new V2GenericException("Code-UserAlreadyExists");
						//verify the token to see if it is indeed that user who wants to update his personal info
						
						//user.setLastModifiedDate(updatedDate);
						
						if (user1.getSocialMediaType().getType().equalsIgnoreCase(SocialMediaType.NONE.getType()))
							{
								//Date updatedDate = new Date();
								userService.saveOrUpdate(user);
								response.setRequestType("User_Save_Request");
								response.setResponseStatus("User_Exists_Normal");
								return Response.ok().entity(response).build();
							}
						else
							{
								/*
								 * User already exists as a result of social media login earlier.
								 */
								/**
								 * Am commenting this on 14 june because i don't think there should be 2 users corresponding to same person - 1 created through Social media login and another created through user registration.
								 */
								response.setRequestType("User_Save_Request");
								response.setResponseStatus("User_Exists_Social_Media_" + user.getSocialMediaType().getType());
								return Response.ok().entity(response).build();
							}
							
					}
				else
					{
						boolean isSocialMediaUser = user.isSocialMedia();
						Date createdDate = new Date();
						user.setCreatedDate(createdDate);
						user.setValidated((isSocialMediaUser == true) ? true : false);
						userService.saveOrUpdate(user);
						
						
						if (isSocialMediaUser == false)
							{
								Thread thread = new Thread(new EmailHtmlThread(user));
								thread.start();
							}
						else {
							//sent email to social media user for first time
							//String referralCode = referralService.generateReferralForUser(user.getFirstName() == null ?user.getUser():user.getFirstName(), user.getUser());
							//String html = ReferralClient.getContent();
							//html = html.replaceAll("&amp;Referral_Code&amp;", referralCode);
//							EmailGenericMessageThread email = new EmailGenericMessageThread(user.getUser(), "Grovenue Referral Program", html);
//							Thread th = new Thread(email);
//							th.start();
						}
					}
				response.setRequestType("User_Save_Request");
				response.setResponseStatus("User_Saved");
				//Response.ok().e
				return Response.ok().entity(response).build();
			}
		
		
		
		@POST
		@Path("/resetPassword/user/{user}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response resetPassword(@PathParam("user") String user, @PathParam("token") String token){
			//step 1 check if the user is genuine
			User usr = new User();
			usr.setSocialMedia(false);
			usr.setSocialMediaType(SocialMediaType.NONE);
			usr.setUser(user);
			usr = userService.getSingleUserBySocialMediaType(usr);
				if(usr == null){
					return Response.ok().entity("Invalid_Email").build();
				}
				
			
			//step 2 save in resetpassword object  
			ResetPassword resetPassword = new ResetPassword();
			resetPassword.setReset(true);
			resetPassword.setUser(user);
			resetPasswordService.saveOrUpdate(resetPassword);
			//send the link
			Thread th = new Thread(new EmailResetPasswordThread(usr));
			th.start();
			return Response.ok().build();
		}
		
		
		@POST
		@Path("/saveResetPassword/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveResetPassword(User user, @PathParam("token") String token)
			{
				//ResetPassword password = resetPasswordRepository.getResetPassword(user.getUser());
//				if(!password.isReset()){
//					return	Response.ok().entity("Password_Already_Reset").build();
//				}
//				password.setReset(false);
//				resetPasswordService.saveOrUpdate(password);
			
				userService.updatePassword(user);
				return Response.ok().build();
			}
		
			
		@GET
		@Path("/user/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public User getUserFormat()
			{
				User user = new User();
				return user;
			}
			
		@GET
		@Path("/careerStreams/user/{user}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public String[] getCareerStreams(@PathParam("token") String token)
			{
				String carStreams[] = new String[] { "Engineering", "Medical (MBBS)", "Pharmacy", "Nursing", "Architecture", "Law", "Design", "Hospitality", "Management / Business", "Journalism / Media", "Other", "Other Commerce", "Other Science", "Other Medical", "Other" };
				return carStreams;
			}
			
		@POST
		@Path("/authenticate/user/{user}/password/{password}/socialMediaType/{socialMediaType}")
		public Response authenticate(@PathParam("user") String user, @PathParam("password") String password, @PathParam("socialMediaType") String socialMediaType)
			{
				try
					{
						SocialMediaType mediaType = SocialMediaType.valueOf(socialMediaType);
						if (mediaType == null)
							{
								return Response.status(Status.BAD_REQUEST).entity("Invalid Social Media Type " + socialMediaType).build();
							}
							
						User usr = userService.getSingleUserBySocialMediaType(new User(user, SocialMediaType.valueOf(socialMediaType)));
						
							if(usr == null){
								return Response.status(Status.BAD_REQUEST).entity("Invalid Credentials").build();
							}
						
							if(!usr.isValidated()){
								return Response.status(Status.BAD_REQUEST).entity("User Not Validated").build();
							}
						
						if ((usr != null) && usr.getPassword().equals(password))
							{
								//return Response.ok().entity("Token-"+System.currentTimeMillis()).build();
								return Response.ok().entity(usr).build();
							}
						return Response.status(Status.BAD_REQUEST).entity("Invalid Credentials").build();
					}
				catch (Exception e)
					{
						// TODO Auto-generated catch block
						e.printStackTrace();
						return Response.status(Status.SERVICE_UNAVAILABLE).entity("Invalid Credentials").build();
					}
			}
			
		@POST
		@Path("/verifyUser/user/{user}/socialMediaType/{socialMediaType}/token/{token}")
		public String verifyUser(@PathParam("user") String user, @PathParam("socialMediaType") String socialMediaType, @PathParam("token") String token)
			{
				try
					{
						SocialMediaType mediaType = SocialMediaType.valueOf(socialMediaType);
						if (mediaType == null)
							{
								return "Code-InvalidMediaTypeSent";
							}
							
						byte[] verCode = Base64.decodeBase64(user.getBytes());
						String actualUser = new String(verCode);
						
						User usr = userService.getSingleUserBySocialMediaType(new User(user, SocialMediaType.valueOf(socialMediaType)));
						if (usr.isValidated())
							{
								return "Code-UserAlreadyValidated";
							}
						usr.setValidated(true);
						userService.saveOrUpdate(usr);
						return "Code-Success";
					}
				catch (Exception e)
					{
						// TODO Auto-generated catch block
						e.printStackTrace();
						return "Code-UserValidationFailed";
					}
			}
			
		@POST
		@Path("/addFriendsToUser/user/{user}/socialMediaType/{socialMediaType}/token/{token}")
		public String addFriendsToUser(Set<User> users, @PathParam("user") String user, @PathParam("socialMediaType") String socialMediaType, @PathParam("token") String token)
			{
				try
					{
						SocialMediaType mediaType = SocialMediaType.valueOf(socialMediaType);
						if (mediaType == null)
							{
								return "Code-InvalidMediaTypeSent";
							}
						User user1 = new User(user, mediaType);
						userService.addFriendsToUser(user1, users);
						
						return "Code-Success";
					}
				catch (Exception e)
					{
						// TODO Auto-generated catch block
						e.printStackTrace();
						return "Code-AddFriendsFailed";
					}
			}
			
		@GET
		@Path("/retrievePassword/user/{user}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public boolean retrievePassword(@PathParam("user") String user, @PathParam("token") String token)
			{
				if (user == null)
					{
						throw new V2GenericException("Code-NullUserPassed,Msg-User can not be null");
					}
					
				if (user.trim().length() == 0)
					{
						throw new V2GenericException("Code-InvalidUserNamePassed,Msg-User can not be blank");
					}
					
				User user1 = userService.getSingleUserBySocialMediaType(new User(user, SocialMediaType.NONE));
				if (user1 == null)
					{
						throw new V2GenericException("Code-UserNotExisting,Msg-User does not exist");
					}
					
				String sentMail = UtilService.getValue("sentMail");
				if ((sentMail != null) && sentMail.equalsIgnoreCase("true"))
					{
						Date createdDate = user1.getCreatedDate();
						String dateTime = dateFormat.format(createdDate);
						Thread thread = new Thread(new EmailThread(user, dateTime, true, user1.getPassword(), null));
						thread.start();
					}
				return true;
			}
			
		@GET
		@Path("/autoComplete/start/user/{user}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public Set<Keyword> getBooksStartsWith(@PathParam("user") String user, @PathParam("token") String token)
			{
				return keywordService.getAutowireKeywords("a");
			}
			
		@GET
		@Path("/autoComplete/contains/text/{text}/user/{user}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public Set<Keyword> getBooksContains(@PathParam("text") String text, @PathParam("user") String user, @PathParam("token") String token)
			{
				return keywordService.getAutowireKeywordsContains(text);
			}
			
		@GET
		@Path("/autoCompleteText/start/user/{user}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public Set<Keyword> getBooksTextStartsWith(@PathParam("user") String user, @PathParam("token") String token)
			{
				return keywordService.getAutowireKeywords("a");
			}
			
		@GET
		@Path("/autoCompleteText/contains/text/{text}/user/{user}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public Set<Keyword> getBooksTextContains(@PathParam("text") String text, @PathParam("user") String user, @PathParam("token") String token)
			{
				return keywordService.getAutowireKeywordsContains(text);
			}
			
		/**
		 * <br>
		 *
		 * @Author : puneetsharma <br>
		 * @createdDate : 05-Jul-2016 <br>
		 * @createdTime : 12:37:01 pm <br>
		 * @methodName : getUserByUserNameAndSocialMediaType <br>
		 * @methodPackage : com.v2tech.webservices <br>
		 * @Description : <br>
		 * @StepsWithExplanation : <br>
		 * @TODO : <br>
		 * @param socialMediaType
		 *            <br>
		 * @param token
		 *            <br>
		 * @param emailAddress
		 *            <br>
		 * @return
		 */
		@GET
		@Path("/getUserByEmailAddressAndSocialMediaType/socialMediaType/{socialMediaType}/token/{token}")
		public User getUserByUserNameAndSocialMediaType(@PathParam("socialMediaType") String socialMediaType, @PathParam("token") String token, @QueryParam("emailAddress") String emailAddress)
			{
				User user = userService.getUserByUserNameAndSocialMediaType(emailAddress, socialMediaType);
				if (user != null)
					{
						user.setFriends(new HashSet<User>());
					}
				return user;
			}
			
		/**
		 * <br>
		 *
		 * @Author : puneetsharma <br>
		 * @createdDate : 05-Jul-2016 <br>
		 * @createdTime : 12:37:08 pm <br>
		 * @methodName : inviteFriendThroughSocialMedia <br>
		 * @methodPackage : com.v2tech.webservices <br>
		 * @Description : <br>
		 * @StepsWithExplanation : <br>
		 * @TODO : <br>
		 * @param socialMediaType
		 *            <br>
		 * @param userId
		 *            <br>
		 * @param emailObject
		 */
		@POST
		@Path("inviteFriendThroughSocialMedia/socialMediaType/{socialMediaType}/token/{token}")
		public void inviteFriendThroughSocialMedia(@PathParam("socialMediaType") String socialMediaType, @QueryParam("userId") String userId, Map<String, Object> emailObject)
			{
				if ((emailObject == null) || (emailObject.size() < 2))
					{
						return;
					}
				List<String> emailAddresses = (ArrayList<String>) emailObject.get("emailAddresses");
				String invitationMessage = (String) emailObject.get("invitationMessage");
				User user = userService.getUserByUserNameAndSocialMediaType(userId, socialMediaType);
				inviteFriendsEmailService.inviteFriendsViaEmail(user.getFullName(), invitationMessage, emailAddresses);
			}
			
		/**
		 * <br>
		 *
		 * @Author : puneetsharma <br>
		 * @createdDate : 05-Jul-2016 <br>
		 * @createdTime : 12:37:17 pm <br>
		 * @methodName : addFriendsFromSocialMedia <br>
		 * @methodPackage : com.v2tech.webservices <br>
		 * @Description : <br>
		 * @StepsWithExplanation : <br>
		 * @TODO : <br>
		 * @param socialMediaType
		 *            <br>
		 * @param userId
		 *            <br>
		 * @param socialMediaFriends
		 *            <br>
		 * @return
		 */
		@POST
		@Path("addFriendsFromSocialMedia/socialMediaType/{socialMediaType}/token/{token}")
		public List<Map<String, String>> addFriendsFromSocialMedia(@PathParam("socialMediaType") String socialMediaType, @QueryParam("userId") String userId, List<Map<String, String>> socialMediaFriends)
			{
				List<Map<String, String>> nonSystemUser = new ArrayList<Map<String, String>>();
				if ((socialMediaFriends == null) || (socialMediaFriends.size() < 2))
					{
						return nonSystemUser;
					}
				User user = userService.getUserByUserNameAndSocialMediaType(userId, socialMediaType);
				Set<User> systemUser = new HashSet<User>();
				List<String> tempEmailIds = new ArrayList<>();
				for (Map<String, String> socialMediaFriend : socialMediaFriends)
					{
						String email = socialMediaFriend.get("email");
						if (email != null)
							{

								if (tempEmailIds.contains(email) == false)
									{
										Set<User> _systemUsers = userService.findUsersByUserName(email);
										if ((_systemUsers != null) && (_systemUsers.size() > 0))
											{
												systemUser.addAll(_systemUsers);
											}
										else
											{
												nonSystemUser.add(socialMediaFriend);
											}
										tempEmailIds.add(email);
									}

							}
					}
				userService.addFriendsToUser(user, systemUser);
				return nonSystemUser;
			}
			
		@GET
		@Consumes("application/json")
		@Produces("application/json")
		@Path("getResourceEntityBasedByUponSearchCriteria/token/{token}")
		public List<ResourceEntity> getResourceEntityBasedByUponSearchCriteria(@DefaultValue("anonymous") @QueryParam("userId") String userId, @DefaultValue("None") @QueryParam("keyword") String keyword, @DefaultValue("generic") @QueryParam("searchType") String searchType, @DefaultValue("book") @QueryParam("searchEntity") String searchEntity, @DefaultValue("location") @QueryParam("location") String location, @DefaultValue("20") @QueryParam("resourceLimit") Integer resourceLimit)
			{
			
				List<ResourceEntity> resourceEntities = new ArrayList<ResourceEntity>();
				if ((userId == null) || (userId.trim().length() == 0) || userId.trim().equalsIgnoreCase("anonymous"))
					{
						searchType = "generic";
						userId = "admin@grovenue.com";
					}
				switch (searchEntity)
					{
						case "book":
							{
								if (keyword.trim().equalsIgnoreCase("None"))
									{
										if (searchType.equalsIgnoreCase("preference"))
											{
												resourceEntities.addAll(bookService.findBooksForUserPreference(userId));
											}
										else if (searchType.equalsIgnoreCase("recommendation"))
											{
												resourceEntities.addAll(bookService.findBooksForUserFriends(userId));
											}
										else if (searchType.equalsIgnoreCase("rating"))
											{
												resourceEntities.addAll(bookService.findBooksForTopRating(userId, resourceLimit));
											}
										else if (searchType.equalsIgnoreCase("generic"))
											{
												resourceEntities.addAll(bookService.findBooksForTopRating(userId, resourceLimit));
											}
										else
											{
												resourceEntities.addAll(bookService.findBooksForTopRating(userId, resourceLimit));
											}
									}
								else
									{
										resourceEntities.addAll(bookService.userDefinedSearch(userId, keyword));
									}
								break;
							}
						case "coachingClass":
							{
								if (keyword.trim().equalsIgnoreCase("None"))
									{
										if (searchType.equalsIgnoreCase("preference"))
											{
												resourceEntities.addAll(coachingClassService.findCoachingClassesForUserPreference(userId, location, 5.0));
											}
										else if (searchType.equalsIgnoreCase("recommendation"))
											{
												resourceEntities.addAll(coachingClassService.findCoachingClasessForUserFriends(userId, location, 5.0));
											}
										else if (searchType.equalsIgnoreCase("rating"))
											{
												resourceEntities.addAll(coachingClassService.findCoachingClassesForRating(userId, location, 5.0));
											}
										else if (searchType.equalsIgnoreCase("generic"))
											{
												resourceEntities.addAll(coachingClassService.findCoachingClassesForRating(userId, location, 5.0));
											}
										else
											{
												resourceEntities.addAll(coachingClassService.findCoachingClassesForRating(userId, location, 5.0));
											}
									}
								else
									{
										Set<String> coachingClassKeywords = new LinkedHashSet<String>();
										coachingClassKeywords.add(keyword);
										resourceEntities.addAll(coachingClassService.findCoachingClassesByCriteria(userId, coachingClassKeywords, "searched", location, 5.0));
										userKeywordRelationService.increaseSearchTermCounterForUser(userId, keyword);
									}
								break;
							}
						case "digitalResource":
							{
								if (keyword.trim().equalsIgnoreCase("None"))
									{
										if (searchType.equalsIgnoreCase("preference"))
											{
												resourceEntities.addAll(digitalToolService.findDigitalResourceForUserPreference(userId));
											}
										else if (searchType.equalsIgnoreCase("recommendation"))
											{
												resourceEntities.addAll(digitalToolService.findDigitalResourceForFriends(userId));
											}
										else if (searchType.equalsIgnoreCase("rating"))
											{
												resourceEntities.addAll(digitalToolService.searchTopRatedDigitalTool(resourceLimit));
											}
										else if (searchType.equalsIgnoreCase("generic"))
											{
												resourceEntities.addAll(digitalToolService.searchTopRatedDigitalTool(resourceLimit));
											}
										else
											{
												resourceEntities.addAll(digitalToolService.searchTopRatedDigitalTool(resourceLimit));
											}
									}
								else
									{
										resourceEntities.addAll(digitalToolService.searchTopRatedDigitalToolByKeyword(keyword, resourceLimit));
										userKeywordRelationService.increaseSearchTermCounterForUser(userId, keyword);
									}
									
								break;
							}
					}
					
				if (resourceEntities.size() > resourceLimit)
					{
						return resourceEntities.subList(0, resourceLimit);
					}
				return resourceEntities;
			}
			
		@GET
		@Consumes("application/json")
		@Produces("application/json")
		@Path("findByDistinctStateAndCityForGivenCountry/token/{token}")
		public Map<String, List<String>> findByDistinctStateAndCityForGivenCountry(@PathParam("token") String token, @DefaultValue("India") @QueryParam("country") String country)
			{
				return countryStateCityService.findByDistinctStateAndCityForGivenCountry(country);
			}
		
		
		@Autowired
		MentorService mentorService;
		
		@Autowired
		MentorRequestService mentorRequestService;
		
		@Autowired
		MentorWorkExperienceService mentorWorkExperienceService;
		
		
		
		@POST
		@Path("/saveOrUpdateMentorOnly/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateMentorOnly(Mentor mentor, @PathParam("token") String token){
			logger.debug("in saveOrUpdateMentor");
			logger.info("in saveOrUpdateMentor");
			System.out.println("in saveOrUpdateMentor");
			if (mentor == null || mentor.getEmail() == null || mentor.getEmail().trim().length() == 0)
			{
				throw new V2GenericException("Code-BasicDetailsNotPassed,Msg-Mentor or email can not be null");
			}
		
			mentorService.saveOrUpdate(mentor);

		//Response.ok().e
		return Response.ok(mentor).build();
		}
		
		@POST
		@Path("/saveOrUpdateMentorWorkExperiences/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateMentorWorkExperience(List<MentorWorkExperience> workExperiences, @PathParam("token") String token){
			logger.debug("in saveOrUpdateMentor");
			logger.info("in saveOrUpdateMentor");
			System.out.println("in saveOrUpdateMentor");
			if (workExperiences.size() == 0)
			{
				throw new V2GenericException("No work experience to be saved");
			}
		
			for(MentorWorkExperience mentorWorkExperience : workExperiences) {
				mentorWorkExperienceService.saveOrUpdateMentorWorkExperience(mentorWorkExperience);
			}
			

		//Response.ok().e
		return Response.ok().build();
		}
		
		@GET
		@Path("/fetchMentorWorkExperiences/mentorEmail/{mentorEmail}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public List<MentorWorkExperience> fetchMentorWorkExperiences(@PathParam("mentorEmail") String mentorEmail, @PathParam("token") String token){
			logger.debug("in saveOrUpdateMentor");
			logger.info("in saveOrUpdateMentor");
			List<MentorWorkExperience> mentorWorkExperiences = mentorWorkExperienceService.getMentorWorkExperiences(mentorEmail);
			

		//Response.ok().e
		return mentorWorkExperiences;
		}
		
		@POST
		@Path("/saveOrUpdateMentorRequest/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Response saveOrUpdateMentorRequest(MentorRequest mentorRequest, @PathParam("token") String token){
		
		
			mentorRequestService.saveOrUpdate(mentorRequest);

		//Response.ok().e
		return Response.ok(mentorRequest).build();
		}

		@GET
		@Path("/getMentorForCategory/category/{category}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public List<Mentor> getMentorForCategory(@PathParam("category") String category, @PathParam("token") String token)
			{
				return mentorService.findMentorsByCategory(category);
			}
		
		@GET
		@Path("/getMentorForCategoryAndLanguage/category/{category}/language/{language}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public List<Mentor> getMentorForCategoryAndLanguage(@PathParam("category") String category, @PathParam("language") String language, @PathParam("token") String token)
			{
				return mentorService.findMentorsByCategoryAndLanguage(category, language);
			}
		

		@POST
		@Path("/approveMentor/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public void approveMentor(Mentor mentor) {
			mentorService.markMentorAsValidated(mentor);
		}
		
		@GET
		@Path("/getValidatedMentorForCategory/category/{category}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public List<Mentor> getValidatedMentorForCategory(@PathParam("category") String category, @PathParam("token") String token)
			{
				return mentorService.findValidatedMentorsByCategory(category, true);
			}
		
		@GET
		@Path("/getValidatedMentorForCategoryAndLanguage/category/{category}/language/{language}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public List<Mentor> getValidatedMentorForCategoryAndLanguage(@PathParam("category") String category, @PathParam("language") String language, @PathParam("token") String token)
			{
				return mentorService.findValidatedMentorsByCategoryAndLanguage(category, language, true);
			}
			
		
		@GET
		@Path("/getAllUnValidatedMentors/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		public List<Mentor> getAllUnValidatedMentors( @PathParam("token") String token)
			{
				return mentorService.findAllUnValidatedMentors();
			}
		

		@POST
		@Path("/sendMentorInvite/email/{email}/subject/{subject}/firstName/{firstName}/token/{token}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public void sendMentorInvite(@PathParam("email") String email, @PathParam("subject") String subject, @PathParam("firstName") String firstName, @PathParam("token") String token) throws IOException {
			String welcomeMailData = FileUtils.readFileToString(new File("mentor.html"));
			welcomeMailData = welcomeMailData.replace("[F_name]", firstName);
			
			EmailGenericMessageThread client = new EmailGenericMessageThread(email, subject, welcomeMailData);
			Thread th = new Thread(client);
			th.start();
		}
	}
