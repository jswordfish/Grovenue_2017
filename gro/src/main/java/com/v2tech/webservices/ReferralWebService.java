package com.v2tech.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.v2tech.domain.User;
import com.v2tech.services.ReferralMappingService;

@Path("/referralService")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class ReferralWebService {
	
	@Autowired
	ReferralMappingService  referralService;
	
	@POST
	@Path("/referralCode/token/{token}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response generateReferralCode(User user, @PathParam("token") String token){
		/**
		 * generate referal code
		 */
		try {
			String referralCode = referralService.generateReferralForUser(user.getFirstName() == null ?user.getUser():user.getFirstName(), user.getUser());
			ReferralResponse response = new ReferralResponse();
			response.setReferralCode(referralCode);
			return Response.ok(response).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).build();
		}
		
	}
	
	@POST
	@Path("/redeemReferralCode/referralCode/{referralCode}/friendUserName/{friendUserName}/token/{token}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response redeemReferralCode(@PathParam("referralCode") String referralCode, @PathParam("friendUserName")  String friendUserName, @PathParam("token") String token){
		/**
		 * generate referal code
		 */
		try {
			boolean result = referralService.redeemReferalCode(referralCode, friendUserName);
			ReferralResponse response = new ReferralResponse();
			response.setRedeemResult(result);
			return Response.ok(response).build();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).build();
		}
		
	}
	
	

}

class ReferralResponse{
	String referralCode;
	
	Boolean redeemResult;

	public String getReferralCode() {
		return referralCode;
	}

	public void setReferralCode(String referralCode) {
		this.referralCode = referralCode;
	}

	public Boolean getRedeemResult() {
		return redeemResult;
	}

	public void setRedeemResult(Boolean redeemResult) {
		this.redeemResult = redeemResult;
	}
	
	
}
