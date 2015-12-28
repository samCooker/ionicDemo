/**
 * Created by Administrator on 2015/11/30.
 *
 *  ionic.js 没有使用 AngularJS内置的 ng-route 模块，
 *  而是选择了 AngularUI 项目 的 ui-router 模块。
 *  ui-router 的核心理念是将子视图集合抽象为一个状态机，
 *  导航意味着 状态 的切换。在不同的状态下， ionic.js 渲染对应的子视图（动态加载的 HTML 片段）
 *  就实现了路由导航的功能。
 *
 *  ionic.bundle.js 已经打包了 ui-route 模块， 所以使用时不需要单独引入。
 */

appModule.config(function($stateProvider, $urlRouterProvider){

$stateProvider
    .state('login',{
        url:'/login',
        controller:'loginCtrl',
        templateUrl:'templates/login.html'
    })
    .state('app',{//状态名称
        url: '/app',//页面跳转url,跳转方式有：1.$state.go(stateName) 2. 点击包含 ui-sref 指令的链接 <a ui-sref=stateName>Go State</a> 或 href=url的链接
        abstract: true,//表明此状态不能被显性激活，只能被子状态隐性激活
        templateUrl: 'templates/home/menu.html',//html模版路径，也可以直接使用template:'<div>template...<div>'
        controller: 'homeCtrl'//控制器名称
    })
    .state('app.newfordos',{// (app.xxx)xxx继承自app状态
        url: '/newfordos',  // 完整路径为 /app/newfordos
        //cache:'false',//不使用缓存，每次进入都刷新
        views:{
            'newfordos':{// 对应<ion-nav-view name="newfordos"></ion-nav-view>的name属性
                templateUrl:'templates/home/newfordos.html',
                controller:'newFordosCtrl'
            }
        }
    })
    .state('app.fordos',{
        url:'/fordos',
        views:{
            'fordos':{
                templateUrl:'templates/home/fordos.html',
                controller:'fordosCtrl'
            }
        }
    })
    .state('app.other',{
        url:'/other',
        views:{
            'other':{
                templateUrl:'templates/home/other.html',
                controller:'otherCtrl'
            }
        }
    })
    .state('localdata',{
        url:'/local/data',
        templateUrl:'templates/localdata/items.html',
        controller:'itemDataCtrl'
    })
    .state('imgpicker',{
        url:'/img/picker',
        templateUrl:'templates/img/picker.html',
        controller:'picCtrl'
    })
    ;
    $urlRouterProvider.otherwise('/login');//找不到对应url的默认设置
});