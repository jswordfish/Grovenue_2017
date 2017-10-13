package com.v2tech.repository;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.ResetPassword;

@Repository
public interface ResetPasswordRepository extends GraphRepository<ResetPassword>{
	
	@Query("MATCH (rp:ResetPassword) WHERE rp.user = {0}  return rp limit 1;")
	public ResetPassword getResetPassword(String user);

}
