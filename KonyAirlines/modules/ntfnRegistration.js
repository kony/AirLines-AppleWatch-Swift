/*************************************************************************************
 * Function:registerAPNS()
 * Description: function is used to get perticular deviceID and invoke Push notification register function.
 * Author: Kony
 *************************************************************************************/
function registerAPNS()
 {
  	
		appID="29277-1369016947";
        kpnsURL="https://mobilefabric-demo.messaging.konycloud.com"; 
		deviceID = kony.os.deviceInfo().deviceid;
		pushRegister();
  } 
  
/*************************************************************************************
 * Function:pushdeRegister()
 * Description: function is used to unregister perticular device to receive push notifications.
 * Author: Kony
 *************************************************************************************/  
function pushdeRegister()
{
		kony.print("************ JS unregisterFromAPNS() called *********");
		kony.push.deRegister({});
					
}

/*************************************************************************************
 * Function:pushRegister()
 * Description: function is used to register device to receive push Notifications.
 * Author: Kony
 *************************************************************************************/
function pushRegister()
{
	var devName = kony.os.deviceInfo().name;
	if(devName=="android")
	{
		callbackAndroidSetCallbacks();
		callbackAndroidRegister();
	}
	else if(devName=="iPhone")
	{
	
        remoteNotCallbacks();
		callbackiPhoneRegister();
	}
	else if(devName=="blackberry")
	{
		callbackBBSetCallbacks();
		callbackBBRegister();
	}
	else if(devName=="windows")
	{
		callbackWM7SetCallbacks();
		callbackWM7Register();
	}

}


/*************************************************************************************
 * Function:subscribeKPNS()
 * Description: function is used to subscribe the user to KPNS.
 * Author: Kony
 *************************************************************************************/
function subscribeKPNS(regId,ostype)
{ 
    var sub = {"sid":regId,"appId":appID,"osType":ostype,"deviceId": deviceID };
	var inp = {"subscriptionService":{"subscribe":sub}};
	var myhttpheaders={"Content-Type":"application/json"};
	var paramTab = {postdata:JSON.stringify(inp),httpheaders:myhttpheaders};
	var url = kpnsURL+"/subscription";
//kony.net.invokeServiceAsync/kony.net.invokeService are depricated, replacing with new APIs wrapper
    _invokeServiceAsyncForMF_(url,paramTab,KPNSregCallback);

}


function KPNSregCallback(status,result){

	 if(status==400){
	 kony.print("$#."+JSON.stringify(result));
	 var tmp = result["subscriptionResponse"];
	 ksid = tmp["ksid"];
		if(tmp["statusCode"] == 200)
			kony.print("Device subscribed to KPNS Server sucessfully..");
		else
			kony.print("Failed to subscribe to KPNS Server!!"+tmp["message"]);
	}		
	
}

/*************************************************************************************
 * Function:unsubscribeKPNS()
 * Description: function is used to unsubscribe the user to KPNS.
 * Author: Kony
 *************************************************************************************/
function unsubscribeKPNS()
{
    
    var sub = { "appId":appID,"ksid":ksid,"deviceId": deviceID };
	var inp = {"subscriptionService":{"unsubscribe":sub}};
	var myhttpheaders={"Content-Type":"application/json"};
	var paramTab = {postdata:JSON.stringify(inp),httpheaders:myhttpheaders};
	var url = kpnsURL+"/subscription";
//kony.net.invokeServiceAsync/kony.net.invokeService are depricated, replacing with new APIs wrapper
    _invokeServiceAsyncForMF_(url,paramTab,KPNSunregCallback);

}

function KPNSunregCallback(status,result)
{

	 if(status==400){
	 kony.print("$#."+JSON.stringify(result));
	 var tmp = result["subscriptionResponse"];
	 ksid = tmp["ksid"];
		if(tmp["statusCode"] == 200){
			alert("Device unsubscribed from KPNS Server sucessfully..");
		}	
		else
			alert("Failed to unsubscribe from KPNS Server!!"+tmp["message"]);
	}		
	
}




/*************************************************************************************
 * Function:registerActions()
 * Description: function is used to create Actions and Category.
 * Author: Kony
 *************************************************************************************/
function registerActions() 
 {
   
   	actionObjects = [];
    categoryObjects = [];   
 
 	 var action1 = kony.notificationsettings.createAction({
        "id": "action1",
        "label": "Check In",
        "pspConfig": {
            "authenticationRequired": false,
            "destructive": false,
            "activationMode":kony.notificationsettings.ACTIVATION_MODE_FORWARDS,
             "visibleOn": kony.notificationsettings.BOTH
        }
    }); 
    
     var action2 = kony.notificationsettings.createAction({
        "id": "action2",
        "label": "Open App",
        "pspConfig": {
            "authenticationRequired": false,
            "destructive": false,
            "activationMode":kony.notificationsettings.ACTIVATION_MODE_FORWARDS,
            "visibleOn": kony.notificationsettings.BOTH
        }
    }); 
    
    actionObjects[0]= action1;
    actionObjects[1]= action2;
    
    var category = kony.notificationsettings.createCategory({
        "categoryId": "CheckInNotification",
        "actions": actionObjects,
        "pspConfig": {
            "minimalActions":actionObjects
        }
    });
    categoryObjects[0]=	category; 
    var regCats = kony.notificationsettings.registerCategory({
        "categories": categoryObjects,
        "pspConfig": {
            "types": [0, 1, 2]
        }
    });
   
  
 }
    

/*************************************************************************************
 * Function:checkInNotification()
 * Description: function is used to show checkin Form of perticular flight with its flight number.
 * Author: Kony
 *************************************************************************************/
function checkInNotification(flightNo)
{

    var allFlightsData = kony.store.getItem("AllFlightsData");
    if (allFlightsData != null) {
        allFlights = allFlightsData["flightdetails"];
        for (var i = 0; i < allFlights.length; i++) {
            var com = "completed";
            var update = "true";
            if (flightNo == allFlights[i]["flightNumber"]) {
                frmCheckin.lblFno.text=allFlights[i]["flightNumber"];
				frmCheckin.lblFDestination.text=allFlights[i]["flightDestination"];
				frmCheckin.lblFSource.text=allFlights[i]["flightSource"];
				frmCheckin.lblBoarding.text=allFlights[i]["flightTime"];
				var GateNO=Math.floor((Math.random() * 100) + 10);
				    GateNO= 'A'+GateNO;    
				var SeatNo=Math.floor((Math.random() * 100) + 10);
				    SeatNo = SeatNo +'B';
				frmCheckin.lblGate.text=GateNO;
				frmCheckin.lblSeat.text=SeatNo;
				frmCheckin.lblCheckinStatus.text= "Ready to Board";
				frmCheckin.show();				
                break;
            }
        }
    }							            
}


/***************************************************************************************
 * Name		:	callbackiPhoneRegister
 * Author	:	Kony
 * Purpose	:	It register the device to the APNS.
*****************************************************************************************/
function callbackiPhoneRegister()
{
	kony.print("\n\n\n<--------in callbackiPhoneRegister--------->\n\n\n");
	var notificationTypes = [0, 1, 2];
	kony.push.register(notificationTypes);
}


/**
 * Name		:	remoteNotCallbacks
 * Author	:	Kony
 * Purpose	:	It sets the callback function for registration,push notification events.
**/
function remoteNotCallbacks()
{
	kony.print("\n\n\n<--------in remoteNotCallbacks--------->\n\n\n");
		var callbacksTable = {onsuccessfulregistration: regSuccessiPhoneCallback,onfailureregistration: regFailureiPhoneCallback,
							onlinenotification: onlinePushNotificationiPhoneCallback,offlinenotification: offlinePushNotificationiPhoneCallback,
							onsuccessfulderegistration: unregSuccessiPhoneCallback,onfailurederegistration: unregFailureiPhoneCallback };
		kony.push.setCallbacks(callbacksTable);
		
}

/**
 * Name		:	regSuccessiPhoneCallback
 * Author	:	Kony
 * Purpose	:	Callback function for successful registration on the APNS.
**/
function regSuccessiPhoneCallback(regId)
{
	kony.print("\n\n\n<--------in regSuccessiPhoneCallback--------->\n\n\n");
	kony.print("\n Registerd to iPhone push server : "+regId);
    regId = regId.replace(/ /g, "");
	subscribeKPNS(regId,"iphone");

}

/**
 * Name		:	regFailureiPhoneCallback
 * Author	:	Kony
 * Purpose	:	Callback function for the unsuccessful registration event.
**/
function regFailureiPhoneCallback(errormsg)
{
	kony.print("\n\n************ JS regFailureCallback() called *********");
	kony.print("Error message: "+JSON.stringify(errormsg));
	
}

/**
 * Name		:	onlinePushNotificationiPhoneCallback
 * Author	:	Kony
 * Purpose	:	Callback function for the push message recieving event while online.
**/
function onlinePushNotificationiPhoneCallback(msg,actionId)
{
	kony.print("************ JS onlinePushNotificationCallback() called *********");
	kony.print("\n received push:-"+JSON.stringify(msg));
		//alert("Message: "+JSON.stringify(msg));
	    kony.print("Action id is:"+actionId );
	    if(actionId == "action1"){
		var msgs = [];
		var flightNo = msg["flightNo"];
		checkInNotification(flightNo);
	    }else{
		frmAdd.show();
	    }	
						
}

/**
 * Name		:	offlinePushNotificationiPhoneCallback
 * Author	:	Kony
 * Purpose	:	Callback function for the push message recieving event while offline.
**/
function offlinePushNotificationiPhoneCallback(msg,actionId)
{
	kony.print("************ JS offlinePushNotificationCallback() called *********");
	alert("Message: "+msg["alert"]);
	kony.print("\n received push:-"+JSON.stringify(msg));
	kony.print(msg);
}

/**
 * Name		:	unregSuccessiPhoneCallback
 * Author	:	Kony
 * Purpose	:	Callback for the successful deregistration from the APNS.
**/
function unregSuccessiPhoneCallback()
{
	kony.application.dismissLoadingScreen();
   kony.print("---------callback Unregisterd Sucesfully!! apns");
	unsubscribeKPNS();
	
}

/**
 * Name		:	unregFailureiPhoneCallback
 * Author	:	Kony
 * Purpose	:	Callback for the unsuccessful deregistration event.
**/
function unregFailureiPhoneCallback(errormsg)
{
	
	kony.print("Error message: "+JSON.stringify(errormsg));
}








