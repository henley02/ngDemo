/**
 * Created by jdd on 2016/9/22.
 */
angular.module("increment", [])
    .directive("increment", [function () {
        return {
            restrict: "E",
            scope: {
                value: '=value',
            },
            link: function (scope, element, attrs) {
                var button = angular.element("<button>").text("+");
                button.addClass("btn btn-primary btn-xs");
                element.append(button);
                button.on("click", function (event) {
                    scope.$apply(function () {
                        scope.value++;
                    })
                })
            }
        }
    }])