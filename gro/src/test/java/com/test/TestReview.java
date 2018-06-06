package com.test;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.v2tech.domain.Book;
import com.v2tech.domain.RESOURCE_TYPE;
import com.v2tech.domain.Review;
import com.v2tech.repository.ReviewRepository;
import com.v2tech.services.BookService;
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
		
		@Autowired
		BookService bookService;
			
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
		public void testCreateAkashReviews() throws IOException {
			List<String> lines = FileUtils.readLines(new File("final.txt"));
			for(String line : lines) {
				String[] values = line.split("\\s*,\\s*");
				String bookName = values[0];
				String subjects = values[1];
				String isbn = "";
				isbn = values[2];
					if(isbn == null || isbn.trim().length() == 0) {
						isbn = values[3];
					}
				isbn = "ISBN-"+isbn ;
				String authors = values[5];
				String publisher = values[6];
				String understandingFundamentals = values[7];
				String gettingHelpFromFriends = values[8];
				String styleAndLanguage = values[9];
				String diffLearningStyle = values[10];
				String practicePer = values[11];
				String bookUseOfSolvedExample = values[12];
				String practiceProblems = values[13];
				String picture1000 = values[14];
				String realLifeExample = values[15];
				String summarizeAll = values[16];
				String invisibleManual = values[17];
				String remember = values[18];
				String user = values[20];
				Review review = new Review();
				review.setResourceIdentity(isbn);
				review.setResourceReviewedType("BOOK");
				review.setVisualTools((int)Double.parseDouble(picture1000));
				review.setSolvedExamples((int)Double.parseDouble(bookUseOfSolvedExample));
				review.setSolutionToPracticeProblems((int)Double.parseDouble(practiceProblems));
				review.setEffectivenessAndEaseOfCommunication((int)Double.parseDouble(realLifeExample));
				List<String> sub = new ArrayList<String>();
				sub.add(subjects);
				review.setReviewiedSubjects(sub);
				review.setReviewedBy(user);
				reviewService.saveOrUpdate(review);
			}
		}
		
		@Test
		public void testRev() throws IOException {
			List<String> lines = FileUtils.readLines(new File("akashFinalViv.txt"));
			List<String> newLines = new ArrayList<>();
				for(String line : lines) {
					String[] values = line.split("\\s*,\\s*");
					String isbn = "";
					isbn = values[2];
						if(isbn == null || isbn.trim().length() == 0) {
							isbn = values[3];
						}
					isbn = "ISBN-"+isbn;
					Book book = bookService.getSingleBook(isbn);
					if(book != null) {
						newLines.add(line);
					}
					
				}
			FileUtils.writeLines(new File("final.txt"), newLines);
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
