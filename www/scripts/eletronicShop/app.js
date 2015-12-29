// Ionic Starter App

angular.module('masgetMallApp', ['ionic', 'masgetMall.controllers','masgetMall.services'])

    .run(function ($ionicPlatform,$rootScope , $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        })
        $rootScope.$on('$ionicView.beforeEnter', function () {
          var stateName = $state.current.name;
          if (stateName === 'app.shopCategory'|| stateName === 'app.shopgoodsSearch' || stateName === 'app.shopfront' || stateName === 'app.goodsdetail'|| stateName == 'app.purchase') {
            $rootScope.hideTabs = true;
          } else {
            $rootScope.hideTabs = false;
          }
        })
    })

    .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $urlRouterProvider.otherwise('/app/home');
        // if none of the above states are matched, use this as the fallback
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/eletronicShop/menu.html",
                controller: 'AppCtrl'
            })
            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/home.html",
                        controller:'HomeCtrl'
                    }
                }
            })
            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/search.html",
                        controller:'SearchCtrl'
                    },
                    'shopsList@app.search':{
                        templateUrl: "templates/eletronicShop/showShopsList.html",
                        controller:'ShopsListCtrl'
                    },
                    'goodsList@app.search':{
                        templateUrl: "templates/eletronicShop/showGoodsList.html",
                        controller:'GoodsListCtrl'
                    }
                }
            })
            .state('app.classifyNavigate', {
                url: "/classify",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/classifyNavigate.html",
                        controller:'classifyNavigateCtrl'
                    }
                }
            })
            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/browse.html"
                    }
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })
            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('app.my', {
                url: "/my",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/my.html"
                    }
                }
            })
          .state('app.shopfront', {
            url: "/shopfront",
            views: {
              'menuContent': {
                templateUrl: "templates/eletronicShop/shopFront.html",
                controller: 'ShopFrontCtrl'
              }
            }
          })
          .state('app.goodsdetail', {
            url: "/goodsdetail",
            views: {
              'menuContent': {
                templateUrl: "templates/eletronicShop/goodsDetail.html",
                controller: 'GoodsDetailCtrl'
              }
            }
          })
          .state('app.shopgoodsSearch', {
            url: "/shopgoodsSearch",
            views: {
              'menuContent': {
                templateUrl: "templates/eletronicShop/shopgoodsSearch.html",
                controller: 'ShopFrontCtrl'
              }
            }
          })
            .state('app.shopCategory', {
                url: "/shopCategory",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/shopCategory.html"
                    }
                }
            })
            .state('app.layout', {
                url: "/layout",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eletronicShop/layout.html"
                    }
                }
            })

    });
