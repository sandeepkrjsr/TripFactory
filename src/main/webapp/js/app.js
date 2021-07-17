Ext.application({
	launch: function(){
        hotelRequestForm();
    }
});

var formValues;

function hotelRequestForm(){
	Ext.create('Ext.form.Panel', {
	    renderTo: Ext.getBody(),
	    title: 'Hotel Search',
	    height: 500,
	    width: 600,
	    padding: 100,
	    layout: {
        	type: 'vbox',
        	align: 'center',
        	pack: 'center'
    	},
    	style: {
       		marginLeft: 'auto',
        	marginRight: 'auto',
   		},
    	items: [{
	    	xtype: 'textfield',
	    	fieldLabel: 'Location',
	        name: 'location',
	        value: 'Athens'
	    },{
	    	xtype: 'numberfield',
	        fieldLabel: 'Person',
	        name: 'adults',
	        minValue: 1,
	        value: 1
	    },{
	    	xtype: 'numberfield',
	        fieldLabel: 'Rooms',
	        name: 'rooms',
	        minValue: 1,
	        value: 1
	    },{
	        xtype: 'datefield',
	        fieldLabel: 'Check In',
	        name: 'checkin',
	        format: 'Y-m-d',
	        value: Ext.Date.add(new Date(), Ext.Date.DAY, 1)
	    },{
	        xtype: 'datefield',
	        fieldLabel: 'Check Out',
	        name: 'checkout',
	        format: 'Y-m-d',
	        value: Ext.Date.add(new Date(), Ext.Date.DAY, 2)
	    }],	    
	    buttons: [{
        	text: 'Search',
        	handler: function() {
            	var form = this.up('form').getForm();
            	formValues = form.getValues();
            	var hotelList = inputSubmit(form);
            	hotelDetailsGridView(hotelList);
            	this.up('form').close();
        	}
        }]
	});
}

function inputSubmit(form){
	var jsonResp;
	Ext.Ajax.request({
  		url : '/hotels',
  		method: 'POST',
  		async: false,
  		contentType: "application/json",
  		jsonData: JSON.parse(Ext.util.JSON.encode(form.getValues())),
  		success: function(response) {
        	jsonResp = Ext.util.JSON.decode(response.responseText);
        },
        failure: function() {
        	Ext.Msg.alert('Error', 'Please select correct date.');
        }
	});
	return jsonResp.data.hotels;
}

function hotelDetailsGridView(hotelList){

	Ext.create('Ext.data.Store', {
	    storeId: 'hotelStore',
	    data: hotelList
	});
	
	Ext.create('Ext.grid.Panel', {
		renderTo: Ext.getBody(),
	    title: 'Available Hotels',
	    store: Ext.data.StoreManager.lookup('hotelStore'),
	    itemId: 'availableHotelsGridView',
	    height: 600,
	    width: 750,
	    style: {
       		marginLeft: 'auto',
        	marginRight: 'auto',
   		},
	    columns: [{ 
	        text: 'Hotel Name', 
	        dataIndex: 'name', 
	        flex: 3 
	    },{ 
	    	text: 'Starting Price', 
	    	dataIndex: 'minprice', 
	    	flex: 1
	    },{ 
	    	text: 'View', 
	    	dataIndex: 'code', 
	    	flex: 1, 
	    	xtype: 'templatecolumn', 
	    	//tpl: '<a href="/">View</a>'
	    	tpl: '<a href="javascript:getHotel(\'{code}\')">View</a>'
	    }]
	});
	
}

function getHotel(hotelCode){
	var jsonResp;
	Ext.Ajax.request({
  		url : '/hotel/' + hotelCode,
  		method: 'POST',
  		async: false,
  		contentType: "application/json",
  		jsonData: JSON.parse(Ext.util.JSON.encode(formValues)),
  		success: function(response) {
        	jsonResp = Ext.util.JSON.decode(response.responseText);
        }
	});
	
	hotelView(jsonResp.data.rates);	
}

function hotelView(hotelDetails) {
	
	Ext.ComponentQuery.query('#availableHotelsGridView')[0].close();
	
	Ext.create('Ext.data.Store', {
	    storeId: 'hotelStore',
	    data: hotelDetails
	});
	
	Ext.create('Ext.grid.Panel', {
		renderTo: Ext.getBody(),
	    title: 'Available Hotels',
	    store: Ext.data.StoreManager.lookup('hotelStore'),
	    itemId: 'availableHotelsGridView',
	    height: 600,
	    width: 750,
	    style: {
       		marginLeft: 'auto',
        	marginRight: 'auto',
   		},
	    columns: [{ 
	        text: 'Room Type', 
	        dataIndex: 'room', 
	        flex: 3 
	    },{ 
	    	text: 'Rooms Available', 
	    	dataIndex: 'remaining', 
	    	flex: 1
	    },{ 
	    	text: 'Inclusions', 
	    	dataIndex: 'rate_desc', 
	    	flex: 1
	    }]
	});
	
}