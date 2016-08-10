function p2kwiet13801395169_cbxFlightDestination_onSelection_seq0(eventobject) {
    kony.print("selected key", frmBookFlight.cbxFlightDestination.selectedKey);
    kony.print("selected key value ", frmBookFlight.cbxFlightDestination.selectedKeyValue);
    frmBookFlight.lblDestination.text = frmBookFlight.cbxFlightDestination.selectedKey;
}