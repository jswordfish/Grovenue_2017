package com.v2tech.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.MentorRequest;

@Repository
public interface MentorRequestRepository extends GraphRepository<MentorRequest>{
	
	//public List<MentorRequest> getAllMentors();

	@Query("MATCH (req:MentorRequest) WHERE req.mentorEmail = {0} RETURN req;")
	public List<MentorRequest> findMentorRequests(String mentorEmail);
	
	@Query("MATCH (req:MentorRequest) WHERE req.mentorEmail = {0} AND req.userEmail = {1} and req.mentorRequestCreateTime = {2} RETURN req LIMIT 1;")
	public MentorRequest findUniqueMentorRequest(String mentorEmail, String userEmail, Long mentorRequestCreateTime);
}
