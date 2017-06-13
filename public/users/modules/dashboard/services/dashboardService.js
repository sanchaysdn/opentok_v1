"use strict"

angular.module("Dashboard")

.factory('dashboardService', ['$http', '$resource', function($http, $resource) {

    var connectWithing = function() {
        return $resource('/api/v1/withings/connect', null, {
            get: {
                method: 'GET'
            }
        });
    }
    var getDeviceList = function(){
        return $resource('/api/v1/api/getPatientDevice', null, {
            get: {
                method: 'GET'
            }
        });   
    }
    var addDevice = function() {
        return $resource('/api/v1/api/addPatientDevice', null, {
            save: {
                method: 'POST'
            }
        });
    }

	return {
        connectWithing: connectWithing,
        addDevice:addDevice,
        getDeviceList:getDeviceList
    }    

}]);

