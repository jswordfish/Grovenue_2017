package com.v2tech.webservices;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.google.api.client.googleapis.auth.clientlogin.ClientLogin.Response;
import com.v2tech.base.V2GenericException;
import com.v2tech.domain.FreeConnCallBooking;
import com.v2tech.domain.Mentor;
import com.v2tech.domain.MentorRequest;
import com.v2tech.domain.MentorWorkExperience;
import com.v2tech.services.FreeConnCallBookingService;
import com.v2tech.services.MentorRequestService;
import com.v2tech.services.MentorService;

@Path("/mentorService")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class MentorWebService {
	@Autowired
	MentorService mentorService;
	
	@Autowired
	MentorRequestService mentorRequestService;
	
	@Autowired
	FreeConnCallBookingService bookingService;
	
	Logger logger = LoggerFactory.getLogger(MentorWebService.class);
	
	@GET
	@Path("/findRequestsForMentor/mentorEmail/{mentorEmail}/token/{token}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<MentorRequest> findRequestsForMentor(@PathParam("mentorEmail") String mentorEmail, @PathParam("token") String token){
		List<MentorRequest> mentorRequests = mentorRequestService.findMentorRequests(mentorEmail);
		return mentorRequests;
	}
	
	@POST
	@Path("/acceptMentorRequest/timeSlot/{timeSlot}/token/{token}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public javax.ws.rs.core.Response acceptMentorRequest( MentorRequest mentorRequest, @PathParam("timeSlot") String timeSlot, @PathParam("token") String token){
		try {
			mentorRequestService.confirmTimeSlotForMentorRequest(mentorRequest, timeSlot);
			/**
			 * Send emailer here to both mentee and mentor
			 */
		} catch (V2GenericException e) {
			if(e.getMessage().equalsIgnoreCase("NO_SLOT_AVAILABLE")) {
				return javax.ws.rs.core.Response.ok("NO_SLOT_AVAILABLE").build();
			}
		}
		
		return javax.ws.rs.core.Response.ok("OK").build();
	}
	
	@POST
	@Path("/removeBooking/token/{token}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public javax.ws.rs.core.Response removeBooking(FreeConnCallBooking booking, @PathParam("token") String token){
		if(booking.getId() == null) {
			throw new V2GenericException("NO_BOOKING_ID_AVAILABLE");
		}
		
		bookingService.deleteBooking(booking);
		/**
		 * Send emailer here to both mentee and mentor
		 */
		return javax.ws.rs.core.Response.ok().build();
	}
	
	@POST
	@Path("/getBookingListingForMentor/mentorEmail/{mentorEmail}/token/{token}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public javax.ws.rs.core.Response getBookingListingForMentor(@PathParam("mentorEmail") String mentorEmail, @PathParam("token") String token){
		List<FreeConnCallBooking> bookings = bookingService.getBookingForMentor(mentorEmail);
		return javax.ws.rs.core.Response.ok(bookings).build();
	}
	
	@POST
	@Path("/getBookingListingForUser/userEmail/{userEmail}/token/{token}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public javax.ws.rs.core.Response getBookingListingForUser(@PathParam("userEmail") String userEmail, @PathParam("token") String token){
		List<FreeConnCallBooking> bookings = bookingService.getBookingForUser(userEmail);
		return javax.ws.rs.core.Response.ok(bookings).build();
	}
	
	
}
