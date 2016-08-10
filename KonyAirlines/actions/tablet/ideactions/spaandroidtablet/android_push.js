function callbackAndroidRegister() {
    var configToRegister = {
        senderid: "726651452349"
    };
    kony.push.register(configToRegister);
}

function callbackAndroidSetCallbacks() {
    kony.push.setCallbacks({
        onsuccessfulregistration: regSuccessAndroidCallback,
        onfailureregistration: regFailureAndroidCallback,
        onlinenotification: onlinePushNotificationAndroidCallback,
        offlinenotification: offlinePushNotificationAndroidCallback,
        onsuccessfulderegistration: unregSuccessAndroidCallback,
        onfailurederegistration: unregFailureAndroidCallback
    });
}

function regSuccessAndroidCallback(regId) {
    subscribeKPNS(regId, "androidgcm");
}

function regFailureAndroidCallback(errormsg) {
    kony.print("************ JS regFailureCallback() called *********");
    kony.print(errormsg);
}

function onlinePushNotificationAndroidCallback(msg, actionId) {
    kony.print("************ JS onlinePushNotificationCallback() called *********");
    kony.print(JSON.stringify(msg));
    if (actionId == "action1") {
        var msgs = [];
        var flightNo = msg["flightNo"];
        checkinAndroid(flightNo);
    } else {
        frmAdd.show();
    }
}

function offlinePushNotificationAndroidCallback(msg) {
    kony.print("************ JS offlinePushNotificationCallback() called *********");
    kony.print(msg);
    var msgs = [];
    var fetchid = msg["mid"];
    sendViewMsgStatus(fetchid);
}

function unregSuccessAndroidCallback() {
    unsubscribeKPNS();
}

function unregFailureAndroidCallback(errormsg) {
    alert(" Unregistration Failed!!");
    alert("Error message: " + JSON.stringify(errormsg));
    kony.print(errormsg);
}

function fetchMsgSucessCallback(status, fetchMessage) {
    frmFetchMessage.msgID.text = frmFetchMsgs["segFetchMsgs"]["selectedItems"][0]["msgID"];
    frmFetchMessage.content.text = fetchMessage["content"];
    frmFetchMessage.show();
    kony.application.dismissLoadingScreen();
};

function segFetchMsgClick(eventobject, sectionNumber, rowNumber) {
    var fid = frmFetchMsgs["segFetchMsgs"]["selectedItems"][0]["msgID"];
    var url = kpnsURL + "/service/entrydata/content/" + fid;
    kony.net.invokeServiceAsync(url, {}, fetchMsgSucessCallback);
    kony.application.showLoadingScreen("loadingscreen", "Loading...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
};

function fetchMessagesSucessCalllback(status, fetchMsgs) {
    if (status == 400) {
        if (fetchMsgs != null && fetchMsgs != undefined && fetchMsgs["messages"] != null && fetchMsgs["messages"] != undefined) {
            var frmFetchMsgs_segFetchMsgs_temp = [];
            var msg = "";
            for (var i1 = 0; i1 < fetchMsgs["messages"].length; i1++) {
                msg = fetchMsgs["messages"][i1]["content"];
                if (msg.length > 10) msg = msg.substring(0, 9) + "...";
                frmFetchMsgs_segFetchMsgs_temp.push({
                    "content": msg,
                    "lblmsgKey": "MessageId:",
                    "lblufidkey": "Message:",
                    "msgID": fetchMsgs["messages"][i1]["fetchID"]
                })
            }
            frmFetchMsgs.segFetchMsgs.setData(frmFetchMsgs_segFetchMsgs_temp);
        } else kony.print("ERROR" + JSON.stringify(fetchMsgs));
        frmFetchMsgs.show();
        kony.application.dismissLoadingScreen();
    }
};

function fetchMessagesonClick(eventobject) {
    var mailId = frmHome.txtMail.text;
    var start = 1;
    var perpage = 10;
    var url = kpnsURL + "/service/entrydata/fetchmessages";
    kony.print("url:" + url);
    kony.net.invokeServiceAsync(url, {
        "userId": mailId,
        "startElement": "1",
        "elementsPerPage": "10"
    }, fetchMessagesSucessCalllback);
    kony.application.showLoadingScreen("loadingscreen", "Loading...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
};

function sendGeoLoction() {
    var inp = {
        "ksid": ksid,
        "latitude": lati,
        "locname": "",
        "longitude": longi
    };
    var myhttpheaders = {
        "Content-Type": "text/json"
    };
    var paramTab = {
        postdata: JSON.stringify(inp),
        httpheaders: myhttpheaders
    };
    var url = kpnsURL + "/service/geolocupdate";
    kony.net.invokeServiceAsync(url, paramTab, geoRegCallback);
}

function geoRegCallback(status, result) {
    if (status == 400) {
        kony.print("$#." + JSON.stringify(result));
        if (result["opstatus"] == 0) alert("Geolocation updated to KPNS sucessfully!!");
        else alert("Geolocation updated to KPNS Failed!!");
    }
}

function successcallback(position) {
    lati = position.coords.latitude;
    longi = position.coords.longitude;
    alert("Latitude :" + lati + " Longitude : " + longi + " ksid " + ksid);
    sendGeoLoction();
}

function errorcallback(positionerror) {
    var errorMesg = "Error code: " + positionerror.code;
    errorMesg = errorMesg + " message: " + positionerror.message
    kony.print(errorMesg);
}

function sendViewMsgStatus(fetchid) {
    var url = kpnsURL + "/service/entrydata/status/" + fetchid;
    kony.net.invokeServiceAsync(url, {}, satusCallback);
}

function satusCallback(status, result) {
    if (status == 400) kony.print("Status" + status);
}