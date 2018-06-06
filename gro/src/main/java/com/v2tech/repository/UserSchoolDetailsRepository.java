package com.v2tech.repository;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.UserSchoolDetails;
@Repository
public interface UserSchoolDetailsRepository extends GraphRepository<UserSchoolDetails>{

	@Query("MATCH (user:UserSchoolDetails) WHERE user.user =~ {0} AND user.socialMediaType={1} return user;")
	public UserSchoolDetails findUserByUserName(String userName, String socialMedia);
}
