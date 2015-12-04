/**
 * Created by Administrator on 2015/11/30.
 */

(function(){
    appModule
        .factory('tipMsg', TipMsgFun)//信息提示
    ;

    //各种消息提示框
    function TipMsgFun($ionicPopup){
        Fac={
            showMsg:showMsgFun,//过一段时间会自动消失的提示框
            alertMsg:alertMsgFun, //带确定按钮的提示框
            inputMsg:inputMsgFun //自定义的可输入信息的对话框
        };

        //msg:显示的信息，duration：持续时间('short','long')默认short，position:显示位置('top', 'center', 'bottom'),默认center
        function showMsgFun(msg,duration,position){
            var _duration=duration||'short';
            var _position=position||'center';
            if(window.plugins&&window.plugins.toast){
                //有toast插件
                window.plugins.toast.show(msg,_duration,_position);
            }else{
                //无toast插件显示提示框
                alertMsgFun(msg);
            }
        }

        //带确定按钮的提示框 title:提示框标题 btnText:按钮的文字
        function alertMsgFun(msg,title,btnText){
            var alertPopup = $ionicPopup.alert({
                title: title||'tip message', // String. 弹窗的标题。
                subTitle: '', // String (可选)。弹窗的子标题。
                template: msg, // String (可选)。放在弹窗body内的html模板。
                okText: btnText||'GET IT'// String (默认: 'OK')。OK按钮的文字。
                //templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
                //okType: '' // String (默认: 'button-positive')。OK按钮的类型。
            });
            alertPopup.then(function(res) {
                //点击确定后
            });
        }

        function inputMsgFun($scope,title,subTitle){
            $scope._popData = {};//需要预先定义一个弹出窗数据接收对象
            var selfPopup= $ionicPopup.show({
                template: '<input type="text" ng-model="_popData.text">',
                title: title||'Enter Something',
                subTitle:subTitle||'',
                scope: $scope,//弹出窗的scope继承自父页面
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            //不允许用户关闭 e.preventDefault();
                            return $scope._popData.text;
                        }
                    }
                ]
            });
            return selfPopup;
        }
        return Fac;
    }


})();
