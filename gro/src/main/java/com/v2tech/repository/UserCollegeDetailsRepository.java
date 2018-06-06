package com.v2tech.repository;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.UserCollegeDetails;
@Repository
public interface UserCollegeDetailsRepository extends GraphRepository<UserCollegeDetails>{

	@Query("MATCH (user:UserCollegeDetails) WHERE user.user =~ {0} AND user.socialMediaType={1} return user;")
	public UserCollegeDetails findUserByUserName(String userName, String socialMedia);
}
