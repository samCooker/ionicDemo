/**
 * Created by Administrator on 2015/12/1.
 */
(function(){
    appModule
        .controller('homeCtrl',HomeCtrlFun) // 首页共用的控制器
        .controller('newFordosCtrl',NewFordosCtrlFun) // 新待办列表控制器
        .controller('fordosCtrl',FordosCtrlFun) // 各待办控制器
        .controller('otherCtrl',OtherCtrlFun) // 各待办控制器
        ;

    // 首页共用的控制器
    function HomeCtrlFun($scope,$ionicModal,$state){
        $scope.logout=logoutFun;//登出

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
    function NewFordosCtrlFun($scope,$ionicPopup){
        $scope.search=searchFun;

        function searchFun(){
//            $ionicPopup.prompt({title:'test'}).then(function(res){
//                console.log(res);
//            });
            var popup= $ionicPopup.show({
                template: '<input type="text" ng-model="dataTextStr">',
                title: 'Enter Something',
                subTitle:'',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            //不允许用户关闭 e.preventDefault();
                            return $scope.dataTextStr;
                        }
                    }
                ]
            });
            popup.then(function(res){
                console.log(res);
            });
        }
    }

    // 各待办控制器
    function FordosCtrlFun(){

    }

    // 各待办控制器
    function OtherCtrlFun(){

    }

})();