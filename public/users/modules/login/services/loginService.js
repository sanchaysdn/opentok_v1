"use strict"

angular.module("Login")

.factory('loginService', ['$http', '$resource', function($http, $resource) {

    var login = function() {
        return $resource('/api/v1/auth/login', null, {
            'save': {
                method: 'POST'
            }
        });
    }

    return {
        login: login,
    }

}]);
