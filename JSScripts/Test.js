VK.init(function() {
	VK.addCallback("onApplicationAdded", function{});
	VK.addCallback("onSettingsChanged", function{});
	VK.addCallback("onBalanceChanged", function{});
    VK.addCallback("onOrderCancel", HandleOrderCallback);
    VK.addCallback("onOrderSuccess", HandleOrderCallback);
    VK.addCallback("onOrderFail", HandleOrderCallback);
    VK.addCallback("onProfilePhotoSave", function{});
    VK.addCallback("onWallPostSave", function{});
	VK.addCallback("onWallPostCancel", function{});
	VK.addCallback("onWindowResized", function{});
	VK.addCallback("onLocationChanged", function{});
	VK.addCallback("onWindowBlur", function{});
	VK.addCallback("onWindowFocus", function{});
	VK.addCallback("onScrollTop", function{});
	VK.addCallback("onScroll", function{});
	VK.addCallback("onToggleFlash", function{});
	//VK.addCallback("", function{});
  });

function BuyGoldd () {
	if(VK !== undefined) {
		var params {
			type: "item",
			item: "kusok_gavna"
		};
		VK.showOrderBox();
	}
	SendMessage ("JSConnector", "GetMoney", 10);
}

function SendUserNameToUnity () {
	SendMessage ("JSConnector", "SetUserName", "GAVNO");
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