package com.v2tech.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.Mentor;
@Repository
public interface MentorRepository extends GraphRepository<Mentor>{
	
	@Query("MATCH (mentor:Mentor) WHERE mentor.email = {0} RETURN mentor LIMIT 1;")
	public Mentor findMentorByEmail(String mentorEmail);
	
	@Query("MATCH (mentor:Mentor) WHERE mentor.categories =~ {0} RETURN mentor LIMIT 1;")
	public List<Mentor> findMentorsByCategory(String category);
	
	@Query("MATCH (mentor:Mentor) WHERE mentor.categories =~ {0} AND mentor.validated = {1} RETURN mentor LIMIT 1;")
	public List<Mentor> findValidatedMentorsByCategory(String category, Boolean validated);
	
	@Query("MATCH (mentor:Mentor) WHERE mentor.categories =~ {0} AND mentor.language =~ {1} RETURN mentor LIMIT 1;")
	public List<Mentor> findMentorsByCategory(String category, String language);
	
	@Query("MATCH (mentor:Mentor) WHERE mentor.categories =~ {0} AND mentor.language =~ {1} AND mentor.validated = {2} RETURN mentor LIMIT 1;")
	public List<Mentor> findValidatedMentorsByCategory(String category, String language, Boolean validated);
	
	@Query("MATCH (mentor:Mentor) WHERE mentor.validated = false RETURN mentor LIMIT 1;")
	public List<Mentor> findAllUnValidatedMentors();

}
