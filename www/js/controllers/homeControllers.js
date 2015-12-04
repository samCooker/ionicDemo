/**
 * Created by Administrator on 2015/12/1.
 */
(function(){
    appModule
        .controller('homeCtrl',HomeCtrlFun) // 首页共用的控制器
        .controller('newFordosCtrl',NewFordosCtrlFun) // 新待办列表控制器
        .controller('fordosCtrl',FordosCtrlFun) // 各待办控制器
        .controller('otherCtrl',OtherCtrlFun) // 其他插件演示控制器
        ;

    // 首页共用的控制器
    function HomeCtrlFun($scope,$ionicModal,$state){
        $scope.logout=logoutFun;//登出
        $scope.fordoNum=80;

        // 创建一个弹出窗模板
        $ionicModal.fromTemplateUrl('templates/models/login.html', {
            scope: $scope,//继承自父scope
            animation: 'slide-in-up'//弹出动画
        }).then(function(modal) {
            $scope.loginModal = modal;
        });

        function logoutFun(){
            $state.go("login");
        }

    }

    // 新待办列表控制器
    function NewFordosCtrlFun($scope,$timeout,tipMsg){
        $scope.search=searchFun;
        $scope.doRefresh=doRefreshFun;//下拉刷新
        $scope.loadMore=loadMoreFun;//上拉加载
        $scope.isLoadEnd=false;//是否已经加载完成

        $scope.itemList=[];

        function searchFun(){

        }

        //下拉刷新
        function doRefreshFun(){
            $scope.itemList=[];
            $timeout(function(){
                for(var i=1;i<11;i++){
                    $scope.itemList.push({'title':'Item '+i});
                }
                $scope.$broadcast('scroll.refreshComplete');//广播下拉完成事件，否则图标不消失
                $scope.isLoadEnd=false;
            },2000);
        }

        //上拉加载
        function loadMoreFun(){
            var itemLen=$scope.itemList.length;
            $timeout(function(){
                for(i=1;i<11;i++){
                    $scope.itemList.push({'title':'Item '+(i+itemLen)});
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');;//广播上拉完成事件，否则图标不消失
                if($scope.itemList.length >100){
                    $scope.isLoadEnd=true;//100条后不加载
                    tipMsg.showMsg("no more data.");
                }
            },2000);
        }

    }

    // 各待办控制器
    function FordosCtrlFun(){

    }

    // 其他插件演示控制器
    function OtherCtrlFun($scope,$ionicActionSheet,tipMsg,$ionicPopup){
        $scope.share=shareFun;// 显示操作表
        $scope.inputMsg=inputMsgFun;// 显示可输入信息的弹出框

        $scope.data={checkData:'A'};//默认选项

        // 显示操作表
        function shareFun(){
            var sheet= $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Share</b> This' },
                    { text: '<b>input something</b>' }
                ],
                titleText: 'Modify your album',//列表标题
                cancelText: 'Cancel',//取消按钮文本
                buttonClicked: function(i) {
                    //i 点击的按钮序号，从0开始
                    switch(i){
                        case 0:
                            tipMsg.showMsg("share");
                            return true;
                        case 1:
                            inputMsgFun();
                            return true;
                    }
                    return false;
                }
            });
            //再次调用 sheet()可隐藏列表
        }

        //显示可输入信息的弹出框
        function inputMsgFun(){
            $ionicPopup.prompt({title:'test'}).then(function(res){
                $scope.bottomMsg=res;
            });
        }
    }

})();