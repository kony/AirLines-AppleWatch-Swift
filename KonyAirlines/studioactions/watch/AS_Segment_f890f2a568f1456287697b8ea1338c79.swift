class func AS_Segment_f890f2a568f1456287697b8ea1338c79(form: frmHomeController, _ table: WKInterfaceTable, _ rowIndex: Int) {
setCurrentFlightInfo(rowIndex);
form.pushControllerWithName("frmCheckin", context: nil);

}