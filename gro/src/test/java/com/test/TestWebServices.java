package com.test;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.apache.commons.io.FileUtils;
import org.apache.cxf.jaxrs.client.WebClient;
import org.apache.cxf.transport.http.HTTPConduit;
import org.junit.Before;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import com.v2tech.base.V2GenericException;
import com.v2tech.domain.SurveyFormData;
import com.v2tech.domain.User;

public class TestWebServices {
	static List<Object>	providers	= new ArrayList<Object>();
	static WebClient	webClient	= null;
	@Before
	public void setUp() throws Exception
		{
			try
				{
					providers.add(new JacksonJsonProvider());
					//webClient = WebClient.create("http://utilityapplications-socialapp.rhcloud.com/ws/rest/pdfBoxService/pdfToJavaOutput", providers);
					webClient = WebClient.create("http://grovenue.com/grovenue/ws/rest/resourceService/saveOrUpdateStudent/token/test", providers);
					webClient.header("Content-Type", "multipart/form-data");
					webClient.type(MediaType.APPLICATION_JSON);
					HTTPConduit conduit = WebClient.getConfig(webClient).getHttpConduit();
					conduit.getClient().setReceiveTimeout(0);
					webClient.accept("application/json").type("application/json");
					
				}
			catch (Exception e)
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
					throw e;
				}
		}
	
	@Test
	public void testCreateSurvey() throws JsonProcessingException {
		SurveyFormData data = new SurveyFormData();
		User user = new User();
		user.setUser("jatin.sutaria@trigyn.com");
		user.setFirstName("Jatin");
		user.setLastName("Sutaria");
		data.setUsr(user);
		data.setNewBookAdded(false);
		data.setSurveyTime(new Date().getTime());
		ObjectMapper  mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(data);
		System.out.println(json);
	}
	
	@Test	
	public void testTime() throws ParseException {
		String dt = "dd/MM/yyyy";
		String s = "27/04/2018";
		DateFormat df = new SimpleDateFormat(dt);
		long t = df.parse(s).getTime();
		System.out.println(t);
	}
	
	
	
	@Test
	public void testAddComma() throws IOException {
		List<String> lines = FileUtils.readLines(new File("1.txt"));
		List<String> lines2 =  FileUtils.readLines(new File("2.txt"));
		List<String> lines3 =  FileUtils.readLines(new File("3.txt"));
		
			if((lines.size() == lines2.size()) && (lines.size() == lines3.size())) {
				List<String> newLines = new ArrayList<>();
				for(int i=0;i<lines.size();i++) {
					String str1 = lines.get(i);
					String str2 = lines2.get(i);
					String str3 = lines3.get(i);
					String str = str1 +","+str2 +","+str3;
					newLines.add(str);
				}
				FileUtils.writeLines(new File("final.txt"), newLines, false);
			}
			else {
				throw new V2GenericException();
			}
		
	}
	
	@Test
	public void testStudentWithResume() throws Exception{
		
//		List<String> friends = FileUtils.readLines(new File("fb_users.txt"));
//			for(String row : friends) {
//				row = row.trim();
//				StringTokenizer stk1 = new StringTokenizer(row, ",");
//				if(stk1.countTokens() != 3) {
//					throw new V2GenericException("pronblemns reading");
//				}
//				String name1 = stk1.nextToken();
//				name1 = name1.trim();
//				StringTokenizer stk2 = new StringTokenizer(name1, " ");
//				String firstName="";
//				String lastName = "";
//				if(stk2.countTokens() == 2) {
//					 firstName = stk2.nextToken();
//					 lastName = stk2.nextToken();
//				}
//				else {
//					firstName = stk2.nextToken();
//				}
//				String email = stk1.nextToken();
//				String mobile = stk1.nextToken();
//				System.out.println(firstName+" "+lastName+" "+email+" "+mobile);
//				User user = new User();
//				user.setFirstName(firstName);
//				user.setLastName(lastName);
//				user.setUser(email);
//				user.setContact(mobile);
//				user.setValidated(true);
//				Response response = webClient.post(user);
//				System.out.println(response.getStatus());
//				try {
//					Thread.sleep(8000);
//				}
//				catch(Exception e) {
//					
//				}
//			}
		User user = new User();
		user.setFirstName("Pratik");
		user.setLastName("Gholap");
		user.setContact("9881721588");
		user.setUser("pratik.gholap@thev2technologies.com");
		user.setSchoolOfStudy("School of Study1");
		user.setInstitution("Institution 1");
		user.setNameOfCollege("Vivekans");
		user.setStandardOfStudy("First Year");
		byte[] res = FileUtils.readFileToByteArray(new File("architecturalAwareness.txt"));
		user.setResume(res);
		user.setResumeURLExtension("txt");
		ObjectMapper mapper = new ObjectMapper();
		String str = mapper.writeValueAsString(user);
		FileUtils.writeStringToFile(new File("userSample.json"), str);
//		Response response = webClient.post(user);
//		System.out.println(response.getStatus());
	}

}
