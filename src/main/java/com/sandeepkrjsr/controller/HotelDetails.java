package com.sandeepkrjsr.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sandeepkrjsr.model.Response;

@RestController
public class HotelDetails {

	@GetMapping("/")
	public void homePage() {}
	
	@GetMapping("/endpoint")
	public String endpoint() {
		return "This is the endpoint";
	}
	
	@PostMapping("/hotels")
	public List<Response> getHotels() {
		List<Response> list = new ArrayList<>();
		Response response = new Response();
		response.setHotelName("Taj Hotel");
		response.setStartingPrice(1000);
		list.add(response);
		response.setHotelName("Hotel Oberoi");
		response.setStartingPrice(700);
		list.add(response);
		return list;
	}
	
}
