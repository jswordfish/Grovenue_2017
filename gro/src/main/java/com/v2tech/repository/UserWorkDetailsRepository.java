package com.v2tech.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.UserWorkDetails;
@Repository
public interface UserWorkDetailsRepository extends GraphRepository<UserWorkDetails>{

	@Query("MATCH (user:UserWorkDetails) WHERE user.user =~ {0} AND user.socialMediaType={1} AND user.company={2} return user;")
	public UserWorkDetails findUserByUserName(String userName, String socialMedia, String company);
	
	@Query("MATCH (user:UserWorkDetails) WHERE user.user =~ {0} AND user.socialMediaType={1} return user;")
	public List<UserWorkDetails> findWorkDetails(String userName, String socialMedia);
}

