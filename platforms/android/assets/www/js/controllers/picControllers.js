/**
 * Created by Administrator on 2015/12/27.
 */

(function() {
    appModule
        .controller('picCtrl',PicCtrlFun)
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
})();

