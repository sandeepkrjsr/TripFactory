package com.sandeepkrjsr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.sandeepkrjsr.model.HotelRequest;
import com.sandeepkrjsr.utility.APIServiceInvoker;

@RestController
public class HotelController {

	@Autowired
	private Environment env;
	
	@Autowired
	private APIServiceInvoker invoker;

	/**
	 * This method will redirect to index.jsp.
	 * Webapp starts from here.
	 * @return {@link index.jsp}
	 */
	@GetMapping("/")
	public ModelAndView homePage() {
		return new ModelAndView("index");
	}
	
	
	/**
	 * This endpoint is for testing purpose only.
	 * To check apis are working or not
	 * @return String
	 */
	@GetMapping("/endpoint")
	public String endpoint() {
		return "This is the endpoint";
	}
	
	/**
	 * This method will return all the available hotels based on criteria.
	 * @param {@link HotelRequest}
	 * @return {@link HotelResponse}
	 */
	@PostMapping("/hotels")
	public ResponseEntity<String> searchHotels(@RequestBody HotelRequest request) {
		String url = env.getProperty("tripfactory.baseurl") + "/availability?" + request.toString();
		ResponseEntity<String> response = invoker.invoke(url);
		return response;
	}
	
	/**
	 * This method will return details for a particular hotel.
	 * @param {@link HotelRequest}
	 * @return {@link HotelResponse}
	 */
	@PostMapping("/hotel/{hotelCode}")
	public ResponseEntity<String> getHotel(@PathVariable String hotelCode, @RequestBody HotelRequest request) {
		String url = env.getProperty("tripfactory.baseurl") + "/availability/" + hotelCode + "?" + request.toString();
		ResponseEntity<String> response = invoker.invoke(url);
		return response;
	}
	
}
