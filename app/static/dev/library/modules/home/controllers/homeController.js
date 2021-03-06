(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';

    angular.module('home.controller', [])

    .controller('homeController', function($scope, $state, $templateCache, $timeout, growl, ngTableParams, homeService) {
        $scope.prod = {};

        $scope.productSelected = '';

        $scope.productTypes = [
            {name: 'Anything', value:''},
            {name: 'Beer', value:'Beer'},
            {name: 'Cider', value:'Cider'},
            {name: 'Coolers and Cocktails', value:'Coolers and Cocktails'},
            {name: 'Spirits', value:'Spirits'},
            {name: 'Wine', value:'Wine'}
        ];

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
            for(var i=$scope.products.length;i--;) {
                $scope.prod[$scope.products[i].id.$oid] = {open: false};
            }
        }, function(r) {
            growl.addErrorNotification(r.data.error);
        })

        $scope.product = function(p_id) {
            if(!$scope.prod[p_id.$oid].open && !$scope.prod[p_id.$oid].data) {
                homeService.one(p_id.$oid).then(function(r) {
                    $timeout(function() {
                        $scope.prod[p_id.$oid].data = r.data.result.data;                        
                    }, 250);
                    $scope.prod[p_id.$oid].open = true;
                }, function(r) {
                    console.log('error ::: ', r);
                });
            } else if(!$scope.prod[p_id.$oid].open && $scope.prod[p_id.$oid].data) {
                $scope.prod[p_id.$oid].open = true;
            } else {
                $scope.prod[p_id.$oid].open = false;
            }
        };
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));
