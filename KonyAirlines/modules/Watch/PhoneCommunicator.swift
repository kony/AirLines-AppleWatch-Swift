
import Foundation
import WatchConnectivity

class PhoneCommunicator : NSObject, WCSessionDelegate {
    
    static var sharedInstance:PhoneCommunicator? = nil;
    var session:WCSession? = nil;
    
    override init() {
        super.init();
        session = WCSession.defaultSession();
        if(session!.delegate == nil){
            session!.delegate = self;
            session!.activateSession();
        }
    }
    
    class func getSharedInstance() -> (PhoneCommunicator) {
        if(sharedInstance == nil){
            sharedInstance =  PhoneCommunicator();
        }
        return sharedInstance!;
    }
    
    func requestData(message: [String : AnyObject], replyHandler: (([String : AnyObject]) -> Void)?, errorHandler: ((NSError) -> Void)?) {
        if WCSession.isSupported() {
            print("session is supported on watch");
            if(session!.reachable){
                print("session reachable on phone");
                session!.sendMessage(message, replyHandler: replyHandler, errorHandler: errorHandler);
            }
        }
    }
}
;

