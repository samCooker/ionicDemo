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
    function HomeCtrlFun($scope,$ionicModal,$state,dbTool,tipMsg){
//        $scope.logout=logoutFun;//登出
        $scope.logout=findAllIndexesFun;
        $scope.delAllIndexes=delAllIndexesFun;
        $scope.findAllIndexes=findAllIndexesFun;
        $scope.addIndex=addIndexFun;
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

        //添加索引
        function addIndexFun(){
            tipMsg.inputMsg($scope,'请输入要建立索引的字段名').then(function(res){
                if(res){
                    dbTool.getDb().createIndex({
                        index: {
                            fields: [res],//对字段建立索引
                            name:res+'-index'
                        }
                    }).then(function (result) {
                        tipMsg.showMsg('创建成功。');
                        console.log(result);
                    }).catch(function (err) {
                        tipMsg.showMsg('创建失败。');
                        console.log(err);
                    });
                }
            });

        }

        //查询出所有索引
        function findAllIndexesFun(){
            dbTool.getDb().getIndexes().then(function (result) {
                console.log(result);
            });
        }

        //删除索引确认操作
        function delAllIndexesFun(){
            tipMsg.confirm('确定删除所有索引？').then(function(res){
                if(res){//确定操作
                    findAllItemsFun();
                }
            });
        }

        //查询所有索引,然后删除
        function findAllItemsFun(){
            dbTool.getDb().getIndexes().then(function (result) {
                if(result.indexes){
                    result.indexes.forEach(function(eachItem){
                        if(eachItem.ddoc) {
                            dbTool.getDb().deleteIndex(eachItem).then(function (result) {
                            });
                        }
                    });
                    tipMsg.showMsg('删除成功。');
                }
            }).catch(function (err) {
                console.log(err);
                tipMsg.showMsg('索引出现异常');
            });
        }

    }

    // 新待办列表控制器
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
    function FordosCtrlFun($scope,$ionicModal,dbTool,tipMsg){
        $scope.doRefresh=doRefreshFun;
        $scope.addNewItem=addNewItemFun;
        $scope.openAddItemDlg=openAddItemDlgFun;
        $scope.findItem=findItemByTitle;
        $scope.deleteItem=deleteItemFun;
        $scope.imgItems=[];
        $scope.itemData={};
        $scope.search={};

        // 创建一个弹出窗模板
        $ionicModal.fromTemplateUrl('templates/models/new-item.html', {
            scope: $scope,//继承自父scope
            animation: 'slide-in-up'//弹出动画
        }).then(function(modal) {
            $scope.itemModal = modal;
        });

        //打开弹出窗
        function openAddItemDlgFun(){
            $scope.itemData={};//先清空之前的数据
            $scope.itemModal.show();
        }

        /**
         * 添加新的数据，保存在本地数据库中
         */
        function addNewItemFun(){
            if($scope.itemData.title){
                dbTool.putFdData($scope.itemData,function(res){
                    console.log(res);
                });
            }else{
                tipMsg.showMsg('标题不能为空。');
            }
        }

        /**
         * 下拉刷新
         */
        function doRefreshFun(){
            dbTool.getAllFdData().then(function(data){
                $scope.imgItems=data;
                $scope.$broadcast('scroll.refreshComplete');//广播下拉完成事件，否则图标不消失
            });
        }

        /**
         * 通过标题查找条目
         */
        function findItemByTitle(){
            $scope.imgItems=[];
            dbTool.findFdData($scope.search.title).then(function(data){
                $scope.imgItems=data;
                $scope.$broadcast('scroll.refreshComplete');//刷新一下页面，否则页面不显示
            }).catch(function(err){
                tipMsg.showMsg('没有找到数据');
            });
        }

        /**
         * 删除条目
         * @param item
         */
        function deleteItemFun(item){

        }

    }

    /**
     * 其他插件演示控制器
     * @param $scope
     * @param $ionicActionSheet
     * @tipMsg
     * @param $ionicPopup
     * @param $filter
     * @param tools
     * @constructor
     */
    function OtherCtrlFun($scope,$ionicActionSheet,tipMsg,$ionicPopup,$filter,tools){
        $scope.share=shareFun;// 显示操作表
        $scope.inputMsg=inputMsgFun;// 显示可输入信息的弹出框
        $scope.pickDate1=pickDateFun1;//日期选择
        $scope.pickDate2=pickDateFun2;//日期选择
        $scope.pickDate3=pickDateFun3;//日期选择
        $scope.pickDate4=pickDateFun4;//日期选择
        $scope.pickDate5=pickDateFun5;//日期选择

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

        //日期选择
        function pickDateFun1(){
            tools.dataPicker(function(date){
                $scope.pickDateVal1=$filter('date')(date,'yyyy-MM-dd');
                $scope.$broadcast('scroll.refreshComplete');//刷新一下页面，否则页面不显示
            },{
                date:$scope.pickDateVal1,
                androidTheme:1
            });
        }
        //日期选择
        function pickDateFun2(){
            tools.dataPicker(function(date){
                $scope.pickDateVal2=$filter('date')(date,'yyyy-MM-dd HH:mm:ss');
                $scope.$broadcast('scroll.refreshComplete');//刷新一下页面，否则页面不显示
            },{
                date:$scope.pickDateVal2,
                androidTheme:2
            });
        }
        //日期选择
        function pickDateFun3(){
            tools.dataPicker(function(date){
                $scope.pickDateVal3=$filter('date')(date,'yyyy-MM-dd HH:mm:ss');
                $scope.$broadcast('scroll.refreshComplete');//刷新一下页面，否则页面不显示
            },{
                date:$scope.pickDateVal3,
                androidTheme:3
            });
        }
        //日期选择
        function pickDateFun4(){
            tools.dataPicker(function(date){
                $scope.pickDateVal4=$filter('date')(date,'yyyy-MM-dd HH:mm:ss');
                $scope.$broadcast('scroll.refreshComplete');//刷新一下页面，否则页面不显示
            },{
                date:$scope.pickDateVal4,
                androidTheme:4
            });
        }
        //日期选择
        function pickDateFun5(){
            tools.dataPicker(function(date){
                $scope.pickDateVal5=$filter('date')(date,'yyyy-MM-dd HH:mm:ss');
                $scope.$broadcast('scroll.refreshComplete');//刷新一下页面，否则页面不显示
            },{
                date:$scope.pickDateVal5,
                mode:'time',
                androidTheme:5
            });
        }
    }

})();