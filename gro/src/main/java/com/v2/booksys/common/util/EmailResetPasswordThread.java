package com.v2.booksys.common.util;

import java.net.URLEncoder;
import java.util.regex.Pattern;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.v2tech.base.V2GenericException;
import com.v2tech.domain.User;

public class EmailResetPasswordThread implements Runnable
{
	User		user;
	
	//static String htmlUserRegStr = "";
	
	HtmlEmail	he	= new HtmlEmail();
	
	public EmailResetPasswordThread(User user)
		{
			this.user = user;
		}
		
	@Override
	public void run()
		{
			// TODO Auto-generated method stub
			try
				{
					String path = "password_reset.txt";
					Resource resource = new ClassPathResource(path);
					String msg = FileUtils.readFileToString(resource.getFile());
					String name = user.getFirstName() + " " + user.getLastName();
					msg = msg.replaceAll(Pattern.quote("$Name$"), name);
					
					String verLink = UtilService.getValue("baseUrl");
					byte[] data = Base64.encodeBase64(this.user.getUser().getBytes());
					String encoded = new String(data);
					encoded = URLEncoder.encode(encoded);
					verLink = verLink +"/resetPassword.html?user="+encoded;
					msg = msg.replaceAll(Pattern.quote("$Ver_Link$"), verLink);
					
					he.setHtmlMsg(msg);
					String host = UtilService.getValue("hostName");
					String from = UtilService.getValue("sendFrom");
					String fromName = UtilService.getValue("sendFromName");
					String pass = UtilService.getValue("sendFromPwd");
					String smtpPort = UtilService.getValue("smtpPort");
					he.setHostName(host);
					he.addTo(user.getUser());
					he.setFrom(from, fromName);
					he.setSubject("Grovenue - Reset Password");
					he.setAuthenticator(new DefaultAuthenticator(from, pass));
					he.setTLS(true);
					//he.setSmtpPort(Integer.parseInt(smtpPort));
					he.setSSL(true);
					
					// send the he
					he.send();
					System.out.println("Email Sent");
				}
			catch (Exception e)
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
					throw new V2GenericException("Can not send Email", e);
				}
		}
		
}
