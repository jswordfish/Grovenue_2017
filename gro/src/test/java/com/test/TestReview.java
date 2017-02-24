package com.test;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.conversion.Result;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.v2tech.domain.DigitalTool;
import com.v2tech.domain.RESOURCE_TYPE;
import com.v2tech.domain.Review;
import com.v2tech.repository.ReviewRepository;
import com.v2tech.services.ReviewService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:appContext.xml" })
@Transactional
public class TestReview
	{
		@Autowired
		ReviewService reviewService;
		
		@Autowired
		ReviewRepository reviewRepository;
			
		@Test
		public void test1()
			{
				String resourceReviewedType = RESOURCE_TYPE.BOOK.getType();
				String resourceIdentity = "ISBN-9350949563";
				Integer limit = 10;
				List<Review> reviews = reviewService.getReviewByResourceReviewedTypeAndResourceIdentity(resourceReviewedType, resourceIdentity, limit);
				if (reviews.size() > 0)	
					{
						System.out.println("Got");
					}
			}
		
		@Test
		public void test2()
			{
				
					Iterator<Review> itr = reviewRepository.findAll().iterator();
						while(itr.hasNext()){
							Review review = itr.next();
							reviewRepository.delete(review.getId());
						}
				//reviewService.deleteAll();
			}
		
		@Test
		public void updateReviewsWithName(){
			Set<Review> reviews = reviewRepository.fetchAllReviewsByEmail("shalini@grovenue.com", 0, 50);
			for(Review review : reviews){
				review.setReviewedByName("Test User");
				reviewRepository.save(review);
			}
		}
	}
