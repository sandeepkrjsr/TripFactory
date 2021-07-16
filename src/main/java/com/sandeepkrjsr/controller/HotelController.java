package com.sandeepkrjsr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.sandeepkrjsr.model.HotelRequest;
import com.sandeepkrjsr.model.HotelResponse;
import com.sandeepkrjsr.utility.Invoker;

@RestController
public class HotelController {

	@Autowired
	private Environment env;
	
	@Autowired
	private Invoker invoker;

	@GetMapping("/")
	public void homePage() {}
	
	@GetMapping("/endpoint")
	public String endpoint() {
		return "This is the endpoint";
	}
	
	@PostMapping("/hotels")
	public ResponseEntity<HotelResponse> searchHotels(@RequestBody HotelRequest request) {
		String url = env.getProperty("tripfactory.baseurl") + "/availability?" + request.toString();
		ResponseEntity<HotelResponse> response = invoker.invoke(url);
		return response;
	}
	
	@RequestMapping("/helloworld")
	public ModelAndView hello() {
		String helloWorldMessage = "Hello world message";
		return new ModelAndView("hello", "message", helloWorldMessage);
	}
	
}
