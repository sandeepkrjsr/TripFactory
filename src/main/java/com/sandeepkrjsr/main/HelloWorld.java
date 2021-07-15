package com.sandeepkrjsr.main;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {

	@GetMapping("/hello")
	public String hello() {
		return "Hello World";
	}
	
	@GetMapping("/endpoint")
	public String endpoint() {
		return "This is the endpoint";
	}
	
}
