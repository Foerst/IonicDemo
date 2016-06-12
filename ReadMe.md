---
layout: post
title: "ionic混合应用开发"
date: 2016-05-30
categories: ionic
tags: [混合开发]

---

#### 一、 什么是ionic

ionic 是一个专注于用WEB开发技术，基于HTML5创建类似于手机平台原生应用的一个开发框架。绑定了AngularJS框架。这个框架的目的是从web的角度开发手机应用。基于cordova的编译平台，可以实现编译成各个平台的应用程序。
更多背景介绍参考：[这里](http://www.ioniconline.com/what-is-ionic/)
<!-- more -->
#### 二、 mac下安装配置
首先您需要安装 Node.js. 其次, 安装最新版本的cordova 和 ionic command-line tools.

1. 去[nodejs官网](https://nodejs.org/en/)下载pkg安装包，下载好后双击包默认安装即可.安装完成后可在终端输入 npm -v和 node -v查看版本号。
2. 安装ionic和cordova。在终端中输入以下内容即可:

		npm install -g cnpm --registry=https://registry.npm.taobao.org
		sudo cnpm install -g cordova ionic

	更多详细介绍请戳：[这里](http://cordova.apache.org/docs/en/5.1.1/guide/platforms/ios/index.html)

#### 三、 创建空白项目
在终端输入(用户名请替换)

	cd /Users/chan/Desktop/
	sudo ionic start IonicDemo blank
	cd IonicDemo
	sudo chmod -R 777 . #修改当前目录下文件读写权限

好了，到这里，空白项目就建好了，可以在终端输入
	
	sudo ionic build ios
	sudo ionic emulate ios
	
或者打开IonicDemo/platforms/ios/IonicDemo.xcodeproj位置的项目工程文件。当然，运行结果显示的是一个空白页面，这么因为这是一个空白项目。可以在Xcode中编辑www目录下的index.html文件，在<ion-content>标签中添加按钮：

    <div ng-controller="LoginController">
        <button ng-click="handleClick()">点击</button>
    </div>
然后终端输入 sudo ionic build ios，Xcode中重新运行，就可以在屏幕上显示一个按钮了。效果图如下：

![img](http://7xql77.com1.z0.glb.clouddn.com/ionic_blank_proj_shot.png)

#### 四、 添加cordova插件
在工程目录下新建customPlugins文件夹，然后添加插件id目录，该目录下添加plugin.xml文件、src和www文件夹，分别保存插件配置、保存插件原生.h和.m文件和js文件，如下图所示, 
	![img](http://7xql77.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-06-08%20%E4%B8%8B%E5%8D%885.49.43.png)
	
1. 创建LoginPlugin类,继承自CDVPlugin类. ps:CDVPlugin即为cordova库的连接类。
![img](http://7xql77.com1.z0.glb.clouddn.com/tertetnew_login_plugin_file.png)
为了防止程序报错'Cordova/Cordova.h' file not found，将头文件改为`#import<Cordova/CDV.h>`，修改后的LoginPlugin.h文件如下：
![img](http://7xql77.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-06-07%20%E4%B8%8B%E5%8D%887.58.16.png)
在LoginPlugin.h文件中,声明一个登录方法.CDVInvokedUrlCommand对象为调用URL命令的时候自动传递的参数。
![img](http://7xql77.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-06-07%20%E4%B8%8B%E5%8D%888.15.27.png)

		1: 获取到调用的命令的唯一ID;
		2: 保存插件代理;
		3: 通过command的参数数组获取传递过来的有效参数;
		4: 用BRIDGE_HANDLE根据参数进行跳转处理;
		5: h5跳转Native页面完成特定任务后再跳转回h5时的回调;
		6: 实例化CDVPluginResult对象，保存特定信息，通过插件代理发送改对象;
		7: 通过代理发送消息;
		8: 判断参数是否有效;
		－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
	  `plugin.xml`中`platform`还有其它的配置`头文件`、`框架`、`plist文件`、`.a文件`以及配置`*-info.plist`文件.eg:
		框架: <framework src="CFNetwork.frame" weak="true"/>
		
		plist文件: <resource-file src="src/ios/PushConfig.plist"/>
		
		默认的info.plist添加key: 
		<config-file target="*-info.plist" parent="NSLocationWhenInUseUsageDescription">
		<string></string>
		</config-file>
		若为子类的https加密,可使用以下
		<config-file target="*-info.plist" parent="NSAppTransportSecurity">
		<dict>
		    <key>NSAllowsArbitraryLoads</key>
		    <true/>
		</dict>
		</config-file>
		
		.a文件：  <source-file src="src/ios/lib/libPushSDK-1.8.8.a" framework="true" />

2. 编写插件相应的js文件，然后添加到www文件夹下。
 ![img](http://7xql77.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-06-08%20%E4%B8%8B%E5%8D%884.51.35.png)
 ps:方框中的内容要与plugin.xml 中的方框name一致;
绿色横线的部分即为OC中CDVPlugin的子类要调用的函数名.
	
3. 修改插件配置文件plugin.xml.	
![img](http://7xql77.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-06-08%20%E4%B8%8A%E5%8D%8811.09.53.png)
ps:椭圆形的name和value值为插件的类名。

	更多iOS插件开发内容请参考：
[*这里*](http://cordova.apache.org/docs/en/6.x/guide/platforms/ios/plugin.html)

4. 修改app.js文件。app.js中定义了点击处理的handleClick函数：
![img](http://7xql77.com1.z0.glb.clouddn.com/Snip20160608_9.png)

5. 插件调用,修改index.html中内容，增加按钮以及点击事件。如下图所示：
![img](http://7xql77.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-06-08%20%E4%B8%8B%E5%8D%885.00.33.png)
		
6. 运行。先在终端输入以下命令：

		sudo ionic plugin add customPlugins/cordova-plugin-login//安装插件
		sudo ionic build ios //编译项目
	然后，用Xcode打开IonicDemo工程文件运行项目。效果图如下图所示。
	
	![img](http://7xql77.com1.z0.glb.clouddn.com/2016-06-08%2017_33_58.gif)
	
	ps:以后每次编辑过插件文件后，都要重新执行以下命令：
	
		sudo ionic plugin remove cordova-plugin-login//卸载插件
		sudo ionic plugin add customPlugins/cordova-plugin-login//安装插件
		sudo ionic build ios //编译项目
	提示：可以用sudo ionic plugin list 命令列出所有已安装插件，然后根据插件id删除插件。
	
参考：


[http://www.ioniconline.com/plugin-dev-android/](http://www.ioniconline.com/plugin-dev-android/)
[http://www.haomou.net/2014/10/06/2014_ionic_learn/](http://www.haomou.net/2014/10/06/2014_ionic_learn/)
[http://www.haomou.net/2015/02/10/2015_ionic_plugin/](http://www.haomou.net/2015/02/10/2015_ionic_plugin/)

[点击下载代码](https://github.com/JhonChan/IonicDemo)