package com.v2tech.webservices;

import java.util.Iterator;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.v2.booksys.common.util.AmazonClient;
import com.v2tech.domain.Book;
import com.v2tech.repository.BookRepository;
import com.v2tech.services.BookService;

@Path("/tempService")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
public class TempJobWebService {
	@Autowired
	BookRepository bookRepository;
	
	@Autowired
	BookService  bookService;
	
	static org.slf4j.Logger logger = LoggerFactory.getLogger(TempJobWebService.class);
	
	@POST
	@Path("/addAuthorAndTitleToKeywords/book/token/{token}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addAuthorAndTitleToKeywords(@PathParam("token") String token)
		{
			try
				{
				 org.springframework.data.neo4j.conversion.Result<Book> results = bookRepository.findAll();
				 Iterator<Book> itr = results.iterator();
				 
					 while(itr.hasNext()){
					 Book book = itr.next();
					 bookService.saveOrUpdate(book);
					 }
				System.out.println("**************************** addAuthorAndTitleToKeywords *** complete");
				logger.info("**************************** addAuthorAndTitleToKeywords *** complete");
					return Response.ok().build();
				}
			catch (Exception e)
				{
					// TODO Auto-generated catch block
					e.printStackTrace();
					return Response.status(Status.SERVICE_UNAVAILABLE).build();
				}
		}

}
