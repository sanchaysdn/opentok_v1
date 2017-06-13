"use strict"

angular.module("Home")

.factory('HomeService', ['$http', 'communicationService', '$resource', function($http, communicationService, $resource) {

    var getCounts = function() {
        return $resource('/api/dashboardCount', null, {
            get: {
                method: 'GET'
            }
        });
    }

    return {
        getCounts: getCounts
    }

}]);
