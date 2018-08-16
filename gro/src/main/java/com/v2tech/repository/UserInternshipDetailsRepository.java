package com.v2tech.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.UserInternshipDetails;
@Repository
public interface UserInternshipDetailsRepository extends GraphRepository<UserInternshipDetails>{

	@Query("MATCH (user:UserInternshipDetails) WHERE user.user =~ {0} AND user.socialMediaType={1} AND user.company={2} return user;")
	public UserInternshipDetails findUserByUserName(String userName, String socialMedia, String company);
	
	@Query("MATCH (user:UserInternshipDetails) WHERE user.user =~ {0} AND user.socialMediaType={1}  return user;")
	public List<UserInternshipDetails> findInternshipDetails(String userName, String socialMedia);
}
