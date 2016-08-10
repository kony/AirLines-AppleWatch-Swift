/*************************************************************************************
 * Function:cleanUp()
 * Description: function to CleanUp.
 * Author: Kony
 *************************************************************************************/
function cleanUp() {
    kony.print("cleaning up ...");
}

/*************************************************************************************
 * Function:JSWcallBack()
 * Description: This function receives requestId on watchRequestCallBack, based on request id appropriate response is sent back. 
 * Author: Kony
 *************************************************************************************/
function JSWcallBack(dict, replyObj)
{
	var taskID = kony.application.beginBackgroundTask("UniqueTaskID", cleanUp);
	
	var retDict = {};
	  {
	  	if (dict.requestId == "allFlightsInfo")
	  	{
	  		retDict = handleFetchDataRequest(dict);
	 		replyObj.executeWithReply(retDict);
	  		kony.application.endBackgroundTask(taskID);
	  	}
	  	else if (dict.requestId == "checkindata")
	  	{
	  		handleCheckinRequest(dict.userInfo, replyObj, taskID);
	  	}
	  	else if (dict.requestId == "checkinconfirmation")
	  	{
	  	    
	  		retDict = handleCheckinConfirmationRequest(dict.userInfo);
	  		replyObj.executeWithReply(retDict);
	  		kony.application.endBackgroundTask(taskID); 	
	  	}
	  	else if (dict.requestId == "flightInfo")
	  	{
	  	    
	  		retDict = handleFlightInfoRequest(dict.userInfo);
	 		replyObj.executeWithReply(retDict);
	  		kony.application.endBackgroundTask(taskID);
	  	}
	  	else if (dict.requestId == "glancedata")
	  	{
	  	     
	  		retDict = handleGlanceDataRequest(dict);
	  		replyObj.executeWithReply(retDict);
	  		kony.application.endBackgroundTask(taskID);
	  	}
	  } 
}

/*************************************************************************************
 * Function:handleGlanceDataRequest()
 * Description: function is to handleGlanceDataRequest on watch CallBack.
 * Author: Kony
 *************************************************************************************/
function handleGlanceDataRequest(dict)
{
    var retDict = {};
    var flightData = {};
	var allFlightsData = kony.store.getItem("AllFlightsData");
	var dateNow = new Date();
	var minTimeDiff = Number.MAX_VALUE;
  	if(allFlightsData != null )
  	{
  	      var  allFlights = allFlightsData["flightdetails"];
  		    flightData["sdGroupDetails"] = {"visible":true};
			flightData["flightStatus"] = {"visible":true};
			flightData["flightDate"] = {"visible":true};
			flightData["flightTime"] = {"visible":true};
			flightData["flightTimeStatus"] = {"visible":true};
			flightData["seatGroup"] = {"visible":true};
			flightData["openAppLabel"] = {"visible":false};
			flightData["noFlightLabel"] = {"visible":false};
  		for(var i=0;i<allFlights.length;i++){
  			var flightDate = new Date(allFlights[i]["unformattedFlightDateObj"])
  			var flightTimeDiff = flightDate.diff("s",dateNow);
  			if(flightTimeDiff < minTimeDiff){
  				flightData = allFlights[i];
  				flightTimeDiff = minTimeDiff;
  				break;
  			}
  		}
  	}
  	else{
  	       
			flightData["sdGroupDetails"] = {"visible":false};
			flightData["flightStatus"] = {"visible":false};
			flightData["flightDate"] = {"visible":false};
			flightData["flightTime"] = {"visible":false};
			flightData["flightTimeStatus"] = {"visible":false};
			flightData["seatGroup"] = {"visible":false};
			flightData["openAppLabel"] = {"visible":true};
			flightData["noFlightLabel"] = {"visible":true};
			
  	
  	}
  	
	    retDict["data"] = flightData;
		retDict["cacheId"] = "" +new Date();
		retDict["hasUpdate"] = true;
        return retDict;
	
  }

/*************************************************************************************
 * Function:handleFlightInfoRequest()
 * Description:  function is to handleFlightInfoRequest on watch CallBack.
 * Author: Kony
 *************************************************************************************/
function handleFlightInfoRequest(dict)
{
    var retDict = {};
	var flightData = {};
	var allFlightsData = kony.store.getItem("AllFlightsData");
	var flightNumber=dict.flightNumber;
  	if(allFlightsData != null )
  	{ 
  	   kony.print("allFlights details :"+allFlightsData["flightdetails"]);
  		allFlights = allFlightsData["flightdetails"];
  		for(var i=0;i<allFlights.length;i++){
  			if(flightNumber==allFlights[i]["flightNumber"]){
  				flightData = allFlights[i];
  				break;
  			}
  		}
  	}
	
	retDict["data"] = flightData;
	retDict["cacheId"] = "" +new Date();
    retDict["hasUpdate"] = true;
	
    return retDict;
    
}

/*************************************************************************************
 * Function:handleFetchDataRequest()
 * Description: function is to get all booked flight details on watch CallBack.
 * Author: Kony
 *************************************************************************************/
function handleFetchDataRequest(dict)
{
	var retDict = {};
	var updatedFlight=[];
	var flightsData ={};
	var t="true";
	var f="false";
	var dataDict = kony.store.getItem("AllFlightsData");
	
		kony.print("versions are differing .. fething the data");
		var retFlightsDataDict = {};
		
		if(dataDict !=null)
		{
	    flightsData  =  dataDict["flightdetails"];
		if(flightsData != null && (flightsData.length > 0))
		{
			kony.print("Sending "+flightsData.length+" records to watch");
			var tableViewRowData = {"controller":"AllFlightsCustomRowTemplate", "rows":flightsData};
			retFlightsDataDict["tableView"] = {"data": tableViewRowData, "visible":true};
			retFlightsDataDict["noFlightsLabel"] = {"visible":false};
			retFlightsDataDict["bookNowLabel"] = {"visible":false};
			retFlightsDataDict["noFlightsLogo"] = {"visible":false};
			
		}
		else
		{
			kony.print("No records available");
			retFlightsDataDict["tableView"] = {"visible":false};
			retFlightsDataDict["noFlightsLabel"] = {"visible":true};
			retFlightsDataDict["bookNowLabel"] = {"visible":true};
			retFlightsDataDict["noFlightsLogo"] = {"visible":true};
			updateFlightsData(false);
		}
        }
		retDict["data"] = retFlightsDataDict;
		retDict["cacheId"] = "" +new Date();
		retDict["hasUpdate"] = true;	
	    kony.print("returnin gth dat back...");
	    return retDict;	
}

/*************************************************************************************
 * Function:handleCheckinRequest()
 * Description: function is to get Checkin Details like GateNo and SeatNo on watch CallBack.
 * Author: Kony
 *************************************************************************************/
function handleCheckinRequest(dict, replyObj, taskID)
{
	
	var result = {};
	 var GateNO=Math.floor((Math.random() * 100) + 10);    
     var SeatNo=Math.floor((Math.random() * 100) + 10);

  
	result["GateNO"] ='A'+GateNO;
	result["SeatNo"] =SeatNo+'C';
	result["opstatus"] = 0;
	onCheckinResponseInBG(result);

	function onCheckinResponseInBG(result)
	{
		var retDict = {};
		if(result["opstatus"]==0)
		{
									    		
			dict["flightGateNumber"] = result["GateNO"];
			dict["flightSeatNumber"] = result["SeatNo"];
			
			retDict["cacheId"] = "" +new Date();
			retDict["hasUpdate"] = true;
			retDict["data"] = dict;
	  		replyObj.executeWithReply(retDict);
  			kony.application.endBackgroundTask(taskID);
		}
		else
		{
			retDict["cacheId"] = "" +new Date();
			retDict["hasUpdate"] = true;
			retDict["data"] = {"error":"Service call failed"};
	  		replyObj.executeWithReply(retDict);
  			kony.application.endBackgroundTask(taskID);
			kony.print("\nFAILURE result--->"+JSON.stringify(result));
		}		
	}
}


/*************************************************************************************
 * Function:handleCheckinConfirmationRequest()
 * Description: function is to confirm Checkin on watch CallBack.
 * Author: Kony
 *************************************************************************************/
function handleCheckinConfirmationRequest(dict)
{
	
    var status = 0;
	var checkInDict= null;
	if(status==0)
	{
		kony.print(dict);
		var TflightNumber=dict.flightNumber;
		var TseatNumber=dict.flightSeatNumber;
		var TgateNumber=dict.flightGateNumber;
		
		kony.print("Saving seat info");
		updateSpecifiedFlight(TflightNumber,TseatNumber,TgateNumber);
		kony.print("Saving flights data ");
		updateFlightsData();
		kony.print("Save complete");
		
		checkInDict = {"checkInSuccessfulStatus" : {"text" : "Check In Successful", "color":"00FF00FF"}};
	}
	else
	{
		checkInDict = {"checkInSuccessfulStatus" : {"text" : "Check In Failure", "color":"FF0000FF"}};
	}
	
	var retDict = {};
	retDict["cacheId"] = "" +new Date();
	retDict["hasUpdate"] = true;
	retDict["data"] = checkInDict;
	return retDict;
}

/*************************************************************************************
 * Function:addbtn()
 * Description: function to show frmBookFlight Form, on click of Add button.
 * Author: Kony
 *************************************************************************************/
function addbtn(){
   frmBookFlight.show();
}

/*************************************************************************************
 * Function:onTimeSelection()
 * Description: function to get flightTime, on click of TimeSelection .
 * Author: Kony
 *************************************************************************************/
function onTimeSelection() {

var day=frmBookFlight.calFlightDate.day;
var month=frmBookFlight.calFlightDate.month;
var year=frmBookFlight.calFlightDate.year;
var hour=frmBookFlight.calFlightDate.hour;
var minute=frmBookFlight.calFlightDate.minutes;
var second=frmBookFlight.calFlightDate.seconds;
var flightTime=hour+':'+minute+':'+second;
var flightDate=year+'-'+month+'-'+day+'  '+flightTime;

 }