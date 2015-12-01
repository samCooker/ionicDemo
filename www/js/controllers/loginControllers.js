/**
 * Created by Administrator on 2015/11/30.
 */

(function(){
    appModule
        .controller('loginCtrl',loginCtrlFun)// 登陆控制器


    // 登陆控制器
    function loginCtrlFun($scope,$state,tipMsg){
        $scope.loginData={};
        $scope.login=loginFun;

        function loginFun(){
            console.log($scope.loginData);
            if($scope.loginData.username == 'samCooker'&&$scope.loginData.password == 1){
                $state.go('app.newfordos');
            }else{
                tipMsg.showMsg('username or password error!');
            }
        }
    }

})();