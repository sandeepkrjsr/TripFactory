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
            	availableHotelsGridView();
        	}
        }]
	});
}

// grid view for available hotels
function availableHotelsGridView(){

	var availableHotelsList = postAjaxSyncCall('/hotels', formValues);
	
	var grid = new Ext.grid.GridPanel({
	    store: getStore(availableHotelsList.data.hotels),
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
	
	gridContainer('Available Hotels', grid);
	
}

// grid view for available hotel rooms
function hotelRoomsGridView(hotelCode) {
	
	hotelDetails = postAjaxSyncCall('/hotel/' + hotelCode, formValues);
	
	var grid = new Ext.grid.GridPanel({
	    store: getStore(hotelDetails.data.rates),
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
	
	gridContainer(hotelDetails.data.name, grid);
	
}

document.getElementsByClassName('x-tool')[0].dataset.qtip="back"
document.getElementsByClassName('x-tool')[1].dataset.qtip="back"
