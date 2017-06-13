/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
iotiedApp.factory("logger", [function() {
    var logIt;
    return toastr.options = {
            closeButton: true,
            preventDuplicates: true,
            positionClass: "toast-top-right",
            onclick: null,
            timeOut: "3000",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        },

        logIt = function(message, type, timeOut) {
            if (timeOut) {
                toastr.options.timeOut = timeOut;
                toastr.options.extendedTimeOut = timeOut;
                toastr.options.tapToDismiss = false;
            } else {
                toastr.options.tapToDismiss = true;
            }
            return toastr[type](message)
        },
        clear = function() {
            toastr.clear();
        }, {
            log: function(message) {
                logIt(message, "info")
            },
            logWarning: function(message) {
                logIt(message, "warning")
            },
            logSuccess: function(message) {
                logIt(message, "success")
            },
            logError: function(message, timeOut) {
                logIt(message, "error", timeOut)
            },
            clear: function() {
                clear();
            }
        }
}])
