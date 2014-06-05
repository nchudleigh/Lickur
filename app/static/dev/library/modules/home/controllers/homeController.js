(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('home.controller', [])

    .controller('homeController', function($scope, $state, $templateCache, $timeout, growl, ngTableParams, homeService) {
        $scope.prod = {};

        $scope.pagination = {
            currentPage: 0,
            pageSize: 10,
            numberOfPages: function() {
                if($scope.products) {
                    return Math.ceil($scope.products.length/$scope.pagination.pageSize);
                }
            }
        };

        $scope.setPageSize = function(size) {
            $scope.pagination.pageSize = size;
        };

        homeService.all().then(function(r) {
            $scope.products = r.data.result.data;
            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: $scope.products.length,
                getData: function($defer, params) {
                    console.log($scope.products.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $defer.resolve($scope.products.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }, function(r) {
            growl.addErrorNotification(r.data.error);
        })

        $scope.product = function(p_id) {
            if(!$scope.prod[p_id.$oid] && !$scope.prod[p_id.$oid].open) {
                homeService.one(p_id.$oid).then(function(r) {
                    $scope.prod[p_id.$oid] = {
                        data: r.data.result.data,
                        open: true
                    }
                }, function(r) {
                    console.log('error ::: ', r);
                });
            } else {
                $('#'+p_id.$oid).empty();
                $scope.prod[p_id.$oid].open = false;
            }
        };
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));