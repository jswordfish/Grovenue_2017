package com.v2tech.repository;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.ReferalMappingUsageSummary;
@Repository
public interface ReferalMappingUsageSummaryRepository extends GraphRepository<ReferalMappingUsageSummary>{

	
	
	@Query("MATCH (ref:ReferalMappingUsageSummary) WHERE ref.referralCode =~ {0} AND ref.usedByUser=~ {1} return ref;")
	public ReferalMappingUsageSummary findReferalMappingUsageSummaryByReferralCodeAndUsedByUser(String referralCode, String usedByUser);
}
