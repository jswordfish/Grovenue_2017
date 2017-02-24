//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2016.07.05 at 01:21:09 PM IST 
//


package com.v2.booksys.onet.careers;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="link"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;attribute name="href" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
 *                 &lt;attribute name="rel" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *         &lt;element name="career" maxOccurs="unbounded"&gt;
 *           &lt;complexType&gt;
 *             &lt;complexContent&gt;
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                 &lt;sequence&gt;
 *                   &lt;element name="code" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                   &lt;element name="title" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *                   &lt;element name="tags"&gt;
 *                     &lt;complexType&gt;
 *                       &lt;complexContent&gt;
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *                           &lt;attribute name="bright_outlook" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
 *                           &lt;attribute name="green" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
 *                           &lt;attribute name="apprenticeship" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
 *                         &lt;/restriction&gt;
 *                       &lt;/complexContent&gt;
 *                     &lt;/complexType&gt;
 *                   &lt;/element&gt;
 *                 &lt;/sequence&gt;
 *                 &lt;attribute name="href" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
 *                 &lt;attribute name="fit" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
 *               &lt;/restriction&gt;
 *             &lt;/complexContent&gt;
 *           &lt;/complexType&gt;
 *         &lt;/element&gt;
 *       &lt;/sequence&gt;
 *       &lt;attribute name="answers" type="{http://www.w3.org/2001/XMLSchema}int" /&gt;
 *       &lt;attribute name="job_zone" type="{http://www.w3.org/2001/XMLSchema}int" /&gt;
 *       &lt;attribute name="start" type="{http://www.w3.org/2001/XMLSchema}int" /&gt;
 *       &lt;attribute name="end" type="{http://www.w3.org/2001/XMLSchema}int" /&gt;
 *       &lt;attribute name="total" type="{http://www.w3.org/2001/XMLSchema}int" /&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "link",
    "career"
})
@XmlRootElement(name = "careers")
public class Careers {

    @XmlElement(required = true)
    protected Careers.Link link;
    @XmlElement(required = true)
    protected List<Careers.Career> career;
    @XmlAttribute(name = "answers")
    protected Integer answers;
    @XmlAttribute(name = "job_zone")
    protected Integer jobZone;
    @XmlAttribute(name = "start")
    protected Integer start;
    @XmlAttribute(name = "end")
    protected Integer end;
    @XmlAttribute(name = "total")
    protected Integer total;

    /**
     * Gets the value of the link property.
     * 
     * @return
     *     possible object is
     *     {@link Careers.Link }
     *     
     */
    public Careers.Link getLink() {
        return link;
    }

    /**
     * Sets the value of the link property.
     * 
     * @param value
     *     allowed object is
     *     {@link Careers.Link }
     *     
     */
    public void setLink(Careers.Link value) {
        this.link = value;
    }

    /**
     * Gets the value of the career property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the career property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCareer().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Careers.Career }
     * 
     * 
     */
    public List<Careers.Career> getCareer() {
        if (career == null) {
            career = new ArrayList<Careers.Career>();
        }
        return this.career;
    }

    /**
     * Gets the value of the answers property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getAnswers() {
        return answers;
    }

    /**
     * Sets the value of the answers property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setAnswers(Integer value) {
        this.answers = value;
    }

    /**
     * Gets the value of the jobZone property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getJobZone() {
        return jobZone;
    }

    /**
     * Sets the value of the jobZone property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setJobZone(Integer value) {
        this.jobZone = value;
    }

    /**
     * Gets the value of the start property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getStart() {
        return start;
    }

    /**
     * Sets the value of the start property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setStart(Integer value) {
        this.start = value;
    }

    /**
     * Gets the value of the end property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getEnd() {
        return end;
    }

    /**
     * Sets the value of the end property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setEnd(Integer value) {
        this.end = value;
    }

    /**
     * Gets the value of the total property.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getTotal() {
        return total;
    }

    /**
     * Sets the value of the total property.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setTotal(Integer value) {
        this.total = value;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType&gt;
     *   &lt;complexContent&gt;
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
     *       &lt;sequence&gt;
     *         &lt;element name="code" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
     *         &lt;element name="title" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
     *         &lt;element name="tags"&gt;
     *           &lt;complexType&gt;
     *             &lt;complexContent&gt;
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
     *                 &lt;attribute name="bright_outlook" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
     *                 &lt;attribute name="green" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
     *                 &lt;attribute name="apprenticeship" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
     *               &lt;/restriction&gt;
     *             &lt;/complexContent&gt;
     *           &lt;/complexType&gt;
     *         &lt;/element&gt;
     *       &lt;/sequence&gt;
     *       &lt;attribute name="href" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
     *       &lt;attribute name="fit" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "code",
        "title",
        "tags"
    })
    public static class Career {

        @XmlElement(required = true)
        protected String code;
        @XmlElement(required = true)
        protected String title;
        @XmlElement(required = true)
        protected Careers.Career.Tags tags;
        @XmlAttribute(name = "href")
        protected String href;
        @XmlAttribute(name = "fit")
        protected String fit;

        /**
         * Gets the value of the code property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getCode() {
            return code;
        }

        /**
         * Sets the value of the code property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setCode(String value) {
            this.code = value;
        }

        /**
         * Gets the value of the title property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getTitle() {
            return title;
        }

        /**
         * Sets the value of the title property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setTitle(String value) {
            this.title = value;
        }

        /**
         * Gets the value of the tags property.
         * 
         * @return
         *     possible object is
         *     {@link Careers.Career.Tags }
         *     
         */
        public Careers.Career.Tags getTags() {
            return tags;
        }

        /**
         * Sets the value of the tags property.
         * 
         * @param value
         *     allowed object is
         *     {@link Careers.Career.Tags }
         *     
         */
        public void setTags(Careers.Career.Tags value) {
            this.tags = value;
        }

        /**
         * Gets the value of the href property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getHref() {
            return href;
        }

        /**
         * Sets the value of the href property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setHref(String value) {
            this.href = value;
        }

        /**
         * Gets the value of the fit property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getFit() {
            return fit;
        }

        /**
         * Sets the value of the fit property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setFit(String value) {
            this.fit = value;
        }


        /**
         * <p>Java class for anonymous complex type.
         * 
         * <p>The following schema fragment specifies the expected content contained within this class.
         * 
         * <pre>
         * &lt;complexType&gt;
         *   &lt;complexContent&gt;
         *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
         *       &lt;attribute name="bright_outlook" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
         *       &lt;attribute name="green" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
         *       &lt;attribute name="apprenticeship" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
         *     &lt;/restriction&gt;
         *   &lt;/complexContent&gt;
         * &lt;/complexType&gt;
         * </pre>
         * 
         * 
         */
        @XmlAccessorType(XmlAccessType.FIELD)
        @XmlType(name = "")
        public static class Tags {

            @XmlAttribute(name = "bright_outlook")
            protected String brightOutlook;
            @XmlAttribute(name = "green")
            protected String green;
            @XmlAttribute(name = "apprenticeship")
            protected String apprenticeship;

            /**
             * Gets the value of the brightOutlook property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getBrightOutlook() {
                return brightOutlook;
            }

            /**
             * Sets the value of the brightOutlook property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setBrightOutlook(String value) {
                this.brightOutlook = value;
            }

            /**
             * Gets the value of the green property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getGreen() {
                return green;
            }

            /**
             * Sets the value of the green property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setGreen(String value) {
                this.green = value;
            }

            /**
             * Gets the value of the apprenticeship property.
             * 
             * @return
             *     possible object is
             *     {@link String }
             *     
             */
            public String getApprenticeship() {
                return apprenticeship;
            }

            /**
             * Sets the value of the apprenticeship property.
             * 
             * @param value
             *     allowed object is
             *     {@link String }
             *     
             */
            public void setApprenticeship(String value) {
                this.apprenticeship = value;
            }

        }

    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType&gt;
     *   &lt;complexContent&gt;
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
     *       &lt;attribute name="href" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
     *       &lt;attribute name="rel" type="{http://www.w3.org/2001/XMLSchema}string" /&gt;
     *     &lt;/restriction&gt;
     *   &lt;/complexContent&gt;
     * &lt;/complexType&gt;
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "")
    public static class Link {

        @XmlAttribute(name = "href")
        protected String href;
        @XmlAttribute(name = "rel")
        protected String rel;

        /**
         * Gets the value of the href property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getHref() {
            return href;
        }

        /**
         * Sets the value of the href property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setHref(String value) {
            this.href = value;
        }

        /**
         * Gets the value of the rel property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getRel() {
            return rel;
        }

        /**
         * Sets the value of the rel property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setRel(String value) {
            this.rel = value;
        }

    }

}