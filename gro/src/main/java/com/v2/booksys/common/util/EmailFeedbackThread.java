package com.v2.booksys.common.util;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;

import com.v2tech.base.V2GenericException;

public class EmailFeedbackThread implements Runnable{
	private String email;
	
	
	
	String emailText = "";
	
	String name = "";
	
	boolean addResourceFlag = false;
	
	public EmailFeedbackThread(String email, String name, String message){
		this.email = email;
		this.emailText = message;
		this.name = name;
	}
	
	

	@Override
	public void run() {
		// TODO Auto-generated method stub
		try {
			
			
			  Email email = new SimpleEmail();
			  String host = UtilService.getValue("hostName");
			  String from = UtilService.getValue("sendFrom");
			  String fromName = UtilService.getValue("sendFromName");
			  String pass = UtilService.getValue("sendFromPwd");
			  String smtpPort = UtilService.getValue("smtpPort");
			  email.setHostName(host);
			  //email.addTo("jatin.sutaria@thev2technologies.com");
			  email.addBcc("jatin.sutaria@thev2technologies.com");
			  	if(isAddResourceFlag()){
			  		email.addTo("grovenueaddaresource@gmail.com");
			  		email.setMsg(emailText+"\n\n"+"Send by: "+this.name+"\n"+"Sender: "+this.email);
			  		email.setSubject("Add Resource Request Sent by "+this.email);
			  	}
			  	else{
			  		email.addTo("hello@grovenue.com");
			  		email.setMsg(emailText+"\n\n"+"Send by: "+this.name+"\n"+"Sender: "+this.email);
			  		email.setSubject("Message Sent by "+this.email);
			  	}
			  
			  email.setFrom(from, fromName);
			 
			  
			 
			  email.setAuthenticator(new DefaultAuthenticator(from, pass)	);
				email.setTLS(true);
				//email.setSmtpPort(Integer.parseInt(smtpPort));
				email.setSSL(true);

			  // send the email
			  email.send();
			  System.out.println("Email Sent");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new V2GenericException("Can not send Email", e);
		}
	}



	public boolean isAddResourceFlag() {
		return addResourceFlag;
	}



	public void setAddResourceFlag(boolean addResourceFlag) {
		this.addResourceFlag = addResourceFlag;
	}
	
	

}
