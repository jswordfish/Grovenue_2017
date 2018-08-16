package com.v2tech.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2.booksys.common.util.EmailGenericMessageThread;
import com.v2tech.base.V2GenericException;
import com.v2tech.domain.MentorRequest;
import com.v2tech.repository.MentorRequestRepository;

@Service
public class MentorRequestService {

	@Autowired
	MentorRequestRepository mentorRequestRepository;
	
	@Autowired
	FreeConnCallBookingService bookingService;
	
	String text = "Hi $MENTEE$,\r\n<br></br>" + 
			"\r\n" + 
			" \r\n<br></br>" + 
			"\r\n<br></br>" + 
			"Thank you for joining us – we are very excited to welcome to the Grovenue community. Your session request has been successfully received!\r\n" + 
			"\r\n<br></br>" + 
			" \r\n<br></br>" + 
			"\r\n<br></br>" + 
			"You will get a call or email from us soon to coordinate the session with your requested mentor.\r\n" + 
			"\r\n<br></br>" + 
			" \r\n<br></br>" + 
			"\r\n<br></br>" + 
			"Meanwhile, feel free to say hello or share your concerns, questions, or suggestions at Shalini@grovenue.com. Hearing from you is truly the highlight of our day. \r\n" + 
			"\r\n<br></br>" + 
			" \r\n<br></br>" + 
			"\r\n<br></br>" + 
			"Till next time, we leave you with this thought: “The best teachers are those who tell you where to look but do not tell you what to see.\"\r\n" + 
			"\r\n<br></br>" + 
			" \r\n<br></br>" + 
			"\r\n<br></br>" + 
			"Warm Regards,\r\n" + 
			"\r\n<br></br>" + 
			"Team Grovenue";
	
	String text2 = "Hi $MENTOR$,\r\n<br></br>" + 
			"\r\n" + 
			" \r\n<br></br>" + 
			"\r\n<br></br>" + 
			"Good news! You have received a mentor request form $MENTEE$.\r\n<br></br>" + 
			"\r\n<br></br>" + 
			" \r\n<br></br>" + 
			"As always, we cannot thank you enough for choosing to be a mentor and helping our mentees learn and grow.\r\n<br></br>" + 
			"We will follow-up with an email to coordinate the session and facilitate the process. Please let us know if you prefer a call and a good number to reach you at.\r\n<br></br>" + 
			"\r\n<br></br>" + 
			" \r\n<br></br>" + 
			"Meanwhile, feel free to say hello or share your concerns, questions, or suggestions at Shalini@grovenue.com. Your feedback is the secret ingredient that will help us better our product.  \r\n<br></br>" + 
			"Till next time, we leave you with this thought: \"When a student is ready, a teacher will appear\" - Buddha\r\n<br></br>" + 
			"\r\n<br></br>" + 
			" \r\n<br></br>" + 
			"\r\n<br></br>" + 
			"Warm Regards,\r\n<br></br>" + 
			"\r\n<br></br>" + 
			"Team Grovenue";
	
	public void saveOrUpdate(MentorRequest mentorRequest) {
		if(mentorRequest.getMentorEmail() == null || mentorRequest.getMentorEmail().trim().length() == 0) {
			throw new V2GenericException("No Mentor Email");
		}
		
		if(mentorRequest.getUserEmail() == null || mentorRequest.getUserEmail().trim().length() == 0) {
			throw new V2GenericException("No Mentee Email");
		}
		
		mentorRequest.setMentorRequestCreateTime(System.currentTimeMillis());
		mentorRequestRepository.save(mentorRequest);
		String data = text;
		data = data.replace("$MENTEE$", mentorRequest.getFirstName());
		
		EmailGenericMessageThread menteeEmail = new EmailGenericMessageThread(mentorRequest.getUserEmail(), "Mentor Discussion scheduled with "+mentorRequest.getMentorFirstName(), data);
		Thread th = new Thread(menteeEmail);
		th.start();
		
		String data2 = text2;
		data2 = data2.replace("$MENTOR$", mentorRequest.getMentorFirstName());
		data2 = data2.replace("$MENTEE$", mentorRequest.getFirstName());
		EmailGenericMessageThread mentorEmail = new EmailGenericMessageThread(mentorRequest.getMentorEmail(), "Mentor Discussion scheduled with "+mentorRequest.getFirstName(), data2);
		Thread th2 = new Thread(mentorEmail);
		th2.start();
	}
	
	public List<MentorRequest> findMentorRequests(String mentorEmail){
		return mentorRequestRepository.findMentorRequests(mentorEmail);
	}
	
	public void confirmTimeSlotForMentorRequest(MentorRequest mentorRequest, String timeSlot) {
		if(mentorRequest.getMentorEmail() == null || mentorRequest.getMentorEmail().trim().length() == 0) {
			throw new V2GenericException("No Mentor Email");
		}
		
		if(mentorRequest.getUserEmail() == null || mentorRequest.getUserEmail().trim().length() == 0) {
			throw new V2GenericException("No Mentee Email");
		}
		
		MentorRequest mentorRequest2 = mentorRequestRepository.findUniqueMentorRequest(mentorRequest.getMentorEmail(), mentorRequest.getUserEmail(), mentorRequest.getMentorRequestCreateTime());
		if(mentorRequest2 == null) {
			throw new V2GenericException("INVALID MENTOR REQUEST");
		}
		
		if(timeSlot.equalsIgnoreCase("TimeSlot1")) {
			mentorRequest2.setTimeSlot1Accepted(true);
			mentorRequest2.setTimeSlot2Accepted(false);
			mentorRequest2.setTimeSlot3Accepted(false);
		}
		else if(timeSlot.equalsIgnoreCase("TimeSlot2")) {
			mentorRequest2.setTimeSlot1Accepted(false);
			mentorRequest2.setTimeSlot2Accepted(true);
			mentorRequest2.setTimeSlot3Accepted(false);
		}
		else if(timeSlot.equalsIgnoreCase("TimeSlot3")) {
			mentorRequest2.setTimeSlot1Accepted(false);
			mentorRequest2.setTimeSlot2Accepted(false);
			mentorRequest2.setTimeSlot3Accepted(true);
		}
			
			if(bookingService.bookTimeSlot(mentorRequest2) == null) {
				throw new V2GenericException("NO_SLOT_AVAILABLE");
			}
			else {
				mentorRequestRepository.save(mentorRequest2);
			}
		
		
	}
	
	public void deleteMentorRequest(MentorRequest mentorRequest) {
		if(mentorRequest.getMentorEmail() == null || mentorRequest.getMentorEmail().trim().length() == 0) {
			throw new V2GenericException("No Mentor Email");
		}
		
		if(mentorRequest.getUserEmail() == null || mentorRequest.getUserEmail().trim().length() == 0) {
			throw new V2GenericException("No Mentee Email");
		}
		
		MentorRequest mentorRequest2 = mentorRequestRepository.findUniqueMentorRequest(mentorRequest.getMentorEmail(), mentorRequest.getUserEmail(), mentorRequest.getMentorRequestCreateTime());
		if(mentorRequest2 == null) {
			throw new V2GenericException("INVALID MENTOR REQUEST");
		}
		
		mentorRequestRepository.delete(mentorRequest2);
		
	}
}
