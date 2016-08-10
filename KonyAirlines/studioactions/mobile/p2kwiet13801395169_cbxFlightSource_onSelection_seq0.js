function p2kwiet13801395169_cbxFlightSource_onSelection_seq0(eventobject) {
    kony.print("selected key", frmBookFlight.cbxFlightSource.selectedKey);
    kony.print("selected key value ", frmBookFlight.cbxFlightSource.selectedKeyValue);
    frmBookFlight.lblSource.text = frmBookFlight.cbxFlightSource.selectedKey;
}