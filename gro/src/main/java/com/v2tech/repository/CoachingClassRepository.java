package com.v2tech.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.stereotype.Repository;

import com.v2tech.domain.CoachingClass;

@Repository
public interface CoachingClassRepository extends GraphRepository<CoachingClass>
	{
		@Query("MATCH (class:CoachingClass) WHERE class.keyword =~ {0} AND class.city =~ {1} return class LIMIT {2};")
		public Set<CoachingClass> findCoachingClassByKeywordAndCity(String keyword, String city, Integer limit);
		
		@Query("MATCH (class:CoachingClass) WHERE class.city =~ {0} return class LIMIT {1};")
		public Set<CoachingClass> findCoachingClassByCity(String city, Integer limit);
		
		@Query("MATCH (class:CoachingClass) WHERE class.name =~ {0} AND class.location =~ {1} return class ")
		public Set<CoachingClass> findCoachingClassByNameAndLocation(String name, String location);
		
		@Query("MATCH (class:CoachingClass) WHERE class.name = {0} AND class.branch = {1} AND class.zip = {2}   return class;")
		public Set<CoachingClass> findByNameAndBranchAndZipCode(String name, String branch, String zip);
		
		@Query("MATCH (class:CoachingClass) WHERE class.name = {0} AND class.branch = {1} return class;")
		public Set<CoachingClass> findByNameAndBranch(String name, String branch);
		
		@Query("MATCH (class:CoachingClass) WHERE class.name =~ {0}  return class;")
		public Set<CoachingClass> searchAllCoachingClassesByName(String name);
		
		@Query("MATCH (class:CoachingClass) WHERE  class.searchable ='yes' AND (class.keyword =~ {0} OR class.name =~ {0} OR class.typeOfProgram =~ {0}  OR class.courses =~ {0}  OR class.rExams =~ {0}  OR class.cStreams =~ {0} ) RETURN class LIMIT {1};")
		public Set<CoachingClass> searchCoachingClassByGenericKeyword(String keyword, Integer limit);
		
		@Query("MATCH (class:CoachingClass) WHERE  class.searchable ='yes' AND (class.keyword =~ {0} OR class.name =~ {0} OR class.typeOfProgram =~ {0}  OR class.courses =~ {0}  OR class.rExams =~ {0}  OR class.cStreams =~ {0} ) RETURN class ORDER BY class.averageRating DESC LIMIT {1};")
		public Set<CoachingClass> searchTopRatedCoachingClassByGenericKeyword(String keyword, Integer limit);
		
		@Query("start coachingClass = node:geom({0}) MATCH (class:CoachingClass) WHERE  class.searchable ='yes' AND (class.keyword =~ {1} OR class.name =~ {1} OR class.typeOfProgram =~ {1}  OR class.courses =~ {1}  OR class.rExams =~ {1}  OR class.cStreams =~ {1} ) RETURN class ORDER BY class.averageRating DESC LIMIT {2};")
		public Set<CoachingClass> searchTopRatedCoachingClassByGenericKeywordAndLocation(String withinDistance, String keyword, Integer limit);
		
		@Query("MATCH (class:CoachingClass) WHERE class.zip =~ {0} return class LIMIT {1};")
		public Set<CoachingClass> findCoachingClassByZip(String city, Integer limit);
		
		@Override   
	    @Query("MATCH (class:CoachingClass) WHERE ID(class)={0} DELETE class")
	    public void delete(Long id);
		
		@Query("MATCH (class:CoachingClass) WHERE  class.searchable ='yes' AND (class.keyword =~ {0} OR class.name =~ {0} OR class.typeOfProgram =~ {0}  OR class.courses =~ {0}  OR class.rExams =~ {0}  OR class.cStreams =~ {0} ) RETURN collect (distinct class.name) LIMIT {1};")
		public Set<String> searchCoachingClassUniqueNamesByGenericKeyword(String keyword, Integer limit);
		
		@Query("MATCH (class:CoachingClass) WHERE class.name = {0}  return class limit 1;")
		public CoachingClass getSingleCoachingClassbyName(String name);
	}
