Ext.application({
	launch: function(){
        searchHotelForm();
    }
});

var formValues;

// form view to take input and search available hotel 
function searchHotelForm(){
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
	    },{
	    	xtype: 'button',
        	text: 'Search',
        	margin: '25 0 0 0',
        	handler: function() {
        	
            	formValues = this.up('form').getForm().getValues();
            	
            	var availableHotelsList = postAjaxSyncCall('/hotels', formValues);
            	availableHotelsGridView(availableHotelsList.data.hotels);
            	this.up('form').close();
        	}
        }]
	});
}

// grid view for available hotels
function availableHotelsGridView(availableHotelsList){

	Ext.create('Ext.data.Store', {
	    storeId: 'hotelStore',
	    data: availableHotelsList
	});
	
	Ext.create('Ext.grid.Panel', {
		renderTo: Ext.getBody(),
	    title: 'Available Hotels',
	    store: Ext.data.StoreManager.lookup('hotelStore'),
	    itemId: 'availableHotelsGridView',
	    height: 600,
	    width: '80%',
	    style: {
       		marginLeft: 'auto',
        	marginRight: 'auto',
        	marginTop: '50px'
   		},
	    columns: [{
	        text: 'Hotel Name', 
	        dataIndex: 'name', 
	        flex: 2 
	    },{
	        text: 'Rating', 
	        dataIndex: 'rating', 
	        flex: 1 
	    },{ 
	    	text: 'Starting Price', 
	    	dataIndex: 'minprice', 
	    	flex: 1
	    },{ 
	    	text: 'View Photo', 
	    	dataIndex: 'photoL', 
	    	flex: 1, 
	    	xtype: 'templatecolumn', 
	    	tpl: '<a href="javascript:photoViewer(\'{name}\', \'{photoL}\')">View Photo</a>'
	    },{ 
	    	text: 'View Rooms', 
	    	dataIndex: 'code', 
	    	flex: 1, 
	    	xtype: 'templatecolumn', 
	    	tpl: '<a href="javascript:hotelRoomsGridView(\'{code}\')">View Rooms</a>'
	    }]
	});
	
}

// grid view for available hotel rooms
function hotelRoomsGridView(hotelCode) {
	
	hotelDetails = postAjaxSyncCall('/hotel/' + hotelCode, formValues);
	
	Ext.ComponentQuery.query('#availableHotelsGridView')[0].close();
	
	Ext.create('Ext.data.Store', {
	    storeId: 'hotelStore',
	    data: hotelDetails.data.rates
	});
	
	Ext.create('Ext.grid.Panel', {
		renderTo: Ext.getBody(),
	    title: hotelDetails.data.name,
	    store: Ext.data.StoreManager.lookup('hotelStore'),
	    height: 300,
	    width: '80%',
	    style: {
       		marginLeft: 'auto',
        	marginRight: 'auto',
        	marginTop: '50px'
   		},
	    columns: [{ 
	        text: 'Room Type', 
	        dataIndex: 'room', 
	        flex: 2 
	    },{ 
	    	text: 'Rooms Available', 
	    	dataIndex: 'remaining', 
	    	flex: 1
	    },{ 
	    	text: 'Price', 
	    	dataIndex: 'pricing', 
	    	flex: 1,
	    	renderer: function(pricing) {
        		return pricing.price;
    		}
	    },{ 
	    	text: 'View Photo', 
	    	dataIndex: 'url.photoL', 
	    	flex: 1, 
	    	xtype: 'templatecolumn', 
	    	tpl: '<a href="javascript:photoViewer(\'{room}\', \'{url.photoL}\')">View Photo</a>'
	    },{ 
	    	text: 'Inclusions', 
	    	dataIndex: 'rate_desc', 
	    	flex: 3
	    }]
	});
	
}