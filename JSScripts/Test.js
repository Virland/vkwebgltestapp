var user_info;

function InitVK () {
	VK.init(function() {
		VK.addCallback("onApplicationAdded", function(){});
		VK.addCallback("onSettingsChanged", function(){});
		VK.addCallback("onBalanceChanged", function(){});
	    VK.addCallback("onOrderCancel", HandleOrderCallback);
		VK.addCallback("onOrderSuccess", HandleOrderCallback);
		VK.addCallback("onOrderFail", HandleOrderCallback);
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
		VK.loadParams(document.location.href);
    	var viewer_id = VK.params.viewer_id;
    	VK.api.call("users.get" , {user_ids:viewer_id}, function(data) {
    	alert("users.get");
    		if("responce" in data) {
    		alert("responce");
    			SendUserNameToUnity(data.responce[0].first_name);
    		}
    	});
	}, function(){}, 5.40);
}

function BuyGoldd () {
	var orderInfo = {
		type: "item",
		item: "kusok_gavna"
	};
	VK.callMethod("showOrderBox", orderInfo);
	SendMessage ("JSConnector", "GetMoney", 10);
}

function BuyGoldd () {
	var orderInfo = {
		type: "votes",
		votes: 100
	};
	VK.callMethod("showOrderBox", orderInfo);
	SendMessage ("JSConnector", "GetMoney", 10);
}

function HandleOrderCallback(data) {
	if("orderId" in data) {
		//Success
		
		SendMessage ("JSConnector", "ShowPurchaseResult", "Success");
	} else if("errorCode" in data) {
		//Error
		SendMessage ("JSConnector", "ShowPurchaseResult", "Error : " + data.errorCode);
	} else {
		//Cancel
		SendMessage ("JSConnector", "ShowPurchaseResult", "Canceled");
	}
}

function SendUserNameToUnity (usr_name) {
alert("Message");
	SendMessage ("JSConnector", "SetUserName", usr_name);
}

alert("VSE RABOTAET");