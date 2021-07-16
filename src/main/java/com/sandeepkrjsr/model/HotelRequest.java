package com.sandeepkrjsr.model;

import org.springframework.util.StringUtils;

import lombok.Data;

public @Data class HotelRequest {
	
	private String location;
	private String checkin;
	private String checkout;
	private Integer rooms;
	private Integer adults;
	
	public String toString() {
		String criteriaString = "";
		criteriaString += "location=" + this.location;
		criteriaString += "&checkin=" + this.checkin;
		criteriaString += "&checkout=" + this.checkout;
		if(!StringUtils.isEmpty(rooms)) criteriaString += "&rooms=" + this.rooms;
		if(!StringUtils.isEmpty(adults)) criteriaString += "&adults=" + this.adults;
		return criteriaString;
	}

}
