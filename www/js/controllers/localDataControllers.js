/**
 * Created by Administrator on 2015/12/28.
 */

(function(){
    appModule
        .controller('itemDataCtrl',ItemDataCtrlFun)
    ;

    /**
     * 本地存储数据
     * @param $scope
     * @param dbTool
     * @param tipMsg
     * @constructor
     */
    function ItemDataCtrlFun($scope,$ionicModal,$state,dbTool,tipMsg){
        $scope.delAllIndexes=delAllIndexesFun;
        $scope.findAllIndexes=findAllIndexesFun;
        $scope.addIndex=addIndexFun;
        $scope.backToHome=backToHomeFun;

        function backToHomeFun(){
            $state.go('app.newfordos');
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

        $scope.doRefresh=doRefreshFun;
        $scope.addNewItem=addNewItemFun;
        $scope.openAddItemDlg=openAddItemDlgFun;
        $scope.findItem=findItemByTitle;
        $scope.deleteItem=deleteItemFun;
        $scope.editItem=editItemFun;
        $scope.imgItems=[];
        $scope.itemData={};
        $scope.search={};

        var imgSrc={1:'1.gif',2:'2.jpg',3:'3.jpg',4:'4.jpg',5:'5.png',6:'6.jpg'};

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
                if(!$scope.itemData.img){
                    //随机获取一个已存在的图片名称
                    $scope.itemData.img=imgSrc[Math.ceil(Math.random()*10)%6+1];
                }
                console.log($scope.itemData);
                dbTool.postOrUpdate($scope.itemData).then(function(res){
                    $scope.itemModal.hide();
                    doRefreshFun();
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
            dbTool.rmFdData(item).then(function(res){
                if(res.ok) {
                    tipMsg.showMsg("删除成功");
                    doRefreshFun();
                }
            });
        }

        /**
         *
         */
        function editItemFun(item){
            $scope.itemData=item;//先清空之前的数据
            $scope.itemModal.show();
        }
    }
})();