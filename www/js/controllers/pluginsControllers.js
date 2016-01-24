/**
 * Created by Administrator on 2015/12/27.
 */

(function() {
    appModule
        .controller('picCtrl',PicCtrlFun)
        .controller('takePhotoCtrl',TakePhotoCtrlFun)
        .controller('adMobProCtrl',AdMobProCtrlFun)
        .controller('pickDateCtrl',pickDateCtrlFun)
    ;

    /**
     * 图片浏览
     * @constructor
     */
    function PicCtrlFun($scope,$cordovaImagePicker){
        $scope.likes=0;
        $scope.comments=0;
        //image picker
        $scope.pickImage = function () {
            var options = {
                maximumImagesCount: 5,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    console.log(results);
                    $scope.imgSrcs = results;
                }, function (error) {
                    // error getting photos
                });

        }
    }

    /**
     * 拍照
     * @param $scope
     * @param $cordovaCamera
     * @param tipMsg
     * @constructor
     */
    function TakePhotoCtrlFun($scope,$cordovaCamera,tipMsg){
        $scope.imgs=[];
        $scope.takePhoto=function(){
            $cordovaCamera.getPicture({
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI//成功后的返回类型
            }).then(function(imageURI){
                var img = {src:imageURI};
                $scope.imgs.push(img);
            }).catch(function(error){
                tipMsg.showMsg(error);
            });
        }
    }

    /**
     * 广告
     * @param $cordovaGoogleAds
     * @param tipMsg
     * @constructor
     */
    function AdMobProCtrlFun($cordovaGoogleAds,tipMsg){
        var admobid = {};
        if( /(android)/i.test(navigator.userAgent) ) {
            admobid = { // for Android
                banner: 'ca-app-pub-6869992474017983/9375997553',
                interstitial: 'ca-app-pub-6869992474017983/1657046752'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-6869992474017983/4806197152',
                interstitial: 'ca-app-pub-6869992474017983/7563979554'
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-6869992474017983/8878394753',
                interstitial: 'ca-app-pub-6869992474017983/1355127956'
            };
        }

        if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', initApp, false);
        } else {
            initApp();
        }

        function initApp() {
            tipMsg.alertMsg(admobid);
            $cordovaGoogleAds.createBanner({
                adId: admobid.banner,
                isTesting: true,
                overlap: false,
                offsetTopBar: false,
                position: AdMob.AD_POSITION.TOP_CENTER,
                bgColor: 'black'
            });

        }
    }


    function pickDateCtrlFun($scope,tools,$filter,tipMsg){
        $scope.pickDate1=pickDateFun1;//日期选择
        $scope.pickDate2=pickDateFun2;//日期选择
        $scope.pickDate3=pickDateFun3;//日期选择
        $scope.pickDate4=pickDateFun4;//日期选择

        //日期选择
        function pickDateFun1(){
            tools.dataPicker({
                date:$scope.pickDateV1,
                androidTheme:1
            }).then(function(date){
                $scope.pickDateV1=date;
                $scope.pickDateVal1=$filter('date')(date,'yyyy-MM-dd');
            });
        }
        //日期选择
        function pickDateFun2(){
            tools.dataPicker({
                date:$scope.pickDateV2,
                androidTheme:2
            }).then(function(date){
                $scope.pickDateV2=date;
                $scope.pickDateVal2=$filter('date')(date,'yyyy-MM-dd');
            });
        }
        //时间选择
        function pickDateFun3(){
            tools.dataPicker({
                date:$scope.pickDateV3,
                androidTheme:1,
                mode:'time'
            }).then(function(date){
                $scope.pickDateV3=date;
                $scope.pickDateVal3=$filter('date')(date,'hh:mm');
            });
        }
        //时间选择
        function pickDateFun4(){
            tools.dataPicker({
                date:$scope.pickDateV4,
                mode:'time',
                androidTheme:2
            }).then(function(date){
                $scope.pickDateV4=date;
                $scope.pickDateVal4=$filter('date')(date,'HH:mm');
            });
        }
    }
})();

