/**
 * Created by ־ǿ on 2016/7/23.
 */
angular.module('example.Filter',[]).filter('dayName', function () {
    var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return function (input) {
        return angular.isNumber(input) ? dayName[input % 7] : input;
    }
});