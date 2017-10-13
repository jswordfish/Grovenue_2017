package com.v2tech.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.domain.ResetPassword;
import com.v2tech.repository.ResetPasswordRepository;

@Service
public class ResetPasswordService {

	@Autowired
	ResetPasswordRepository resetPasswordRepository;
	
	public void saveOrUpdate(ResetPassword resetPassword ){
		ResetPassword resetPassword2 = resetPasswordRepository.getResetPassword(resetPassword.getUser());
			if(resetPassword2 == null){
				//create
				resetPassword2 = resetPassword;
				resetPassword2.setReset(false);
			}
			else {
				//update
				
			}
			resetPasswordRepository.save(resetPassword2);	
	}
	 
}
