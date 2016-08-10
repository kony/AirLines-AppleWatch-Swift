
import Foundation
import WatchKit

var availableFlights:[[String:String]] = [];
var currentFlightInfo:[String:String] = [:];

func onFrmHomeWillActivate(form:frmHomeController) {
    form.flightsLogo.setImageNamed("app_icon_small");
    fetchFlightsInfo(form);
}

func fetchFlightsInfo(form:frmHomeController) {
    currentFlightInfo = [:];
    
    func onFetchFlightsInfoSuccess(fetchResults:[String : AnyObject]) {
        print("fetch results \(fetchResults)");
        if(!fetchResults.isEmpty){
            availableFlights = fetchResults["rows"] as! [[String:String]];
            print("available flights \(availableFlights)");
            if (availableFlights.count > 0) {
                print("Setting data to segment");
                form.lblNoFlights.setHidden(true);
                form.segFlightsInfo.setHidden(false);
                form.flightsLogo.setHidden(true);
                form.lblOpenApp.setHidden(true);
                form.segFlightsInfo.setNumberOfRows(availableFlights.count, withRowType: "flightsInfoTemplate");
                for index in 0..<availableFlights.count {
                    let segmentRow = form.segFlightsInfo.rowControllerAtIndex(index);
                    var flightInfo = availableFlights[index];
                    if(segmentRow != nil){
                        segmentRow!.LabelInfo6!.setText(flightInfo["flightSourceDestination"]);
                        segmentRow!.flightLogo!.setImageNamed("app_icon_small");
                        segmentRow!.LabelInfo1!.setText(flightInfo["flightStatus"]);
                        segmentRow!.LabelInfo2!.setText(flightInfo["flightTime"]);
                        segmentRow!.LabelInfo3!.setText(flightInfo["flightDate"]);
                        segmentRow!.LabelInfo4!.setText(flightInfo["flightTimeStatus"]);
                        segmentRow!.LabelInfo5!.setText(flightInfo["flightSeatNumber"]);
                    }
                }
            } else {
                print("No data avaialble");
                form.segFlightsInfo.setHidden(true);
                form.lblNoFlights.setHidden(false);
                form.lblOpenApp.setHidden(false);
            }
        }
    }
    
    func onFetchFlightsInfoFailure(error:NSError){
        print("error in fetching data \(error)");
    }
    
    let phoneCommunicator = PhoneCommunicator.getSharedInstance();
    phoneCommunicator.requestData(["requestId": "allFlightsInfo"], replyHandler: onFetchFlightsInfoSuccess, errorHandler: onFetchFlightsInfoFailure);
}

func setCurrentFlightInfo(flightIndex:Int) {
    print("Selected flight index: \(flightIndex)");
    currentFlightInfo = availableFlights[flightIndex];
    print("currentFlightInfo fligth info: \(currentFlightInfo)");
}

func onFrmCheckinInit(form:frmCheckinController) {
    
    if (!currentFlightInfo.isEmpty) {
        
        if(currentFlightInfo["flightSeatNumber"] == "- -"){
            form.btnCheckin.setHidden(false);
            print("check in available");
            
        }
        else{
            form.btnCheckin.setHidden(true);
        }
        form.updateTime.setText(currentFlightInfo["updateTime"]);
        form.flightTimeRemaining.setText(currentFlightInfo["flightTimeRemaining"]);
        form.flightGateNumber.setText(currentFlightInfo["flightGateNumber"]);
        form.flightTimeStatus.setText(currentFlightInfo["flightTimeStatus"]);
        form.flightStatus.setText(currentFlightInfo["flightStatus"]);
    }
    else{
        print("current flight info is nothing");
    }
}


func onFrmCheckinConfirmationInit(form:frmCheckinConfirmationController) {
    if (!currentFlightInfo.isEmpty) {
        form.flightStatus.setText(currentFlightInfo["flightStatus"]);
        form.flightTimeRemaining.setText(currentFlightInfo["flightTimeRemaining"]);
        form.flightGateNumber.setText(currentFlightInfo["flightGateNumber"]);
        form.flightSeatNumber.setText(currentFlightInfo["flightSeatNumber"]);
        form.flightTimeStatus.setText(currentFlightInfo["flightTimeStatus"]);
    }
    
    func onCheckinConfirmationSuccess(fetchResults:[String : AnyObject]) {
        print("\(fetchResults)");
        let fetchData = fetchResults as! [String:String];
        if(!fetchData.isEmpty){
            currentFlightInfo["flightGateNumber"] = fetchData["flightGateNumber"];
            currentFlightInfo["flightSeatNumber"] = fetchData["flightSeatNumber"];
            form.flightGateNumber.setText(fetchData["flightGateNumber"]);
            form.flightSeatNumber.setText(fetchData["flightSeatNumber"]);
        }
    }
    
    func onCheckinConfirmationFailure(error:NSError){
        print("error in fetching data \(error)");
    }
    
    let phoneCommunicator = PhoneCommunicator.getSharedInstance();
    phoneCommunicator.requestData(["requestId":"checkindata", "userInfo":[:]], replyHandler: onCheckinConfirmationSuccess, errorHandler: onCheckinConfirmationFailure);
}

func onFrmCheckinStatusInit(form:frmCheckinStatusController)
{
    func onCheckinStatusSuccess(fetchResults:[String : AnyObject]) {
        print("fetchResults \(fetchResults)");
        let fetchData = fetchResults;
        if (fetchData["success"] as! Int == 1)
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
    
    func onCheckinStatusFailure(error:NSError){
        print("error in fetching data \(error)");
    }
    
    let phoneCommunicator = PhoneCommunicator.getSharedInstance();
    phoneCommunicator.requestData(["requestId":"checkinconfirmation", "userInfo":currentFlightInfo], replyHandler: onCheckinStatusSuccess, errorHandler: onCheckinStatusFailure);
}

func onFrmGlanceInit(form:frmGlanceController)
{
    form.flightLogo.setImageNamed("app_icon_big");
    
    func onGlanceDataSuccess(fetchResults:[String : AnyObject]) {
        print("fetchResults \(fetchResults)");
        let fetchData = fetchResults as! [String:String];
        if (fetchData["error"] == nil)
        {
            print("fetchResults error is nil");
            form.flightSourceDestination.setText(fetchData["flightNSD"]);
            form.flightStatus.setText(fetchData["flightStatus"]);
            form.flightTimeRemaining.setText(fetchData["flightTime"]);
            form.flightDate.setText(fetchData["flightDate"]);
            form.flightTimeStatus.setText(fetchData["flightTimeStatus"]);
            form.flightSeatNumber.setText(fetchData["flightSeatNumber"]);
        }
        else
        {
            
        }
    }
    
    func onGlanceDataFailure(error:NSError){
        print("error in fetching data \(error)");
    }
    
    let phoneCommunicator = PhoneCommunicator.getSharedInstance();
    phoneCommunicator.requestData(["requestId":"glancedata", "userInfo":[:]], replyHandler: onGlanceDataSuccess, errorHandler: onGlanceDataFailure);
    
}
