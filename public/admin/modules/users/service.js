"use strict"

angular.module("Users")

.factory('UserService', ['$http', 'communicationService', '$resource', function($http, communicationService, $resource) {

    var getUsersList = function() {
        return $resource('/api/getUserList', null, {
            get: {
                method: 'GET'
            }
        });
    }

    var getUserById = function() {
        return $resource('/api/getUserByIdAdmin/:id', null, {
            get: {
                method: 'GET',
                id: '@id'
            }
        });
    }

    var addUpdateUser = function() {
        return $resource('/api/addUpdateUser', null, {
            save: {
                method: 'POST'
            }
        });
    }

    var enableDisableUser = function() {
        return $resource('/api/enableDisableUser', null, {
            save: {
                method: 'POST'
            }
        });
    }

    var getUserBidList = function() {
        return $resource('/api/getUserBidListAdmin', null, {
            save: {
                method: 'POST'
            }
        });
    }    

    var changePassword = function() {
        return $resource('/api/changePassword', null, {
            save: {
                method: 'POST'
            }
        });
    }

    var adminProfileUpdate = function() {
        return $resource('/api/adminProfileUpdate', null, {
            save: {
                method: 'POST'
            }
        });
    }

    var updateUserPic = function() {
        return $resource('/api/updateUserPic', null, {
            save: {
                method: 'POST',
                headers: { 'Content-Type': undefined }
            }
        });
    }

    var deleteUser = function() {
        return $resource('/api/deleteUserById/:id', null, {
            delete: {
                method: 'DELETE',
                id: '@id'
            }
        });
    }
    return {
        getUsersList: getUsersList,
        addUpdateUser: addUpdateUser,
        updateUserPic: updateUserPic,
        getUserById: getUserById,
        deleteUser: deleteUser,
        enableDisableUser: enableDisableUser,
        changePassword: changePassword,
        adminProfileUpdate: adminProfileUpdate,
        getUserBidList: getUserBidList
    }

}]);
