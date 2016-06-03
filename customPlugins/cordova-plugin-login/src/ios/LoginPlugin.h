//
//  LoginPlugin.h
//  IonicDemo
//
//  Created by CXY on 16/6/1.
//
//

#import <Cordova/CDV.h>
#import "H5BridgeNativeHandle.h"

@interface LoginPlugin : CDVPlugin
- (void)login:(CDVInvokedUrlCommand *)command;
@end
