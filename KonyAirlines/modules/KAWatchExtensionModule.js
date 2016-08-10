var availableFlights = null;
var currentFlightInfo = null;

function onFrmHomeWillActivate(form) {
  form.flightsLogo.setImageNamed("app_icon_small");
    fetchFlightsInfo(form);
}

function fetchFlightsInfo(form) {
    currentFlightInfo = null;

    function onFetchFlightsInfoComplete(fetchResults, error) {
        kony.print("error "+JSON.stringify(error) );
        kony.print("fetch results "+fetchResults);
        availableFlights = fetchResults.rows;
        kony.print("*********available flights **********"+availableFlights);
        if ((error == null) && (availableFlights.length > 0)) {
            kony.print("Setting data to segment");
            form.lblNoFlights.setHidden(true);
            form.segFlightsInfo.setHidden(false);
            form.flightsLogo.setHidden(true);
            form.lblOpenApp.setHidden(true);
            form.segFlightsInfo.setNumberOfRowsWithRowType(availableFlights.length, "flightsInfoTemplate");
            for (var index = 0; index < availableFlights.length; index++) {
                var segmentRow = form.segFlightsInfo.rowControllerAtIndex(index);
                segmentRow.LabelInfo6.setText(availableFlights[index].flightSourceDestination);
                segmentRow.flightLogo.setImageNamed("app_icon_small");
                segmentRow.LabelInfo1.setText(availableFlights[index].flightStatus);
                segmentRow.LabelInfo2.setText(availableFlights[index].flightTime);
                segmentRow.LabelInfo3.setText(availableFlights[index].flightDate);
                segmentRow.LabelInfo4.setText(availableFlights[index].flightTimeStatus);
                segmentRow.LabelInfo5.setText(availableFlights[index].flightSeatNumber);
            }
        } else {
            kony.print("No data avaialble");
            form.segFlightsInfo.setHidden(true);
            form.lblNoFlights.setHidden(false);
            form.lblOpenApp.setHidden(false);
        }
    }
    var WKInterfaceController = objc.import("WKInterfaceController");
    WKInterfaceController.openParentApplicationReply({
        "requestId": "allFlightsInfo"
    }, onFetchFlightsInfoComplete);
}

function setCurrentFlightInfo(flightIndex) {
    kony.print("Selected fligth index:"+flightIndex);
    currentFlightInfo = availableFlights[flightIndex];
  kony.print("currentFlightInfo fligth info:"+JSON.stringify(currentFlightInfo) );
}

function onFrmCheckinInit(form) {
      
    if (currentFlightInfo !== null) {
      
      if(currentFlightInfo.flightSeatNumber == "- -"){
        form.btnCheckin.setHidden(false); 
        kony.print("******check in available********");
        
      }
      else{
           form.btnCheckin.setHidden(true); 
        
      }
        form.updateTime.setText(currentFlightInfo.updateTime);
        form.flightTimeRemaining.setText(currentFlightInfo.flightTimeRemaining);
        form.flightGateNumber.setText(currentFlightInfo.flightGateNumber);
        form.flightTimeStatus.setText(currentFlightInfo.flightTimeStatus);
        form.flightStatus.setText(currentFlightInfo.flightStatus);
    }
  else{
    
    kony.print("current flight info is nothing");
  }
}


function onFrmCheckinConfirmationInit(form) {
    if (currentFlightInfo != null) {
        form.flightStatus.setText(currentFlightInfo.flightStatus);
        form.flightTimeRemaining.setText(currentFlightInfo.flightTimeRemaining);
        form.flightGateNumber.setText(currentFlightInfo.flightGateNumber);
      	form.flightSeatNumber.setText(currentFlightInfo.flightSeatNumber);
        form.flightTimeStatus.setText(currentFlightInfo.flightTimeStatus);
    }
  
      function onCheckinConfirmationComplete(fetchResults, error) {
        kony.print(fetchResults);
        currentFlightInfo.flightGateNumber = fetchResults.flightGateNumber;
        currentFlightInfo.flightSeatNumber = fetchResults.flightSeatNumber;
        form.flightGateNumber.setText(fetchResults.flightGateNumber);
        form.flightSeatNumber.setText(fetchResults.flightSeatNumber);
        
    }
    
    var WKInterfaceController = objc.import("WKInterfaceController");
    WKInterfaceController.openParentApplicationReply({"requestId":"checkindata", "userInfo":{}}, onCheckinConfirmationComplete);
}

function onFrmCheckinStatusInit(form)
{
    function onCheckinStatusComplete(fetchResults, error) {
        kony.print("fetchResults******"+fetchResults);
	
      if (fetchResults.success == true)
        {
            form.checkinStatus.setText("Checkin successful");
          	form.btnHome.setHidden(false);
          	form.btnTryAgain.setHidden(true);
          	form.btnOpenApp.setHidden(true);
           
        }
      	else
        {
            form.checkinStatus.setText("Checkin failed");
            form.btnHome.setHidden(true);
          	form.btnTryAgain.setHidden(false);
          	form.btnOpenApp.setHidden(false);
        }
        
      
            
    }
  
   var WKInterfaceController = objc.import("WKInterfaceController");
           WKInterfaceController.openParentApplicationReply({"requestId":"checkinconfirmation", "userInfo":currentFlightInfo}, onCheckinStatusComplete);

}

function onFrmGlanceInit(form)
{
  form.flightLogo.setImageNamed("app_icon_big");
 
    function onGlanceDataComplete(fetchResults, error) {
        kony.print("fetchResults ******"+JSON.stringify(fetchResults) );
      	if (fetchResults.error == null)
        {   kony.print("fetchResults error is  null ");
          	form.flightSourceDestination.setText(fetchResults.flightNSD);
            form.flightStatus.setText(fetchResults.flightStatus);
        	form.flightTimeRemaining.setText(fetchResults.flightTime);
        	form.flightDate.setText(fetchResults.flightDate);
        	form.flightTimeStatus.setText(fetchResults.flightTimeStatus);
            form.flightSeatNumber.setText(fetchResults.flightSeatNumber);
        }
      	else
        {
          
        }
    }
    
    var WKInterfaceController = objc.import("WKInterfaceController");
    WKInterfaceController.openParentApplicationReply({"requestId":"glancedata", "userInfo":{}}, onGlanceDataComplete);

}
