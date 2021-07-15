package com.sandeepkrjsr.model;

import java.util.Date;

import lombok.Data;

public @Data class Request {
	
	private String cityName;
	private Date checkInDate;
	private Date checkOutDate;
	private Integer numberOfRooms;
	private Integer numberOfPersons;

}
