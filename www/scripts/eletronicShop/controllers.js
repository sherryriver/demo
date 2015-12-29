angular.module('masgetMall.controllers', [])

    .controller('AppCtrl',['$scope','$ionicModal','$timeout','$state','masgetMallService', function ($scope, $ionicModal, $timeout,$state,masgetMallService) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/eletronicShop/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        $scope.toSearchState = function(){
            $state.go("app.search");
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
        $scope.classifyLists=[];
        masgetMallService.httpGet("./templates/classified.json",function(resp){
            if(resp.ret == 0){
                $scope.classifyLists = resp.data.rows;
            }
        });
    }])

    .controller('PlaylistsCtrl',['$scope',function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    }])
    .controller('PlaylistCtrl', function ($scope, $stateParams,$state) {
    })
    .controller('HomeCtrl', ['$scope','$timeout','$state',function($scope,$timeout,$state){
        $scope.slideHasChanged = function(index){
            console.info(index);
        };
        $scope.toHomeState = function(){
            $state.go("app.home");
        };

        $scope.toggleFooter = function () {
          $state.go("app.shopfront");
        };
        $scope.togt = function () {
          $state.go("app.goodsdetail");
        };

    }])
    .controller('classifyNavigateCtrl', ['$scope','$stateParams','$state','masgetMallService',function($scope,$stateParams,$state,masgetMallService){
        $scope.clasisfyQueryDatas = {
            loadClassifyDataFlag:false
        };
        $scope.classifyLists = [];
        //商品查询
        $scope.classifySearch = function (url) {
            masgetMallService.httpGet(url,function(resp){
                if(resp.ret == 0){
                    if($scope.classifyLists.length == 0){
                        $scope.classifyLists = resp.data.rows;
                    }else{
                        angular.forEach(resp.data.rows,function(data,index,array){
                            $scope.classifyLists.push(data);
                        });
                    }
                    $scope.clasisfyQueryDatas.loadClassifyDataFlag = true;
                }
                console.info(resp);
            });
        };
        $scope.classifySearch("./templates/classified.json");
        //上拉加载更多数据start
        $scope.loadMoreGoods = function () {
            console.info("loadMore...");
            var url = "../../templates/goods.json";
            $scope.classifySearch(url);
            $timeout(function(){
                $scope.clasisfyQueryDatas.loadClassifyDataFlag = false;
                $timeout(function(){
                    $scope.clasisfyQueryDatas.loadClassifyDataFlag = true;
                },1000);
            },500);
        };
        $scope.moreGoodsDataCanBeLoaded = function(){
            console.info("moreDataCanBeLoaded..."+$scope.clasisfyQueryDatas.loadClassifyDataFlag);
            return $scope.clasisfyQueryDatas.loadClassifyDataFlag;
        };
        //上拉加载更多数据end
        $scope.toSearchState = function(){
            $state.go("app.search");
        };
    }])
    .controller('SearchCtrl',['$scope','$state','masgetMallService',function($scope,$state,masgetMallService){
        $scope.shopsListShowFlag = false;
        $scope.goodsListShowFlag = false;
        $scope.goodsLists = [];
        $scope.goodsQueryDatas = {
            loadGoodsDataFlag:false
        };
        //商品查询
        $scope.goodsSearch = function (url) {
            masgetMallService.httpGet(url,function(resp){
                if(resp.ret == 0){
                    if($scope.goodsLists.length == 0){
                        $scope.goodsLists = resp.data.rows;
                    }else{
                        angular.forEach(resp.data.rows,function(data,index,array){
                            $scope.goodsLists.push(data);
                        });
                    }
                    $scope.goodsQueryDatas.loadGoodsDataFlag = true;
                }
                console.info(resp);
            });
        };
        //店铺查询
        $scope.shopSearch = function(url){
            masgetMallService.httpGet(url,function(resp){
                if(resp.ret == 0){
                    $scope.shopsLists = resp.data.rows;
                }
            });
        };
        $scope.goodsSearchClick = function(){
            var url = "./templates/goods.json";
            $scope.goodsSearch(url);
            $scope.shopsListShowFlag = false;
            $scope.goodsListShowFlag = true;
        };
        $scope.shopsSearchClick = function(){
            var url = "./templates/goods.json";
            $scope.shopSearch(url);
            $scope.shopsListShowFlag = true;
            $scope.goodsListShowFlag = false;
        };
    }])
    .controller('ShopsListCtrl',['$scope','$state','masgetMallService',function($scope,$state,masgetMallService){

    }])
    .controller('GoodsListCtrl',['$scope','$state','masgetMallService','$timeout',function($scope,$state,masgetMallService,$timeout){

        //上拉加载更多数据start
        $scope.loadMoreGoods = function () {
            console.info("loadMore...");
            var url = "./templates/goods.json";
            $scope.goodsSearch(url);
            $timeout(function(){
                $scope.goodsQueryDatas.loadGoodsDataFlag = false;
                $timeout(function(){
                    $scope.goodsQueryDatas.loadGoodsDataFlag = true;
                },1000);
            },500);
        };
        $scope.moreGoodsDataCanBeLoaded = function(){
            console.info("moreDataCanBeLoaded..."+$scope.goodsQueryDatas.loadGoodsDataFlag);
            return $scope.goodsQueryDatas.loadGoodsDataFlag;
        };
        //价格标志位，默认为升序
        $scope.shopPrice = "shopprice";
        $scope.shopPriceSortFlag = "asc";
        //根据商品价格排序
        $scope.shopPriceToggleSort = function(){

            if($scope.shopPriceSortFlag=="asc"){
                $scope.removeSortClass();
                $("#shopPriceSortClassId").addClass("ion-arrow-up-c");
                $scope.shopPriceSortFlag="desc";
            }else{
                $scope.removeSortClass();
                $("#shopPriceSortClassId").addClass("ion-arrow-down-c");
                $scope.shopPriceSortFlag="asc";
            }
        };
        //清除排序按钮的箭头图标
        $scope.removeSortClass = function(){
            $("#shopPriceSortClassId").removeClass();
        };
    }])

  //店铺首页
  .controller('ShopFrontCtrl',['$scope','$state','$rootScope','$ionicActionSheet','$ionicPopover','masgetMallService',
    function($scope,$state,$rootScope,$ionicActionSheet, $ionicPopover , masgetMallService){

      //查询店铺信息
      $scope.shopFront=[];
      masgetMallService.httpGet("../../templates/shopFront.json",function(resp){
        if(resp.ret == 0){
          $scope.shopFront = resp.data.rows;
          console.info(resp);
        }
      });

      //查询店铺首页商品
      $scope.shopgoods=[];
      masgetMallService.httpGet("../../templates/shopGoods.json",function(resp){
        if(resp.ret == 0){
          $scope.shopgoods = resp.data.rows;
          console.info(resp);
        }
      });

      //查询店铺分类
      $scope.classify=[];
      masgetMallService.httpGet("../../templates/smallClassify.json",function(resp){
        if(resp.ret == 0){
          $scope.classify = resp.data.rows;
          console.info(resp);
        }
      });

      $scope.toSearchPage = function(){
        $state.go("app.shopfront");
      };

      //点击查看商品明细
      $scope.toGoodsdetail = function(){
        $state.go("app.goodsdetail");
      };

      //搜索店铺内商品
      $scope.searchShopGoods = function(){
        $state.go("app.shopgoodsSearch");
      };

      //点击商品分类

      //商品分类界面
      $ionicPopover.fromTemplateUrl('templates/eletronicShop/smallClassify.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.morePopover = popover;
      });

      /* $scope.showActions = function() {
       // Show the action sheet
       $ionicActionSheet.show({
       buttons: [
       { text: '篮球鞋' },
       { text: '跑步鞋' },
       { text: '休闲鞋' }
       ],
       buttonClicked: function(index) {
       switch (index){
       case 0 :
       $state.go("app.shopgoodsSearch");
       break;

       case 1 :
       $state.go("app.goodsdetail");
       break;

       case 2 :
       $state.go("app.goodsdetail");
       break;
       }
       }
       });
       };*/
    }])

  .controller('GoodsDetailCtrl',['$scope','$state','$rootScope','$ionicModal',function($scope,$state,$rootScope,$ionicModal){

    //商品点击店铺返回店铺首页面
    $scope.goShopFront = function(){
      $state.go("app.shopfront");
    };

    //购买页面
    $ionicModal.fromTemplateUrl('templates/eletronicShop/purchase.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    //打开购买页面
    $scope.purchase = function () {
      $scope.modal.show();
    };
    //关闭购买页面
    $scope.closePurchase = function () {
      $scope.modal.hide();
    };

  }])
