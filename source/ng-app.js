var app = angular.module('myApp', []);


/**************************************************
 CONTROLLER
****************************************************/
app.controller('ngCtrl', function($scope, $rootScope, brodcastService) {
    $scope.customerName = "Mahipal";
    $scope.customerAge = "29";
    $scope.customerPlace = "Armoor";

    $rootScope.$on("global.broadcast", function(event, user) {
        $scope.user = user;
    });
    $scope.customerSubmit = function(name) {
        $scope.customerName = name;
    }
    $scope.customerSubmit2 = function(name) {
        setTimeout(function() {
            $scope.customerName = name;
        }, 2000);
    }
    $scope.customerSubmit3 = function(name) {
        $scope.customerName = name;
    }
    $scope.customerSubmit4 = function(name) {
        $scope.customerName = name;
    }
    $scope.sum = function(x, y) {
        return x * y;
    }

});

/**************************************************
 FACTORY
****************************************************/
app.factory("factoryService", function() {
    var obj = {};
    obj.setName_Factory = function(name) {
        getName = name;
    };
    obj.getName_Factory = function() {
        return getName;
    };


    return obj;
})

/**************************************************
 SERVICES
****************************************************/
app.service("ng-services", function() {
    var obj = { name: "Mahipal", age: "29" };

    this.setName_service = function(objVal) {
        obj = objVal;
    };
    this.getName_service = function() {
        return obj;
    };


})

/**************************************************
 DIRECTIVES
****************************************************/

app.directive("myDirectiveDiv", function() {
    return {
        restrict: "E",
        template: "<div>{{user.name}}</div>",
        scope: {
            user: "=data"
        },
        replace: true,
        //transclude: true
    }
});

app.directive('myProfile', function() {
    return {
        restrict: 'E',
        template: '<div>{{user.name}}</div>',
        //templateUrl: 'path/template.tpl.html'
        scope: {
            user: '=data'
        },
        replace: true
    };
});

/**************************************************
 FILTERS
****************************************************/
app.filter("myFilter", function() {
    return function(input) {
        return input.toUpperCase();
    }
});


/**************************************************
 PROMISE RETURNS
****************************************************/
app.factory("factory_promise", function($http, $q) {
    var obj = {};
    obj.getLanguage = function() {
        var defer = $q.defer();
        $http.get('language.json')
            .then(function(response) {
                console.log("response", response);
                var languages = response.data.map(function(item) {
                    return item.name;
                });
                defer.resolve(languages);
            })
            .catch(function(response) {
                console.log("response ERRRRR", response);
                defer.reject(response);
            }); 
        return defer.promise;
    };
    obj.setLanguage = function() {

    }
    return obj;

});

/**************************************************
 BROADCAST and LISTENERS
****************************************************/

app.factory("brodcastService", function($rootScope){
    
    var service = {}
    service.setBroadCast = function(user){
        $rootScope.$broadcast("global.broadcast", user);
    }
    return service;
});















