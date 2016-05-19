/**
 * Created by henleyhuan on 2016/5/19.
 */
angular.module('sportsStoreAdmin')
    .constant('productUrl', "http:location:5500/products/")
    .config(function ($httpProvider) {
        $httpProvider.defaults.widthCredentials = true;
    })
    .controller('productCtrl', function ($scope, $resource, productUrl) {
        $scope.productsResource = $resource(productUrl + ":id", {id: "@id"});

        $scope.productList = function () {
            $scope.products = $scope.productsResource.query();
        }

        $scope.deleteProduct = function (product) {
            product.$delete().then(function () {
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        }

        $scope.createProduct = function (product) {
            new $scope.productsResource(product).$save().then(function (newProduct) {
                $scope.products.push(newProduct);
                $scope.editedProduct = null;
            })
        }

        $scope.updateProduct = function (product) {
            product.$save();
            $scope.editedProduct = null;
        }

        $scope.startEdit = function (product) {
            $scope.editedProduct = product;
        }

        $scope.cancelEdit = function () {
            $scope.editedProduct = null;
        }

        $scope.listProducts();
    })