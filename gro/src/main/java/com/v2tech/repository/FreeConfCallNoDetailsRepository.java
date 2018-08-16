package com.v2tech.repository;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.FreeConfCallNoDetails;

@Repository
public interface FreeConfCallNoDetailsRepository extends GraphRepository<FreeConfCallNoDetails>{

	@Query("MATCH (fc:FreeConfCallNoDetails) WHERE fc.name = {0} return fc LIMIT 1;")
	public FreeConfCallNoDetails findFreeConfCallNoDetailsByName(String name);
}
