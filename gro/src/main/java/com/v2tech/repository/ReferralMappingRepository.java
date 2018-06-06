package com.v2tech.repository;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.ReferralMapping;

@Repository
public interface ReferralMappingRepository extends GraphRepository<ReferralMapping>{

	
	@Query("MATCH (ref:ReferralMapping) WHERE ref.referralCode =~ {0} return ref;")
	public List<ReferralMapping> findReferralMappingByReferralCode(String referralCode);
	
	@Query("MATCH (ref:ReferralMapping) WHERE ref.referralCode =~ {0} return ref;")
	public ReferralMapping findUniqueReferralMappingByReferralCode(String referralCode);
	
//	@Query("MATCH (ref:ReferralMapping) WHERE ref.referralCode =~ {0} AND ref.usedByUser=~ {1} return ref;")
//	public ReferralMapping findUniqueReferralMappingByReferralCodeAndUsedByUser(String referralCode, String usedByUser);
}
