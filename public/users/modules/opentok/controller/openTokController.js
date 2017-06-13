"use strict";

angular.module('OpenTok', [])
var iotiedApp = angular.module('opentok.controller', []);
iotiedApp.controller('openTokController', ['$scope', 'openTokService', 'OTSession', function($scope, openTokService, OTSession) {
    $scope.openTokSessionData = openTokService.createSession().get({}, function(response, err) {
        console.log('openTokSessionData response :: ', response);
        if (response.code === 200) {
            $scope.openTokSessionData = response.data;

            OTSession.init($scope.openTokSessionData.apiKey, $scope.openTokSessionData.sessionId, $scope.openTokSessionData.webrtcToken);
            $scope.streams = OTSession.streams;
        } else {
            $scope.openTokSessionData = {};
            console.log('Null :: ', err);
        }
    })
}])
