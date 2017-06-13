"use strict"

angular.module("Units")

.factory('UnitService', ['$http', 'communicationService', '$resource', function($http, communicationService, $resource) {

    var getUnitList = function() {
        return $resource(webservices.getUnitList, null, {
            get: {
                method: 'GET'
            }
        });
    }
    var addUnit = function() {
        return $resource(webservices.addUnit, null, {
            save: {
                method: 'POST'
            }
        });
    }
    var getUnitById = function() {
        return $resource(webservices.getUnitById, null, {
            get: {
                method: 'GET',
                id: '@id'
            }
        });
    }
    var changeUnitStatus = function() {
        return $resource(webservices.changeUnitStatus, null, {
            save: {
                method: 'POST'
            }
        });
    }
    var updateUnit = function() {
        return $resource(webservices.updateUnit, null, {
            save: {
                method: 'POST',
            }
        });
    }

    var deleteUnit = function() {
        return $resource(webservices.deleteUnitById, null, {
            delete: {
                method: 'DELETE',
                id: '@id'
            }
        });
    }
    return {
        getUnitList: getUnitList,
        addUnit: addUnit,
        getUnitById: getUnitById,
        updateUnit: updateUnit,
        changeUnitStatus: changeUnitStatus,
        deleteUnit: deleteUnit
    }

}]);