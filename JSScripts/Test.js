var user_info;

function InitVK () {
	VK.init(function() {
		VK.addCallback("onApplicationAdded", function(){});
		VK.addCallback("onSettingsChanged", function(){});
		VK.addCallback("onBalanceChanged", function(){});
	    VK.addCallback("onOrderCancel", HandleOrderFail);
		VK.addCallback("onOrderSuccess", HandleOrderCallback);
		VK.addCallback("onOrderFail", HandleOrderFail);
		VK.addCallback("onProfilePhotoSave", function(){});
		VK.addCallback("onWallPostSave", function(){});
		VK.addCallback("onWallPostCancel", function(){});
		VK.addCallback("onWindowResized", function(){});
		VK.addCallback("onLocationChanged", function(){});
		VK.addCallback("onWindowBlur", function(){});
		VK.addCallback("onWindowFocus", function(){});
		VK.addCallback("onScrollTop", function(){});
		VK.addCallback("onScroll", function(){});
		VK.addCallback("onToggleFlash", function(){});
		//VK.addCallback("", function(){});
			
		SendMessage ("JSConnector", "VKInited", "");
		VK.loadParams(document.location.href);
    	var viewer_id = VK.params.viewer_id;
    	VK.api("users.get" , {viewer_id}, function(data) {
    		if("response" in data) {
    			for(var key in data.response[0]) {
    				//alert("responce : " + data.response[0][key]);
    			}
    		}
    	});
	}, function(){}, 5.40);
}

function BuyItem (item_name) {
	var orderInfo = {
		type: "item",
		item: item_name
	};
	VK.callMethod("showOrderBox", orderInfo);
}

function TransferVotes (count) {
	var orderInfo = {
		type: "votes",
		votes: count
	};
	VK.callMethod("showOrderBox", orderInfo);
}

function HandleOrderSuccess(data) {
	if(data !== undefined) {
		//Fail
		SendMessage ("JSConnector", "ShowPurchaseResult", "Success");
	}
}

function HandleOrderFail(data) {
	if(data !== undefined) {
		//Error
		SendMessage ("JSConnector", "ShowPurchaseResult", "Error : " + data);
	} else {
		//Cancel
		SendMessage ("JSConnector", "ShowPurchaseResult", "Canceled");
	}
}

//alert("Script Version : v0.09");