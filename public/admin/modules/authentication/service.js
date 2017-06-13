'use strict'

angular.module('Authentication')

.factory('AuthenticationService', ['communicationService', '$rootScope',
    function(communicationService, $rootScope) {
        var service = {};
        service.Login = function(inputJsonString, callback) {
            communicationService.resultViaPost(webservices.authenticate, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
                callback(response.data);
            });
        };
        service.resendPassword = function(inputJsonString, callback) {
            communicationService.resultViaPost(webservices.forgotPassword, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
                callback(response.data);
            });
        }
        return service;
    }
])
