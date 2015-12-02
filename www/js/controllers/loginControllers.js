/**
 * Created by Administrator on 2015/11/30.
 */

(function(){
    appModule
        .controller('loginCtrl',loginCtrlFun)// 登陆控制器


    // 登陆控制器
    function loginCtrlFun($scope,$state,$ionicModal,tipMsg){
        $scope.loginData={};
        $scope.login=loginFun;//登陆
        $scope.toSignUp=toSignUpFun;//弹出注册框
        $scope.closeSignUp=closeSignUpFun;//关闭注册框
        $scope.signUp=signUpFun;//注册


        // 创建一个弹出窗模板
        $ionicModal.fromTemplateUrl('templates/models/sign-up.html', {
            scope: $scope,//继承自父scope
            animation: 'slide-in-up'//弹出动画
        }).then(function(modal) {
            $scope.signUpmodal = modal;
        });

        //登陆
        function loginFun(){
            if($scope.loginData.username == 'samCooker'&&$scope.loginData.password == 1){
                $state.go('app.newfordos');//调整至新待办页面
            }else{
                tipMsg.showMsg('username or password error!');
            }
        }

        //弹出注册框
        function toSignUpFun(){
            $scope.signUpmodal.show();
        }

        //关闭注册框
        function closeSignUpFun(){
            $scope.signUpmodal.hide();
        }

        //注册
        function signUpFun(valid){
            tipMsg.showMsg(valid);
            if(valid){

            }else{
                tipMsg.showMsg("注册不成功。");
            }
        }
    }

})();