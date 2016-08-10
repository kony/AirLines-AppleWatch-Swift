Date.prototype.getMonthName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names[this.getMonth()];
};
Date.prototype.getDayName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].day_names[this.getDay()];
};
Date.prototype.getMonthNameShort = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names_short[this.getMonth()];
};
Date.prototype.diff = function(datepart, fromdate) {
    datepart = datepart.toLowerCase();
    var diff = this.getTime() - fromdate.getTime();
    kony.print("Difference in dates:" + diff);
    var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        n: 60000,
        s: 1000
    };
    return Math.floor(diff / divideBy[datepart]);
}
Date.locale = {
    en: {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        day_names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
};
var allFlightsDict = {};
var allFlights = [];
var currentSeg;
var versionCounter = 0;
var CheckInFrom;
/*************************************************************************************
 * Function:addFlight()
 * Description: function to book a Flight after entering details.
 * Author: Kony
 *************************************************************************************/
function addFlight() {
    var randomFno = Math.floor((Math.random() * 100) + 100);
    randomFno = 'DL ' + randomFno;
    var flightNumber = randomFno;
    var flightSource = frmBookFlight.cbxFlightSource.selectedKeyValue[1];
    var flightDestination = frmBookFlight.cbxFlightDestination.selectedKeyValue[1];
    var day = frmBookFlight.calFlightDate.day;
    var month = frmBookFlight.calFlightDate.month;
    var year = frmBookFlight.calFlightDate.year;
    var hour = frmBookFlight.calFlightDate.hour;
    var minute = frmBookFlight.calFlightDate.minutes;
    var second = frmBookFlight.calFlightDate.seconds;
    var flightDateObj = new Date(year, month - 1, day, hour, minute, second);
    var dateNow = new Date();
    var meridian = hour >= 12 ? "PM" : "AM";
    var hoursIn12Fmt = hour > 12 ? hour - 12 : hour;
    var flightTime = hoursIn12Fmt + ":" + minute + " " + meridian;
    var flightDate = flightDateObj.getDayName("en") + "," + flightDateObj.getMonthNameShort("en") + " " + flightDateObj.getDate() + "," + flightDateObj.getFullYear();
    var flightTimeRemaining = flightDateObj.diff("h", dateNow) + "H:" + (flightDateObj.diff("n", dateNow) - (60 * flightDateObj.diff("h", dateNow))) + "M";
    var flightStatus = flightNumber + ' Boards';
    var gateNumber = "- -";
    var flightTimeStatus = "On Time";
    var seatNumber = "- -";
    var flightCheckInStatus = "Check-In Available";
    var currentTimeStamp = kony.os.date().toString();
    var flightUpdateAvailable = "true";
    //creating oulet from here
    var flightSourceDestination = flightSource + "-" + flightDestination;
    var flightNSD = flightNumber + "    " + flightSourceDestination;
    if (flightSource == null) {
        var basicProperties = {
            message: "Please Select Flight Source.",
            alertType: constants.ALERT_TYPE_INFO,
            alertTitle: "Empty Field",
            alertHandler: function() {}
        };
        kony.ui.Alert(basicProperties, {});
        return;
    }
    if (flightDestination == null) {
        var basicProperties = {
            message: "Please Select Flight Destination.",
            alertType: constants.ALERT_TYPE_INFO,
            alertTitle: "Empty Field",
            alertHandler: function() {}
        };
        kony.ui.Alert(basicProperties, {});
        return;
    }
    if (flightDestination == flightSource) {
        var basicProperties = {
            message: "Source & Destination cannot be same.",
            alertType: constants.ALERT_TYPE_INFO,
            alertTitle: "Empty Field",
            alertHandler: function() {}
        };
        kony.ui.Alert(basicProperties, {});
        return;
    }
    if ((flightTime == "0:0 AM") || (flightTime == "0:0 PM")) {
        var basicProperties = {
            message: "Please select Flight Depature Date and Time.",
            alertType: constants.ALERT_TYPE_INFO,
            alertTitle: "Empty Field",
            alertHandler: function() {}
        };
        kony.ui.Alert(basicProperties, {});
        return;
    }
    var flightData = {
        "flightNumber": flightNumber,
        "flightSource": flightSource,
        "flightDestination": flightDestination,
        "flightSourceDestination": flightSourceDestination,
        "flightDate": flightDate,
        "flightStatus": flightStatus,
        "flightGateNumber": gateNumber,
        "flightTimeStatus": flightTimeStatus,
        "flightTime": flightTime,
        "flightCheckInStatus": flightCheckInStatus,
        "flightSeatNumber": seatNumber,
        "flightUpdateAvailable": flightUpdateAvailable,
        "currentTimeStamp": currentTimeStamp,
        "flightTimeRemaining": flightTimeRemaining,
        "flightNSD": flightNSD,
        "updateTime": "Updated 6H 5M Ago",
        "unformattedFlightDateObj": "" + flightDateObj
    };
    allFlights.push(flightData);
    kony.print("flight data is ----->", flightData);
    updateFlightsData(true);
    frmAdd.show();
}
/*************************************************************************************
 * Function:init()
 * Description: function to get flightdetails from local.
 * Author: Kony
 *************************************************************************************/
function init() {
    var allFlightsData = kony.store.getItem("AllFlightsData");
    if (allFlightsData != null) {
        allFlights = allFlightsData["flightdetails"];
        kony.print("all flights data is ---->", allFlights);
        versionCounter = allFlightsData["version"];
    } else {
        updateFlightsData();
    }
}
/*************************************************************************************
 * Function:
 * Description: function to update flight details in mobile local. 
 * Author: Kony
 *************************************************************************************/
function updateFlightsData(bol) {
    if ((typeof bol === "undefined") || (bol == true)) {
        versionCounter++;
    }
    var allFlightsData = {
        "flightdetails": allFlights,
        "version": versionCounter
    };
    kony.store.setItem("AllFlightsData", allFlightsData);
}
/*************************************************************************************
 * Function:populateSeg()
 * Description: function is used to update Flight details in segment.
 * Author: Kony
 *************************************************************************************/
function populateSeg() {
    var data2 = [];
    if (allFlights != null) {
        for (var count = 0; count < allFlights.length; count++) {
            frmAdd.lblNoFlights.setVisibility(false);
            var flightNumber = allFlights[count]["flightNumber"];
            var flightSource = allFlights[count]["flightSource"];
            var flightDestination = allFlights[count]["flightDestination"];
            var flightDate = allFlights[count]["flightDate"];
            var flightStatus = allFlights[count]["flightStatus"];
            var gateNumber = allFlights[count]["flightGateNumber"];
            var flightTimeStatus = allFlights[count]["flightTimeStatus"];
            var flightTime = allFlights[count]["flightTime"];
            var flightSeatNumber = allFlights[count]["flightSeatNumber"];
            var flightCheckInStatus = allFlights[count]["flightCheckInStatus"];
            data2.push({
                lblFno: flightNumber,
                lblFStatus: "On Time",
                lblFSource: flightSource,
                lblFDestination: flightDestination,
                lblHbrd: "BOARDING",
                lblBoarding: flightTime,
                lblHgate: "GATE",
                lblGate: gateNumber,
                lblHseat: "SEAT",
                lblSeat: flightSeatNumber,
                lblCheckinStatus: flightCheckInStatus,
                imgF: "flight.png"
            });
        }
    } else {
        allFlights = [];
        kony.print("empty flight details");
        frmAdd.lblNoFlights.setVisibility(true);
    }
    frmAdd.segFDetails.setData(data2);
}
/*************************************************************************************
 * Function:checkinSegmentPopulate()
 * Description: function is used to update Flight Checkin  details in segment.
 * Author: Kony
 *************************************************************************************/
function checkinSegmentPopulate() {
    var data2 = [];
    frmFlights.lblNoFlights.setVisibility(true);
    if (allFlights != null) {
        for (var count = 0; count < allFlights.length; count++) {
            var flightNumber = allFlights[count]["flightNumber"];
            var flightSource = allFlights[count]["flightSource"];
            var flightDestination = allFlights[count]["flightDestination"];
            var flightDate = allFlights[count]["flightDate"];
            var flightStatus = allFlights[count]["flightStatus"];
            var gateNumber = allFlights[count]["flightGateNumber"];
            var flightTimeStatus = allFlights[count]["flightTimeStatus"];
            var flightTime = allFlights[count]["flightTime"];
            var flightSeatNumber = allFlights[count]["flightSeatNumber"];
            var flightCheckInStatus = allFlights[count]["flightCheckInStatus"];
            if (flightSeatNumber == "- -") {
                frmFlights.lblNoFlights.setVisibility(false);
                data2.push({
                    lblFno: flightNumber,
                    lblFStatus: "On Time",
                    lblFSource: flightSource,
                    lblFDestination: flightDestination,
                    lblHbrd: "BOARDING",
                    lblBoarding: flightTime,
                    lblHgate: "GATE",
                    lblGate: gateNumber,
                    lblHseat: "SEAT",
                    lblSeat: flightSeatNumber,
                    lblCheckinStatus: flightCheckInStatus,
                    imgF: "flight.png"
                });
            }
        }
    } else {
        allFlights = [];
        kony.print("empty flight details");
        frmFlights.lblNoFlights.setVisibility(true);
    }
    frmFlights.segFDetails.setData(data2);
}
/*************************************************************************************
 * Function:flightDetailsSegmentPopulate()
 * Description: function is used to update Flight Checkin  details in segment.
 * Author: Kony
 *************************************************************************************/
function flightDetailsSegmentPopulate() {
    var data2 = [];
    if (allFlights != null) {
        for (var count = 0; count < allFlights.length; count++) {
            frmFlights.lblNoFlights.setVisibility(false);
            var flightNumber = allFlights[count]["flightNumber"];
            var flightSource = allFlights[count]["flightSource"];
            var flightDestination = allFlights[count]["flightDestination"];
            var flightDate = allFlights[count]["flightDate"];
            var flightStatus = allFlights[count]["flightStatus"];
            var gateNumber = allFlights[count]["flightGateNumber"];
            var flightTimeStatus = allFlights[count]["flightTimeStatus"];
            var flightTime = allFlights[count]["flightTime"];
            var flightSeatNumber = allFlights[count]["flightSeatNumber"];
            var flightCheckInStatus = allFlights[count]["flightCheckInStatus"];
            data2.push({
                lblFno: flightNumber,
                lblFStatus: "On Time",
                lblFSource: flightSource,
                lblFDestination: flightDestination,
                lblHbrd: "BOARDING",
                lblBoarding: flightTime,
                lblHgate: "GATE",
                lblGate: gateNumber,
                lblHseat: "SEAT",
                lblSeat: flightSeatNumber,
                lblCheckinStatus: flightCheckInStatus,
                imgF: "flight.png"
            });
        }
    } else {
        allFlights = [];
        frmFlights.lblNoFlights.setVisibility(true);
        kony.print("empty flight details");
    }
    frmFlights.segFDetails.setData(data2);
}
/*************************************************************************************
 * Function:onRowClick()
 * Description: function is used to get selected flight details, on click of perticular row in segement.
 * Author: Kony
 *************************************************************************************/
function onRowClick() {
    currentSeg = frmAdd.segFDetails.selectedItems[0];
    if ((currentSeg["lblGate"]) == ("- -")) frmFlightDetail.btnCheckin.setVisibility(true);
    else frmFlightDetail.btnCheckin.setVisibility(false);
    frmFlightDetail.lblFno.text = currentSeg["lblFno"];
    frmFlightDetail.lblFDestination.text = currentSeg["lblFDestination"];
    frmFlightDetail.lblFSource.text = currentSeg["lblFSource"];
    frmFlightDetail.lblGate.text = currentSeg["lblGate"];
    frmFlightDetail.lblSeat.text = currentSeg["lblSeat"];
    frmFlightDetail.lblBoarding.text = currentSeg["lblBoarding"];
    frmFlightDetail.lblCheckinStatus.text = currentSeg["lblCheckinStatus"];
    CheckInFrom = "frmAdd";
    frmFlightDetail.show();
}
/*************************************************************************************
 * Function:onRowClickFlightStatus()
 * Description: function is used to get selected flight details, on click of perticular row in segement.
 * Author: Kony
 *************************************************************************************/
function onRowClickFlightStatus() {
    currentSeg = frmFlights.segFDetails.selectedItems[0];
    if ((currentSeg["lblGate"]) == ("- -")) frmFlightDetail.btnCheckin.setVisibility(true);
    else frmFlightDetail.btnCheckin.setVisibility(false);
    frmFlightDetail.lblFno.text = currentSeg["lblFno"];
    frmFlightDetail.lblFDestination.text = currentSeg["lblFDestination"];
    frmFlightDetail.lblFSource.text = currentSeg["lblFSource"];
    frmFlightDetail.lblGate.text = currentSeg["lblGate"];
    frmFlightDetail.lblSeat.text = currentSeg["lblSeat"];
    frmFlightDetail.lblBoarding.text = currentSeg["lblBoarding"];
    frmFlightDetail.lblCheckinStatus.text = currentSeg["lblCheckinStatus"];
    frmFlightDetail.show();
    CheckInFrom = "frmFlights";
}
/*************************************************************************************
 * Function:onHomeRowClick()
 * Description: function is used to get selected flight details, on click of perticular row in segement.
 * Author: Kony
 *************************************************************************************/
function onHomeRowClick() {
    currentSeg = frmHome.segHome.selectedItems[0];
    if ((currentSeg["lblHome"]) == ("Book a trip")) frmBookFlight.show();
    else if ((currentSeg["lblHome"]) == ("Check in")) {
        checkinSegmentPopulate();
        frmFlights.title = "Check-In";
        frmFlights.show();
    } else if ((currentSeg["lblHome"]) == ("Flight Status")) {
        flightDetailsSegmentPopulate();
        frmFlights.title = "Flight Status";
        frmFlights.show();
    } else {
        populateSeg();
        frmAdd.title = "Find Booking";
        frmAdd.show();
    }
}
/*************************************************************************************
 * Function:deleteFlight()
 * Description: function is used to delete flight Details.
 * Author: Kony
 *************************************************************************************/
function deleteFlight() {
    for (var i = 0; i < allFlights.length; i++) {
        if (currentSeg["lblFlightNumber"] == allFlights[i]["flightNumber"]) {
            allFlights.splice(i, 1);
            updateFlightsData();
        }
    }
    frmAdd.show();
}
/*************************************************************************************
 * Function:onSubmitBtnClicked()
 * Description: function is to update flight details.
 * Author: Kony
 *************************************************************************************/
function onSubmitBtnClicked() {
    var t = "true";
    for (var i = 0; i < allFlights.length; i++) {
        if (currentSeg["lblFno"] == allFlights[i]["flightNumber"]) {
            allFlights[i]["flightGateNumber"] = frmCheckin.lblGate.text;
            allFlights[i]["flightSeatNumber"] = frmCheckin.lblSeat.text;
            allFlights[i]["flightCheckInStatus"] = frmCheckin.lblCheckinStatus.text;
            allFlights[i]["flightUpdateAvailable"] = t;
        }
    }
    updateFlightsData();
    frmAdd.show();
}
/*************************************************************************************
 * Function:updateSpecifiedFlight()
 * Description: function is used to update Specified flight details like flight gate,seat and checkIn status.
 * Author: Kony
 *************************************************************************************/
function updateSpecifiedFlight(flightNumber, seatNumber, gateNumber) {
    var allFlightsData = kony.store.getItem("AllFlightsData");
    if (allFlightsData != null) {
        allFlights = allFlightsData["flightdetails"];
        for (var i = 0; i < allFlights.length; i++) {
            var com = "Ready to Board";
            var update = "true";
            if (flightNumber == allFlights[i]["flightNumber"]) {
                allFlights[i]["flightSeatNumber"] = seatNumber;
                allFlights[i]["flightGateNumber"] = gateNumber;
                allFlights[i]["flightCheckInStatus"] = com;
                allFlights[i]["flightUpdateAvailable"] = update;
                allFlights[i]["currentTimeStamp"] = kony.os.date().toString();
                break;
            }
        }
    }
}
/*************************************************************************************
 * Function:getFlightData()
 * Description: function is used to get perticular FlightData with its flight Number.
 * Author: Kony
 *************************************************************************************/
function getFlightData(flightNumber) {
    var flightData = null;
    var allFlightsData = kony.store.getItem("AllFlightsData");
    if (allFlightsData != null) {
        kony.print("allFlights details :" + allFlightsData["flightdetails"]);
        allFlights = allFlightsData["flightdetails"];
        for (var i = 0; i < allFlights.length; i++) {
            if (flightNumber == allFlights[i]["flightNumber"]) {
                flightData = allFlights[i];
                break;
            }
        }
    }
    return flightData;
}
/*************************************************************************************
 * Function:getNextScheduledFlightData()
 * Description: function is used to get next scheduled flight data for glance. 
 * Author: Kony
 *************************************************************************************/
function getNextScheduledFlightData() {
    var flightData = null;
    var allFlightsData = kony.store.getItem("AllFlightsData");
    var dateNow = new Date();
    var minTimeDiff = Number.MAX_VALUE;
    if (allFlightsData != null) {
        allFlights = allFlightsData["flightdetails"];
        for (var i = 0; i < allFlights.length; i++) {
            var flightDate = new Date(allFlights[i]["unformattedFlightDateObj"])
            var flightTimeDiff = flightDate.diff("s", dateNow);
            if (flightTimeDiff < minTimeDiff) {
                flightData = allFlights[i];
                flightTimeDiff = minTimeDiff;
                break;
            }
        }
    }
    return flightData;
}
/*************************************************************************************
 * Function:localNotCallBacks()
 * Description: function is used to invoke local notifications.
 * Author: Kony
 *************************************************************************************/
function localNotCallBacks() {
    try {
        kony.localnotifications.setCallbacks({
            "offlinenotification": offlinenotification,
            "onlinenotification": onlinenotification
        });
    } catch (err) {
        kony.print("Error Code " + err.errorCode + " Message " + err.message);
    }
}
/*************************************************************************************
 * Function:pre_init()
 * Description: This function used to invoke callbacks handlers in application preinit.
 * Author: Kony
 *************************************************************************************/
function pre_init() {
    kony.application.setApplicationCallbacks({
        onwatchrequest: JSWcallBack
    });
    remoteNotCallbacks();
    localNotCallBacks();
    registerActions();
}

function onBackBtnClicked() {
    frmHome.show();
}