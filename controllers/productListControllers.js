/**
 * Created by ־ǿ on 2016/4/20.
 */
angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")
    .constant("productListPageCount", 3)
    .controller("productListCtrl", function ($scope, $filter, productListActiveClass, productListPageCount, cart) {
        var selectedCategory = null;
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;
        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }
        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        }
        $scope.categoryFilterFn = function (product) {
            //console.log(product.category)
            //console.log(selectedCategory == null || product.category == selectedCategory);
            return selectedCategory == null || product.category == selectedCategory;
        }
        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        }
        $scope.getPageClass = function (page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }
        $scope.addProductToCart = function (product) {
            cart.addProduct(product.id, product.name, product.price);
        }
    });