(function(window, document, location, navigator, $, angular, undefined) {
    'use strict';
    
    angular.module('home.model', [])

    .factory('homeService', function($http) {
        return {
            all: function() {
                return $http({
                    method: 'GET'
                  , url: '/api/products'
                });
            },
            one: function(prod_id) {
                return $http({
                    method: 'GET'
                  , url: '/api/products/'+prod_id
                });
            }
        }
    })
    
;}(window, document, location, navigator, jQuery, angular, undefined));