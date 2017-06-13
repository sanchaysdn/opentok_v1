"use strict"

angular.module("OpenTok").factory('openTokService', ['$http', '$resource', function($http, $resource) {
    var createSession = function() {
        return $resource('/api/v1/opentok/createSession', null, {
            get: {
                method: 'GET'
            }
        })
    }
    return {
        createSession: createSession
    }

}]);
