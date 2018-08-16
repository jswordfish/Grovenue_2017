package com.v2tech.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.MentorWorkExperience;
@Repository
public interface MentorWorkExperienceRepository extends GraphRepository<MentorWorkExperience>{

	@Query("MATCH (mentor:MentorWorkExperience) WHERE mentor.userEmail = {0} RETURN mentor;")
	public List<MentorWorkExperience> findMentorWorkExperienceByEmail(String mentorEmail);
	
	@Query("MATCH (mentor:MentorWorkExperience) WHERE mentor.userEmail = {0}  AND mentor.company = {1} AND mentor.designation = {2}  RETURN mentor LIMIT 1;")
	public MentorWorkExperience findMentorWorkExperienceByEmailAndCompanyAndDesignation(String mentorEmail, String company, String designation);
	
	
	
}
