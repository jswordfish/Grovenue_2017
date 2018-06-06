package com.v2.booksys.common.util;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.SimpleEmail;

import com.v2tech.base.V2GenericException;

public class EmailGenericMessageThread  implements Runnable{
	private String emailSentTo;
	
	
	private String subject;
	
	private String message;
	
	public EmailGenericMessageThread(String emailSentTo, String subject, String message){
		this.emailSentTo = emailSentTo;
		this.subject = subject;
		this.message = message;
	}
	
	

	@Override
	public void run() {
		// TODO Auto-generated method stub
		try {
			
			
			HtmlEmail email = new HtmlEmail();
			  String host = UtilService.getValue("hostName");
			  String from = UtilService.getValue("sendFrom");
			  String fromName = UtilService.getValue("sendFromName");
			  String pass = UtilService.getValue("sendFromPwd");
			  String smtpPort = UtilService.getValue("smtpPort");
			  email.setHostName(host);
			  email.setSmtpPort(Integer.parseInt(smtpPort));
			  //email.addTo("jatin.sutaria@thev2technologies.com");
			  email.addBcc("jatin.sutaria@thev2technologies.com", "kunal@grovenue.com");
		  		email.addTo(emailSentTo);
		  		email.setHtmlMsg(message);
		  		email.setSubject(subject);
			  	email.setCharset("UTF-8");
			  
			  email.setFrom(from, fromName);
			 
			  
			 
			  email.setAuthenticator(new DefaultAuthenticator(from, pass)	);
				email.setTLS(true);
				//email.setSmtpPort(Integer.parseInt(smtpPort));
				email.setSSL(true);

			  // send the email
			 // email.send();
				email.buildMimeMessage();
				email.sendMimeMessage();
			  System.out.println("Email Sent");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new V2GenericException("Can not send Email", e);
		}
	}




	
	

}
