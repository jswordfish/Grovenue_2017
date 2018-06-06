package com.v2tech.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.ReferralMapping;
import com.v2tech.domain.UserReferralPointsMapping;

@Repository
public interface UserReferralPointsMappingRepository extends GraphRepository<UserReferralPointsMapping>{

	@Query("MATCH (ref:UserReferralPointsMapping) WHERE ref.userName =~ {0} return ref;")
	public List<UserReferralPointsMapping> findUserReferralPointsMappingByUser(String userName);
	
	@Query("MATCH (ref:UserReferralPointsMapping) WHERE ref.userName =~ {0} return ref;")
	public UserReferralPointsMapping findUniqueUserReferralPointsMappingByUser(String userName);
}
