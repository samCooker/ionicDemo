# ionicDemo
ionic demo template
*****关于图标*****
访问http://ionicons.com/  可查询具体图标名称
或 查看ionicons-2.0.1.zip
*****************

****************弹出窗***********************
demo可查看首页的注册对话框
***************end***************************


1.时间插件***********************
cordova CLI: cordova plugin add cordova-plugin-datepicker
详情可查看https://www.npmjs.com/package/cordova-plugin-datepicker
*******************end************************

2.Toast插件***********************
cordova plugin add cordova-plugin-x-toast
详情查看：https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin
*******************end**************************

3.PouchDB 本地存储插件****************
PouchDB是操作SQLite数据库的javascript库（跟mongoose操作mongodb一样）

SQLite是一种轻量级的嵌入式数据库（数据库不需要你安装的，手机系统自带，你需要安装的就是SQLite插件）
安装SQLite插件和pouchdb.js库，并将pouchdb引入到index.html中。

1. 安装指令: cordova plugin add io.litehelpers.cordova.sqlitestorage
2. 在index.html中引入js<script src="lib/pouchdb/dist/pouchdb.min.js"></script>

API: http://pouchdb.com/api.html
demo: 查看homeControllers.js的FordosCtrlFun方法

PouchDB查询插件:
https://github.com/nolanlawson/pouchdb-find
*********************end***********************

4.图片浏览**********************
cordova CLI: cordova plugin add https://github.com/wymsee/cordova-imagePicker.git

**********************end************************

5.文件上传下载插件****************
cordova CLI: cordova plugin add cordova-plugin-file-transfer

link :https://github.com/apache/cordova-plugin-file-transfer
**********************end**********************

6.拍照*************************
cordova CLI: cordova plugin add cordova-plugin-camera
Link  https://github.com/apache/cordova-plugin-camera
****************end************

7. ***************************
cordova CLI :cordova plugin add cordova-plugin-admobpro
Link        :https://github.com/floatinghotpot/cordova-admob-pro#quick-demo

***********end***************

8.**********fileOpener for android*********

cordova CLI :cordova plugin add cordova-plugin-fileopener
Link        :https://github.com/Smile-SA/cordova-plugin-fileopener

*************************