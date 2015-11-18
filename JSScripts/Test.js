var user_info;

function InitVK () {
	VK.init(function() {
		VK.addCallback("onApplicationAdded", function(){});
		VK.addCallback("onSettingsChanged", function(){});
		VK.addCallback("onBalanceChanged", function(){});
	    VK.addCallback("onOrderCancel", HandleOrderFail);
		VK.addCallback("onOrderSuccess", HandleOrderSuccess);
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
			
		SendMessage ("JSConnector", "VKInit", "");
		alert("after init");
		VK.loadParams(document.location.href);
    	var viewer_id = VK.params.viewer_id;
    	alert("after init, id : " + viewer_id);
    	VK.api("users.get" , {viewer_id}, function(data) {
    	alert("users.get");
    		if("response" in data) {
    			for(var key in data.response[0]) {
    				alert("responce : " + data.response[0][key]);
    			}
    			SendUserNameToUnity(data.response[0].first_name);
    		}
    	});
	}, function(){}, 5.40);
}

function BuyGoldd () {
	var orderInfo = {
		type: "item",
		item: "Gold_100"
	};
	VK.callMethod("showOrderBox", orderInfo);
	SendMessage ("JSConnector", "GetMoney", 10);
}

function TransferVotes () {
	var orderInfo = {
		type: "votes",
		votes: 10
	};
	VK.callMethod("showOrderBox", orderInfo);
	SendMessage ("JSConnector", "GetMoney", 10);
}

function HandleOrderSuccess(data) {
	if(data !== undefined) {
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

function SendUserNameToUnity (usr_name) {
alert("Message");
	SendMessage ("JSConnector", "SetUserNameJS", usr_name);
}

alert("Script Version : v0.09");