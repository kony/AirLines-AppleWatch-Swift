/*************************************************************************************
 * Function: frmFlightDetailsPreshow()
 * Description: function to show Flight booking Source and Destination Airports with Airport ID.
 * Author: Kony
 *************************************************************************************/
function frmFlightDetailsPreshow()
{
		frmBookFlight.cbxFlightSource.masterData= [["Acapulco","ACA"],
												["Lanzarote","ACE"],
												["Atlantic City","AIY"],
												["Alice Springs","ASP"],
												["Bangkok","BKK"],
												["Nashville","BNA"],
												["Boston Logan Int","BOS"],
												["Paris Charles de Gaulle","CDG"],
												["Denver Int.","DEN"],
												["El Paso Int.","ELP"],
												["New York Newark Int.","EWR"],
												["Rome Leonardo Da Vinci","FCO"],
												["Frankfurt/Main","FRA"],
												["Johannesburg Grand C.","GCJ"],
												["Rio De Janeiro Int.","GIG"],
												["Hamburg","HAM"],
												["Hiroshima","HIJ"],
												["Hongkong","HKG"],
												["Houston Hobby Apt","HOU"],
												["Harare","HRE"],
												["Osaka Itami Apt","ITM"],
												["New York JF Kennedy","JFK"],
												["Jakarta","JKT"],
												["Osaka Kansai Int.","KIX"],
												["Kuala Lumpur","KUL"],
												["Las Vegas Mc Carran","LAS"],
												["Los Angeles Int Apt","LAX"],
												["London City Apt","LCY"],
												["London Gatwick Apt","LGW"],
												["London Heathrow Apt","LHR"],
												["Madrid Barajas Apt","MAD"],
												["Kansas City Int Apt","MCI"],
												["Miami Int Apt","MIA"],
												["Munich","MUC"],
												["Tokyo Narita","NRT"],
												["Paris Orly Apt","ORY"],
												["Nassau Paradise IS","PID"],
												["Rotterdam Apt","RTM"],
												["Seoul Kimpo Int","SEL"],
												["San Francisco Int Apt","SFO"],
												["Singapore","SIN"],
												["Stockholm","STO"],
												["Moscow Sheremetyevo Apt","SVO"],
												["Berlin Schonefeld Apt","SXF"],
												["Berlin Tempelhof Apt","THF"],
												["Berlin Tegel Apt","TXL"],
												["Tokyo","TYO"],
												["Venice Marco Polo Apt","VCE"],
												["Vienna","VIE"],
												["Moscow Vnukovo Apt","VKO"],
												["Edmonton Int Apt","YEG"],
												["Ottawa Uplands Int.","YOW"],
												["Zurich","ZRH"]
												];
												
		frmBookFlight.cbxFlightDestination.masterData=	[["Acapulco","ACA"],
												["Lanzarote","ACE"],
												["Atlantic City","AIY"],
												["Alice Springs","ASP"],
												["Bangkok","BKK"],
												["Nashville","BNA"],
												["Boston Logan Int","BOS"],
												["Paris Charles de Gaulle","CDG"],
												["Denver Int.","DEN"],
												["El Paso Int.","ELP"],
												["New York Newark Int.","EWR"],
												["Rome Leonardo Da Vinci","FCO"],
												["Frankfurt/Main","FRA"],
												["Johannesburg Grand C.","GCJ"],
												["Rio De Janeiro Int.","GIG"],
												["Hamburg","HAM"],
												["Hiroshima","HIJ"],
												["Hongkong","HKG"],
												["Houston Hobby Apt","HOU"],
												["Harare","HRE"],
												["Osaka Itami Apt","ITM"],
												["New York JF Kennedy","JFK"],
												["Jakarta","JKT"],
												["Osaka Kansai Int.","KIX"],
												["Kuala Lumpur","KUL"],
												["Las Vegas Mc Carran","LAS"],
												["Los Angeles Int Apt","LAX"],
												["London City Apt","LCY"],
												["London Gatwick Apt","LGW"],
												["London Heathrow Apt","LHR"],
												["Madrid Barajas Apt","MAD"],
												["Kansas City Int Apt","MCI"],
												["Miami Int Apt","MIA"],
												["Munich","MUC"],
												["Tokyo Narita","NRT"],
												["Paris Orly Apt","ORY"],
												["Nassau Paradise IS","PID"],
												["Rotterdam Apt","RTM"],
												["Seoul Kimpo Int","SEL"],
												["San Francisco Int Apt","SFO"],
												["Singapore","SIN"],
												["Stockholm","STO"],
												["Moscow Sheremetyevo Apt","SVO"],
												["Berlin Schonefeld Apt","SXF"],
												["Berlin Tempelhof Apt","THF"],
												["Berlin Tegel Apt","TXL"],
												["Tokyo","TYO"],
												["Venice Marco Polo Apt","VCE"],
												["Vienna","VIE"],
												["Moscow Vnukovo Apt","VKO"],
												["Edmonton Int Apt","YEG"],
												["Ottawa Uplands Int.","YOW"],
												["Zurich","ZRH"]
												];
												
		frmBookFlight.lblSource.text="Acapulco";
		frmBookFlight.lblDestination.text="Acapulco";

}



/*************************************************************************************
 * Function: cbxChanged()
 * Description: function to automatically enter Airport ID based on City or vice-versa 
 * Author: Kony
 *************************************************************************************/

function cbxChanged(eventObj){
		switch(eventObj.id){
			case "cbxAirPidFrom":
				frmFlightSearch.cbxCityFrom.selectedKey= eventObj.selectedKeyValue[1];
                  
				break;
			case "cbxAirPidTo":
				frmFlightSearch.cbxCityTo.selectedKey= eventObj.selectedKeyValue[1];
				break;
			case "cbxCityFrom":
				frmFlightSearch.cbxAirPidFrom.selectedKey= eventObj.selectedKeyValue[1];
				break;
			case "cbxCityTo":
				frmFlightSearch.cbxAirPidTo.selectedKey= eventObj.selectedKeyValue[1];
				break;
			default:
				break;
		}	
		
}

/*************************************************************************************
 * Function:checkin()
 * Description: This function gets check-In info like gateNo and SeatNo, on-click of Check-In.
 * Author: Kony
 *************************************************************************************/
function checkin(){
kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
if(CheckInFrom == "frmAdd")
currentSeg=frmAdd.segFDetails.selectedItems[0];
else
  currentSeg=frmFlights.segFDetails.selectedItems[0];
  
frmCheckin.lblFno.text=currentSeg["lblFno"];
frmCheckin.lblFDestination.text=currentSeg["lblFDestination"];
frmCheckin.lblFSource.text=currentSeg["lblFSource"];
frmCheckin.lblBoarding.text=currentSeg["lblBoarding"];
var GateNO=Math.floor((Math.random() * 100) + 10);
    GateNO= 'A'+GateNO;    
var SeatNo=Math.floor((Math.random() * 100) + 10);
    SeatNo = SeatNo +'B';
frmCheckin.lblGate.text=GateNO;
frmCheckin.lblSeat.text=SeatNo;
frmCheckin.lblCheckinStatus.text= "Ready to Board";
frmCheckin.show();          		
kony.application.dismissLoadingScreen();

}

/*************************************************************************************
 * Function:onCheckinResponseInFG()
 * Description: Function to get CheckinRequest Service call Responce.
 * Author: Kony
 *************************************************************************************/
function onCheckinResponseInFG(result)
{
	if(result["opstatus"]==0)
	{										    		
		kony.print("\n------result------>"+JSON.stringify(result));
		frmCheckin.lblGate.text=result["GateNO"];
		frmCheckin.lblSeat.text=result["SeatNo"];
		frmCheckin.lblCheckinStatus.text= "Ready to Board";
		frmCheckin.show();
	}
	else
	{
		alert("failure");
		kony.print("\n------updated result--->"+JSON.stringify(result));
	}																		
}


/*************************************************************************************
 * Function:performCheckinRequest()
 * Description: Function to perform CheckinRequest rest Service call.
 * Author: Kony
 *************************************************************************************/
function performCheckinRequest(requestParams, callback)
{

	var inputParamTable={
				            httpheaders:{
								},
							httpconfig:{method:"POST"},
							serviceID:"KonyAirlines"
			            };
	try
	{
		var url=appConfig.url;
		kony.print("\nurl-->"+url);
		kony.print("\nipTable-->"+inputParamTable);					   	
//kony.net.invokeServiceAsync/kony.net.invokeService are depricated, replacing with new APIs wrapper
		var connHandle = _invokeServiceAsyncForMF_(url,inputParamTable,asyncCallback);
					   	
	}catch(err)
	{
		kony.print("\nexeption in invoking service---\n"+JSON.stringify(err));
		alert("Error"+err);
	}	


	function asyncCallback(status, result)
	{
		kony.print("\n------status------>"+status);
		if(status==400)
		{
			if (callback)
			{
				callback(result);
			}							   		    
		}
	}
				
}





