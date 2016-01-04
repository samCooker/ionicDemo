/**
 * Created by Administrator on 2015/12/27.
 */

(function() {
    appModule
        .controller('picCtrl',PicCtrlFun)
        .controller('takePhotoCtrl',TakePhotoCtrlFun)
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


    function TakePhotoCtrlFun($scope){
        $scope.imgs=[];
        $scope.takePhoto=function(){
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                destinationType: Camera.DestinationType.FILE_URI });

            function onSuccess(imageURI) {
                var img = {src:imageURI};
                $scope.imgs.push(img);
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        }
    }
})();

