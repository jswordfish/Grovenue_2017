//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2016.07.05 at 01:21:09 PM IST 
//


package com.v2.booksys.onet.careers;

import javax.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the org.career package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: org.career
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link Careers }
     * 
     */
    public Careers createCareers() {
        return new Careers();
    }

    /**
     * Create an instance of {@link Careers.Career }
     * 
     */
    public Careers.Career createCareersCareer() {
        return new Careers.Career();
    }

    /**
     * Create an instance of {@link Careers.Link }
     * 
     */
    public Careers.Link createCareersLink() {
        return new Careers.Link();
    }

    /**
     * Create an instance of {@link Careers.Career.Tags }
     * 
     */
    public Careers.Career.Tags createCareersCareerTags() {
        return new Careers.Career.Tags();
    }

}