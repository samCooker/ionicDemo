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
        $scope.logout=logoutFun;
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

    /**
     * 新待办列表控制器
     * @param $scope
     * @param $timeout
     * @param tipMsg
     * @param $ionicScrollDelegate
     * @constructor
     */
    function NewFordosCtrlFun($scope,$timeout,tipMsg,$ionicScrollDelegate){
        $scope.search=searchFun;
        $scope.doRefresh=doRefreshFun;//下拉刷新
        $scope.loadMore=loadMoreFun;//上拉加载
        $scope.isLoadEnd=false;//是否已经加载完成
        $scope.showToTop=false;
        $scope.scrollComplete=scrollCompleteFun;//滑动列表完成事件
        $scope.scrollToTop=scrollToTopFun;//返回至顶部

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
                $scope.$broadcast('scroll.infiniteScrollComplete');//广播上拉完成事件，否则图标不消失
                if($scope.itemList.length >100){
                    $scope.isLoadEnd=true;//100条后不加载
                    tipMsg.showMsg("no more data.");
                }
            },2000);
        }

        //滑动列表完成事件
        function scrollCompleteFun(){
            var toTop=$ionicScrollDelegate.$getByHandle('fordoScroll').getScrollPosition().top;
            if(toTop>200){
                $scope.$apply(function(){
                    $scope.showToTop=true;
                });
            }else{
                $scope.$apply(function(){
                    $scope.showToTop=false;
                });
            }
        }

        //返回至顶部
        function scrollToTopFun(){
            if($scope.showToTop){
                $ionicScrollDelegate.scrollTop(true);
            }
        }

    }

    /**
     * 条目列表控制器
     * @param $scope
     * @param $ionicModal
     * @param dbTool
     * @param tipMsg
     * @constructor
     */
    function FordosCtrlFun($scope,$state){
        $scope.toLocalData=toLocalDataFun;
        $scope.toTakePhoto=toTakePhotoFun;
        $scope.toAdMobPro=toAdMobProFun;
        $scope.toPickDate=toPickDateFun;

        function toLocalDataFun(){
            $state.go('localdata');
        }

        function toTakePhotoFun(){
            $state.go('takephoto');
        }

        function toAdMobProFun(){
            $state.go('admobpro');
        }

        function toPickDateFun(){
            $state.go('pickdate');
        }

    }

    /**
     * 其他插件演示控制器
     * @param $scope
     * @param $ionicActionSheet
     * @param tipMsg
     * @param $ionicPopup
     * @param $filter
     * @param tools
     * @param $state
     * @constructor
     */
    function OtherCtrlFun($scope,$ionicActionSheet,tipMsg,$ionicPopup,$filter,tools,$state){
        $scope.share=shareFun;// 显示操作表
        $scope.inputMsg=inputMsgFun;// 显示可输入信息的弹出框
        $scope.sheetTest=testShareSheet;
        $scope.sheetTest1=testShareSheet1;
        $scope.sheetTest2=testShareSheet2;
        $scope.sheetTest3=testShareSheet3;
        $scope.sheetTest4=testShareSheet4;
        $scope.sheetTest=testShareSheet;
        $scope.deleteTest=testDeleteSheet;
        $scope.logOutTest=testLogoutSheet;

        $scope.data={checkData:'A'};//默认选项

        var callback = function(buttonIndex) {
            setTimeout(function() {
                // like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
                alert('button index clicked: ' + buttonIndex);
            });
        };

        /**
         * actionSheet 插件
         */
        function testShareSheet() {
            var options = {
                'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_TRADITIONAL, // default is THEME_TRADITIONAL
                'title': 'What do you want with this image?',
                'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
                'addCancelButtonWithLabel': 'Cancel',
                'addDestructiveButtonWithLabel' : 'Delete it',
                'position': [20, 40] // for iPad pass in the [x, y] position of the popover
            };
            // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
            // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
            window.plugins.actionsheet.show(options, callback);
        }
        function testShareSheet1() {
            var options = {
                'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_DARK, // default is THEME_TRADITIONAL
                'title': 'What do you want with this image?',
                'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
                'addCancelButtonWithLabel': 'Cancel',
                'addDestructiveButtonWithLabel' : 'Delete it',
                'position': [20, 40] // for iPad pass in the [x, y] position of the popover
            };
            // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
            // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
            window.plugins.actionsheet.show(options, callback);
        }
        function testShareSheet2() {
            var options = {
                'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT, // default is THEME_TRADITIONAL
                'title': 'What do you want with this image?',
                'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
                'addCancelButtonWithLabel': 'Cancel',
                'addDestructiveButtonWithLabel' : 'Delete it',
                'position': [20, 40] // for iPad pass in the [x, y] position of the popover
            };
            // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
            // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
            window.plugins.actionsheet.show(options, callback);
        }
        function testShareSheet3() {
            var options = {
                'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK, // default is THEME_TRADITIONAL
                'title': 'What do you want with this image?',
                'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
                'addCancelButtonWithLabel': 'Cancel',
                'addDestructiveButtonWithLabel' : 'Delete it',
                'position': [20, 40] // for iPad pass in the [x, y] position of the popover
            };
            // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
            // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
            window.plugins.actionsheet.show(options, callback);
        }
        function testShareSheet4() {
            var options = {
                'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // default is THEME_TRADITIONAL
                'title': 'What do you want with this image?',
                'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
                'addCancelButtonWithLabel': 'Cancel',
                'addDestructiveButtonWithLabel' : 'Delete it',
                'position': [20, 40] // for iPad pass in the [x, y] position of the popover
            };
            // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
            // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
            window.plugins.actionsheet.show(options, callback);
        }


        function testDeleteSheet() {
            var options = {
                'addCancelButtonWithLabel': 'Cancel',
                'addDestructiveButtonWithLabel' : 'Delete note'
            };
            window.plugins.actionsheet.show(options, callback);
        }

        function testLogoutSheet() {
            var options = {
                'buttonLabels': ['Log out'],
                'androidEnableCancelButton' : true, // default false
                'winphoneEnableCancelButton' : true, // default false
                'addCancelButtonWithLabel': 'Cancel'
            };
            window.plugins.actionsheet.show(options, callback);
        }

        // 显示操作表
        function shareFun(){
            var sheet= $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Share</b> This' },
                    {text:'<b>pick</b> pictures'},
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
                            $state.go('imgpicker');
                            return true;
                        case 2:
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