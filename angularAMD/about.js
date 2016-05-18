/*define([], function () {
    // controller
    /!*    return ["$scope", function ($scope) {
     // properties
     $scope.title = "This is About page";
     }];*!/
    app.controller('aboutCtrl', function ($scope) {
        $scope.title = "This is About page";
    });
});*/
define(function (require){
    var appController = require('app');
    appController.controller('aboutCtrl', function ($scope) {
        $scope.title = "This is About page";
    });
})