function p2kwiet13801395122_frmAdd_preshow_seq0(eventobject, neworientation) {
    populateSeg.call(this);
};

function p2kwiet13801395122_frmAdd_init_seq0(eventobject, neworientation) {
    init.call(this);
};

function p2kwiet13801395122_segFDetails_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    onRowClick.call(this);
};

function p2kwiet13801395169_frmBookFlight_preshow_seq0(eventobject, neworientation) {
    frmFlightDetailsPreshow.call(this);
};

function p2kwiet13801395169_frmBookFlight_init_seq0(eventobject, neworientation) {
    init.call(this);
};

function p2kwiet13801395169_cbxFlightSource_onSelection_seq0(eventobject) {
    /* 
cbxChanged.call(this,cbxAirPidFrom);

 */
    kony.print("selected key", frmBookFlight.cbxFlightSource.selectedKey);
    kony.print("selected key value ", frmBookFlight.cbxFlightSource.selectedKeyValue);
    frmBookFlight.lblSource.text = frmBookFlight.cbxFlightSource.selectedKey;
};

function p2kwiet13801395169_cbxFlightDestination_onSelection_seq0(eventobject) {
    /* 
cbxChanged.call(this,cbxAirPidFrom);

 */
    kony.print("selected key", frmBookFlight.cbxFlightDestination.selectedKey);
    kony.print("selected key value ", frmBookFlight.cbxFlightDestination.selectedKeyValue);
    frmBookFlight.lblDestination.text = frmBookFlight.cbxFlightDestination.selectedKey;
};

function p2kwiet13801395169_calFlightDate_onSelection_seq0(eventobject, isValidDateSelected) {
    onTimeSelection.call(this);
};

function p2kwiet13801395169_calFlightDateR_onSelection_seq0(eventobject, isValidDateSelected) {
    onTimeSelection.call(this);
};

function p2kwiet13801395169_cbxAdults_onSelection_seq0(eventobject) {
    /* 
cbxChanged.call(this,eventobject);

 */
};

function p2kwiet13801395169_cbxKids_onSelection_seq0(eventobject) {
    /* 
cbxChanged.call(this,eventobject);

 */
};

function p2kwiet13801395169_cbxInfant_onSelection_seq0(eventobject) {
    /* 
cbxChanged.call(this,eventobject);

 */
};

function p2kwiet13801395169_btnBookFlight_onClick_seq0(eventobject) {
    addFlight.call(this);
};

function p2kwiet13801395196_frmCheckin_init_seq0(eventobject, neworientation) {
    init.call(this);
};

function p2kwiet13801395196_btnCancel_onClick_seq0(eventobject) {
    frmFlightDetail.show();
};

function p2kwiet13801395196_btnInviteUser_onClick_seq0(eventobject) {
    onSubmitBtnClicked.call(this);
};

function p2kwiet138013951122_frmFlightDetail_init_seq0(eventobject, neworientation) {
    init.call(this);
};

function p2kwiet138013951122_btnCheckin_onClick_seq0(eventobject) {
    checkin.call(this);
};

function p2kwiet138013951146_frmFlights_preshow_seq0(eventobject, neworientation) {
    /* 
checkinSegmentPopulate.call(this);

 */
};

function p2kwiet138013951146_frmFlights_init_seq0(eventobject, neworientation) {
    init.call(this);
};

function p2kwiet138013951146_segFDetails_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    onRowClickFlightStatus.call(this);
};

function p2kwiet138013951168_frmFlightSearch_preshow_seq0(eventobject, neworientation) {
    frmFlightDetailsPreshow.call(this);
};

function p2kwiet138013951168_cbxCityFrom_onSelection_seq0(eventobject) {
    /* 
cbxChanged.call(this,eventobject);

 */
};

function p2kwiet138013951168_cbxCityTo_onSelection_seq0(eventobject) {
    /* 
cbxChanged.call(this,eventobject);

 */
};

function p2kwiet138013951168_calFlightDate_onSelection_seq0(eventobject, isValidDateSelected) {
    onTimeSelection.call(this);
};

function p2kwiet138013951168_btnCheckin_onClick_seq0(eventobject) {
    addFlight.call(this);
};

function p2kwiet138013951177_frmHome_preshow_seq0(eventobject, neworientation) {
    populateSeg.call(this);
};

function p2kwiet138013951177_frmHome_init_seq0(eventobject, neworientation) {
    init.call(this);
};

function p2kwiet138013951177_segHome_onRowClick_seq0(eventobject, sectionNumber, rowNumber) {
    onHomeRowClick.call(this);
};

function KonyAirlinespreappinit_seq0(params) {
    pre_init.call(this);
};

function KonyAirlinespostappinit_seq0(params) {
    registerAPNS.call(this);
};