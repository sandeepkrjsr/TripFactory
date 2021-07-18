

// view image in window popup
function photoViewer(title, photoUrl) {
	var photoWindow = Ext.create('Ext.window.Window', {
	    renderTo: Ext.getBody(),
	    modal: true,
	    layout: 'fit',
	    height: 400,
	    width: 500,
	    title: title,
   		items: [{
        	xtype: 'image',
        	src: photoUrl
    	}]
	});
	photoWindow.show();
}

// do ajax sync post method call
function postAjaxSyncCall(endpoint, formValues){
	var jsonResp;
	Ext.Ajax.request({
  		url : endpoint,
  		method: 'POST',
  		async: false,
  		contentType: "application/json",
  		jsonData: JSON.parse(Ext.util.JSON.encode(formValues)),
  		success: function(response) {
        	jsonResp = Ext.util.JSON.decode(response.responseText);
        },
        failure: function() {
        	Ext.Msg.alert('Error', 'Please select correct date.');
        }
	});
	return jsonResp;
}

// get store for the list of data
function getStore(storeData){
	var store = Ext.data.Store({
	    data: storeData
	});
	return store;
}

// wrap grid inside window 
function gridContainer(title, grid){
	var gridContainer = Ext.create('Ext.window.Window', {
	    renderTo: Ext.getBody(),
	    cls: 'gridContainer',
	    modal: true,
	    draggable: false,
	    height: 600,
	    width: '80%',
	    title: title,
	    style: 'padding: 0; border-width: 0;',
   		items: [grid]
	});
	gridContainer.show();
}