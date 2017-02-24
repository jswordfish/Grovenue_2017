package com.ocr;

import java.io.File;

import org.junit.Test;

import com.asprise.ocr.Ocr;
public class TestOcr {
	
	@Test
	public void testBasic(){
		Ocr.setUp(); // one time setup
		Ocr ocr = new Ocr(); // create a new OCR engine
		ocr.startEngine("eng", Ocr.SPEED_SLOW); // English
		//ocr.
		String s = ocr.recognize(new File[] {new File("D:\\jatin\\delete\\text-widget-code-example-of-text.png")}, Ocr.RECOGNIZE_TYPE_ALL, Ocr.OUTPUT_FORMAT_PLAINTEXT);
		System.out.println("Result: " + s);
		// ocr more images here ...
		ocr.stopEngine();
	}
	
	
	@Test
	public void testUI(){
		String s[] = {};
		Ocr.main(s);
	}

}
