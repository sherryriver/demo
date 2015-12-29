angular.module('masgetMall.services',[])
    .factory('masgetMallService',['$http', function ($http) {
        var factory = {};
        //回调方式通过get方法获取数据
        factory.httpGet = function (url, callback) {
            $http.get(url).then(function (resp) {
                callback(resp.data);
            });
        };
        factory.httpPost = function (url,params,callback){
            $http({
                method : 'POST',
                url : url,
                data :  angular.toJson(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(resp){
                callback(resp);
            }).error(function(resp){
                callback(resp);
            });
        };
        return factory;
    }]);