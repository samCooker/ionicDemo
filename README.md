# ionicDemo
ionic demo template
*****关于图标*****
访问http://ionicons.com/  可查询具体图标名称
或 查看ionicons-2.0.1.zip
*****************

****************弹出窗***********************
demo可查看首页的注册对话框
***************end***************************


****************时间插件***********************
cordova CLI: cordova plugin add cordova-plugin-datepicker
详情可查看https://www.npmjs.com/package/cordova-plugin-datepicker
*******************end************************


****************Toast插件***********************

*******************end**************************


*****************PouchDB 本地存储****************
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