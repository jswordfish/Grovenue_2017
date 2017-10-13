package com.test;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import junit.framework.Assert;

import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.ContentDisposition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.conversion.Result;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.v2tech.domain.CoachingClass;
import com.v2tech.domain.SearchResponse;
import com.v2tech.repository.CoachingClassRepository;
import com.v2tech.services.CoachingClassService1;
import com.v2tech.webservices.CoachingClassWebService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:appContext.xml"})
@Transactional
public class TestCoachingClass {
	@Autowired
	Neo4jTemplate neo4jTemplate;
	
@Autowired	
CoachingClassService1 coachingClassService;

@Autowired
CoachingClassWebService coachingClassWebService;

@Autowired
CoachingClassRepository coachingClassRepository;


@Test
@Rollback(value=false)
public void testCoachingClassRetrievalForStateAndCity(){
	Set<CoachingClass> cs = coachingClassRepository.getCoachingClassesAsPerSelectedStateAndCity("(?i).*Mumbai.*", "(?i).*Nerul.*", 10);
	for(CoachingClass class1 : cs){
		System.out.println(class1.getState()+"-"+class1.getCity()+" - "+class1.getName());
	}
}


@Test
@Rollback(value=false)
public void testDuplicates(){
	Result<CoachingClass> classes = coachingClassRepository.findAll();
	Map<String,CoachingClass> map = new HashMap<>();
	Iterator<CoachingClass> itr = classes.iterator();
	List<CoachingClass> list = new ArrayList<>();
		while(itr.hasNext()){
			CoachingClass bk = itr.next();
			if(map.get(bk.getName()+"-"+bk.getBranch()+"-"+bk.getZip()) == null){
				map.put(bk.getName()+"-"+bk.getBranch()+"-"+bk.getZip(), bk);
			}
			else{
				list.add(bk);
			}
		}
	for(CoachingClass bk : list){
		System.out.println(bk.getName()+"-"+bk.getBranch()+"-"+bk.getZip());
		coachingClassRepository.delete(bk);
	}
}

	@Test
	public void testcoachingClass(){
		CoachingClass coachingClass = new CoachingClass();
		coachingClass.setAddress("test");
		coachingClass.setcStreams("Engineering");
		coachingClass.setLocation("Juhu");
		coachingClass.setName("Alps Academy");
		//coachingClassService.addCoachingClass(coachingClass);
	}
	
	@Test
	public void testSearchCoachingClassesByZip(){
		String value = "(?i).*91.*";
		Set<CoachingClass> classes = coachingClassRepository.findCoachingClassByZip(value, 150);
		System.out.println(classes.size());
			for(CoachingClass cls : classes){
				System.out.println(cls.getId());
				coachingClassRepository.delete(cls.getId());
			}
		
	}
	
	@Test
	public void testSearchCoachingClasses(){
		String value = "(?i).*Maths.*";
		SearchResponse response = coachingClassWebService.searchCoachingClass(value, "test");
		System.out.println(response.getClasses().size());
		
	}
	
	
	@Test
	public void testCoachingClassesUploadExcelLocally(){
		try {
			   ContentDisposition cd = new ContentDisposition("attachment;filename=Coaching Classes_Medical_Excel.xlsx");
			   List<Attachment> atts = new LinkedList<Attachment>();
			   FileInputStream fis = new FileInputStream("D:\\jatin\\shalini\\ExcelData\\Coaching Classes_Medical_Excel.xlsx");
			   Attachment att = new Attachment("root", fis, cd);
			   atts.add(att);
			   coachingClassWebService.uploadCoachingClassExcel(att, "test");
			   Assert.assertEquals(true, true);
			} catch(Exception e){
				e.printStackTrace();
				Assert.assertEquals(true, false);
				//logErrorStack(e);
			}	
	}
	
	@Test
	public void updateCCWithDesc(){
		Result<CoachingClass> classes = coachingClassRepository.findAll();
		Iterator<CoachingClass> itr = classes.iterator();
		
		while (itr.hasNext())
		{
			CoachingClass cc= itr.next();
			String testDesc = "Detailed Description for "+cc.getName()+" coming soon!";
				if(cc.getDescription() != null && cc.getDescription().trim().length() == 0){
					cc.setDescription(testDesc);
				}
				else if(cc.getDescription() == null){
					cc.setDescription(testDesc);
				}
			
			coachingClassRepository.save(cc);
		}
	}
	
	@Test
	public void testGetUniqueClassNames(){
//		Set<String> names = coachingClassRepository.searchCoachingClassUniqueNamesByGenericKeyword("JEE", 10);
//		for(String name : names){
//			System.out.println("*****************************88 "+name);
//		}
		String keyword = "(?i).*Medical.*";
		//String query = "MATCH (class:CoachingClass) WHERE  class.searchable ='yes' AND (class.keyword =~ '(?i).*JEE.*' OR class.name =~ '(?i).*JEE.*' OR class.typeOfProgram =~ '(?i).*JEE.*'  OR class.courses =~ '(?i).*JEE.*'  OR class.rExams =~ '(?i).*JEE.*'  OR class.cStreams =~ '(?i).*JEE.*' ) RETURN collect (distinct class.name) LIMIT 5;";
//		String query = "MATCH (class:CoachingClass) WHERE  class.searchable ='yes' AND (class.keyword =~ {key} OR class.name =~ {key} OR class.typeOfProgram =~ {key}  OR class.courses =~ {key}  OR class.rExams =~ '(?i).*JEE.*'  OR class.cStreams =~ {key} ) RETURN collect (distinct class.name);";
//		Map<String, Object> params = new HashMap<>();
//		params.put("key", keyword);
//		//params.put("size", "10");
//		Result<Map<String, Object>> result = neo4jTemplate.query(query, params);
//		Iterator<Map<String, Object>>  itr = result.iterator();
//			while(itr.hasNext()){
//				Map<String, Object> map = itr.next();
//				System.out.println(" collect (distinct class.name) is "+map.get("collect (distinct class.name)"));
//			}
		
		Set<CoachingClass> classes = coachingClassService.searchuniqueCoachingClassByGenericKeyword(keyword);
			for(CoachingClass class1 : classes){
				System.out.println(class1.getName());
			}
		
	}
}
