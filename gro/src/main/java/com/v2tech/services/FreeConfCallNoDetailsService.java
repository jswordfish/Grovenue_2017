package com.v2tech.services;

import java.util.ArrayList;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.pdf.hyphenation.TernaryTree.Iterator;
import com.v2tech.base.V2GenericException;
import com.v2tech.domain.FreeConfCallNoDetails;
import com.v2tech.repository.FreeConfCallNoDetailsRepository;

@Service
public class FreeConfCallNoDetailsService {
	
	@Autowired
	FreeConfCallNoDetailsRepository freeConfCallNoDetailsRepository;
	
	public void saveOrUpdate(FreeConfCallNoDetails freeConfCallNoDetails ) {
		if(freeConfCallNoDetails.getName() == null || freeConfCallNoDetails.getName().trim().length() == 0) {
			throw new V2GenericException("No name present");
		}
		
		FreeConfCallNoDetails freeConfCallNoDetails2 = freeConfCallNoDetailsRepository.findFreeConfCallNoDetailsByName(freeConfCallNoDetails.getName());
		if(freeConfCallNoDetails2 == null) {
			//create
			freeConfCallNoDetailsRepository.save(freeConfCallNoDetails);
		}
		else {
			freeConfCallNoDetails.setId(freeConfCallNoDetails2.getId());
			Mapper mapper = new DozerBeanMapper();
			mapper.map(freeConfCallNoDetails, freeConfCallNoDetails2);
			freeConfCallNoDetailsRepository.save(freeConfCallNoDetails2);
		}
	}
	
	public FreeConfCallNoDetails findFreeConfCallNoDetailsByName(String name) {
		return freeConfCallNoDetailsRepository.findFreeConfCallNoDetailsByName(name);
	}
	
	public List<FreeConfCallNoDetails> getFreeConfCallNoDetailsAll(){
		java.util.Iterator<FreeConfCallNoDetails> itr = freeConfCallNoDetailsRepository.findAll().iterator();
		List<FreeConfCallNoDetails> list = new ArrayList<>();
		while(itr.hasNext()) {
			list.add(itr.next());
		}
		
		return list;
	}
}
