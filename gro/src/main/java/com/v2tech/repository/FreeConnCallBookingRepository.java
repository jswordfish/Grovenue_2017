package com.v2tech.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.FreeConnCallBooking;

@Repository
public interface FreeConnCallBookingRepository extends GraphRepository<FreeConnCallBooking>{

	@Query("MATCH (fc:FreeConnCallBooking) WHERE fc.userEmail = {0} return fc")
	public List<FreeConnCallBooking> getFreeConfCallFreeConnCallBookingsForUser(String userEmail);
	
	@Query("MATCH (fc:FreeConnCallBooking) WHERE fc.mentorEmail = {0} return fc")
	public List<FreeConnCallBooking> getFreeConfCallFreeConnCallBookingsForMentor(String mentorEmail);
	
	@Query("MATCH (fc:FreeConnCallBooking) WHERE  fc.freeConfCallName = {0} and toInt(fc.bookedFrom) > {1}  return fc limit 5")
	public List<FreeConnCallBooking> getFreeConfCallFreeConnCallBookingsForMentor(String freeConfCallName, Long bookedFrom);
	
	
}
