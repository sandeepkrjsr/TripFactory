package com.sandeepkrjsr.controller;

import java.util.Base64;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class HotelDetails {
	
	private static String BASE_URL = "http://rest.reserve-online.net/property";
	
	@Value("${tripfactory_username}")
	private String username;
	
	@Value("${tripfactory_password}")
	private String password;
	
	@Autowired
	private RestTemplate restTemplate;

	@GetMapping("/")
	public void homePage() {}
	
	@GetMapping("/endpoint")
	public String endpoint() {
		return "This is the endpoint";
	}
	
	@GetMapping("/baseurl")
	public ResponseEntity<String> baseurl() {
		
		//String plainCreds = "tripfactory23623:920A445CBBD0F1506960B55C2C3861B3EF8CEA80";
		String plainCreds = username + ":" + password;
		byte[] plainCredsBytes = plainCreds.getBytes();
		byte[] base64CredsBytes = Base64.getEncoder().encode(plainCredsBytes);
		String base64Creds = new String(base64CredsBytes);

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		headers.add("Authorization", "Basic " + base64Creds);
		
		HttpEntity<String> request = new HttpEntity<String>(headers);
		ResponseEntity<String> responseEntity = restTemplate.exchange(BASE_URL, HttpMethod.GET, request, String.class);
		
		return responseEntity;
	}
	
}
