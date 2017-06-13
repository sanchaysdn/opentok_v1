"use strict"

angular.module("Login").factory('dashboardService', ['$http', '$resource', function($http, $resource) {

    var getDashboardList = function() {
        return $resource('/api/getDashboardList', null, {
            get: {
                method: 'GET'
            }
        });
    }
    var getDashboardItem = function() {
        return $resource('/api/getDashboardItem', null, {
            save: {
                method: 'POST'
            }
        });
    }

    
    return {
        getDashboardList: getDashboardList,
        getDashboardItem: getDashboardItem
    }

}]);

