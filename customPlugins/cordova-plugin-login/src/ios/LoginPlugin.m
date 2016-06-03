//
//  LoginPlugin.m
//  IonicDemo
//
//  Created by CXY on 16/6/1.
//
//

#import "LoginPlugin.h"


#define PLUGIN_COMMON_DELEGATE [[LoginPlugin sharedPlugin] commandDelegate]

@implementation LoginPlugin

+ (instancetype)sharedPlugin
{
    static LoginPlugin *sharedPlugin = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedPlugin = [[self alloc] init];
    });
    return sharedPlugin;
}

/* another way singletons
+ (instancetype)sharedPlugin
{
    static LoginPlugin *sharedPlugin = nil;
    @synchronized (self) {
        if (!sharedPlugin) {
            sharedPlugin = [[self alloc] init];
        }
    }
    return sharedPlugin;
}*/

- (void)login:(CDVInvokedUrlCommand *)command
{
    NSString *callBackID = command.callbackId;
    [LoginPlugin sharedPlugin].commandDelegate = self.commandDelegate;
    if (command.arguments.count) {
        NSDictionary *commandDic = [command.arguments objectAtIndex:0];
        [BRIDGE_HANDLE presentViewControllerFromController:self.viewController params:commandDic callback:^(id param) {
            CDVPluginResult *result = nil;
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:param];
            [PLUGIN_COMMON_DELEGATE sendPluginResult:result callbackId:callBackID];
        }];

    } else {
        CDVPluginResult *result = nil;
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"参数错误"];
        [PLUGIN_COMMON_DELEGATE sendPluginResult:result callbackId:callBackID];
    }
    
}
@end
