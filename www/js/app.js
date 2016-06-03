// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("LoginController", function($scope){
        $scope.handleClick = function() {
        successCallBack  = function (parameter) {
            //native跳转h5参数 , backView:客户端当前viewJSON串, view:需要跳转的视图
//            parameter = {type:viewChange,backView:{name:"login",userId:"12305060"},"view": {name:"home",userId:"12305060", psd: "password123"}}
            alert("用户名："+parameter["view"]["userId"]+"\n密码："+parameter["view"]["psd"]+"\n注册成功");
        }
        errorCallBack = function (data) {
            alert(data);
        }
            //跳转native参数 , view:需要跳转的视图
            parameter = {"view": {name:"login",userId:"12305060"}}
        cordova.plugin.Login.login(successCallBack,errorCallBack, parameter);
    }
});