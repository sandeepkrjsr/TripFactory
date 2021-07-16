package com.sandeepkrjsr.utility;

import java.util.Base64;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.sandeepkrjsr.model.HotelResponse;

public class Invoker {
	
	@Value("${tripfactory.username}")
	private String username;
	
	@Value("${tripfactory.password}")
	private String password;
	
	@Autowired
	private RestTemplate restTemplate;
	
	public ResponseEntity<HotelResponse> invoke(String url) {
		
		String plainCreds = username + ":" + password;
		byte[] plainCredsBytes = plainCreds.getBytes();
		byte[] base64CredsBytes = Base64.getEncoder().encode(plainCredsBytes);
		String base64Creds = new String(base64CredsBytes);

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		headers.add("Authorization", "Basic " + base64Creds);
		
		HttpEntity<String> request = new HttpEntity<String>(headers);
		ResponseEntity<HotelResponse> responseEntity = restTemplate.exchange(url, HttpMethod.GET, request, HotelResponse.class);
		
		return responseEntity;
	}

}
