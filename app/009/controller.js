/**
 * Created by ־ǿ on 2016/7/23.
 */
var controllerModule=angular.module('example.Controller',[]);
controllerModule.controller("dayCtrl", ['$scope','days', function dayCtrl($scope, days) {
    $scope.day = days.today;
}]);
controllerModule.controller("tomorrowCtrl", ['$scope','days', function dayCtrl($scope, days) {
    $scope.day = days.tomorrow;
}]);