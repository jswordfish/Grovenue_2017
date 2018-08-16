package com.v2tech.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v2tech.domain.FreeConfCallNoDetails;
import com.v2tech.domain.FreeConnCallBooking;
import com.v2tech.domain.MentorRequest;
import com.v2tech.repository.FreeConnCallBookingRepository;

@Service
public class FreeConnCallBookingService {

	@Autowired
	FreeConnCallBookingRepository bookingRepository;
	
	@Autowired
	FreeConfCallNoDetailsService freeConfCallNoDetailsService;
	
	public List<FreeConnCallBooking> getBookingForMentor(String mentorEmail){
		return bookingRepository.getFreeConfCallFreeConnCallBookingsForMentor(mentorEmail);
	}
	
	public List<FreeConnCallBooking> getBookingForUser(String userEmail){
		return bookingRepository.getFreeConfCallFreeConnCallBookingsForUser(userEmail);
	}
	
	public FreeConfCallNoDetails bookTimeSlot(MentorRequest mentorRequest) {
		List<FreeConfCallNoDetails> list = freeConfCallNoDetailsService.getFreeConfCallNoDetailsAll();
			for(FreeConfCallNoDetails detail : list) {
				if(mentorRequest.getTimeSlot1Accepted()) {
					book(detail.getName(), mentorRequest.getId(), mentorRequest.getUserEmail(), mentorRequest.getMentorEmail(), mentorRequest.getTimeSlot1Start(), mentorRequest.getTimeSlot1End());
					return detail;
				}
				else if(mentorRequest.getTimeSlot2Accepted()) {
					book(detail.getName(), mentorRequest.getId(), mentorRequest.getUserEmail(), mentorRequest.getMentorEmail(), mentorRequest.getTimeSlot2Start(), mentorRequest.getTimeSlot2End());
					return detail;
				}
				else {
					book(detail.getName(), mentorRequest.getId(), mentorRequest.getUserEmail(), mentorRequest.getMentorEmail(), mentorRequest.getTimeSlot3Start(), mentorRequest.getTimeSlot3End());
					return detail;
				}
			}
		
		return null;
	}
	
	private void book(String confCallName, Long mentorRequestId, String userEmail, String mentorEmail, Long timeStart, Long timeEnd) {
		Long st1 = timeStart - (30 * 60 * 1000);//check if there is a booking 30 minutes before start time
		Long st2 = timeStart + (30 * 60 * 1000);//check if there is a booking 
		List<FreeConnCallBooking> bookings = bookingRepository.getFreeConfCallFreeConnCallBookingsForMentor(confCallName, st1);
		boolean used = false;
		
			for(FreeConnCallBooking booking : bookings) {
				if(booking.getBookedFrom() >= st1) {
					if(booking.getBookedFrom() < st2) {
						used = true;
					}
				}
				
				if(! used) {
					
					break;
				}
			}
		if(!used) {
			FreeConnCallBooking book = new FreeConnCallBooking(confCallName, timeStart, timeEnd, mentorEmail, userEmail, mentorRequestId);
			bookingRepository.save(book);
		}
		
		
	}
	
	public void deleteBooking(FreeConnCallBooking booking) {
		bookingRepository.delete(booking.getId());
	}
}
