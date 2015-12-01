/**
 * Created by Administrator on 2015/11/30.
 */

(function(){
    appModule.factory('tipMsg', TipMsgFun)//信息提示
    ;

    function TipMsgFun($ionicPopup){
        Fac={
            showMsg:showMsgFun//toast
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
                var alertPopup = $ionicPopup.alert({
                    title: 'tip message', // String. 弹窗的标题。
                    subTitle: '', // String (可选)。弹窗的子标题。
                    template: msg, // String (可选)。放在弹窗body内的html模板。
                    okText: 'GET IT'// String (默认: 'OK')。OK按钮的文字。
                    //templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
                    //okType: '' // String (默认: 'button-positive')。OK按钮的类型。
                });
                alertPopup.then(function(res) {
                    //res--true
            });
            }
        }
        return Fac;
    }
})();
