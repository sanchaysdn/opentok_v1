'use strict';
/*
 * Utility - utility.js
 * Author: smartData Enterprises
 * Created by Sunny
 * Date: 8 June 2017
 */
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var constantsObj = require('./constants'); 
var crypto = require('crypto'),
    algorithm = constantsObj.config.cryptoAlgorithm,
    password = constantsObj.config.cryptoPassword;
var fs = require("fs");
var path = require('path');
var config = require('../../config/config.js');
var async = require('async');

var utility = {};

 /**
 * Basic function of encryption 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 8-June-2017
 */
function encrypt(encText){
  var cipher = crypto.createCipher(algorithm,password)
  var encText = cipher.update(encText,'utf8','hex')
  encText += cipher.final('hex');
  return encText;
}

 /**
 * Basic function of decryption 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 8-June-2017
 */
function decrypt(decText){
  var decipher = crypto.createDecipher(algorithm,password)
  var decText = decipher.update(decText,'hex','utf8')
  decText += decipher.final('utf8');
  return decText;
}

/**
 * Function is use to validation in error handler 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 8-June-2017
 */
utility.validationErrorHandler = function(err) {
    var errMessage = constantsObj.validationMessages.internalError;
    if (err.errors) {
        for (var i in err.errors) {
            errMessage = err.errors[i].message;
        }
    }
    return errMessage;
}

 /**
 * Function is use to encrypt records 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 8-June-2017
 */
  utility.encryptedRecord = function encryptedRecord(data,field,callback) {
    var patientObj = {};
    var fields = [];
    if(field.length>0){
       for(var i=0; i<field.length; i++){
        fields.push(field[i]);
       };
    }    
    for (var key in data) {
       if(fields.indexOf(key) == -1){
          if(data[key]){
             if(data[key] instanceof Array){
                 if (data[key].length > 0) {
                      patientObj[key]=[];
                        for (let j = 0; j < data[key].length; j++) {
                          
                           patientObj[key][j]={};

                          if (typeof (data[key][j]) == 'object') {

                            for (var arrObjkey in data[key][j]) {

                              // console.log(arrObjkey,Object.keys(data[key][j]).length,"fdss");
                              if (fields.indexOf(arrObjkey) == -1) {
                                if (data[key][j][arrObjkey]) {
                                  // console.log('here',patientObj[key]);
                                 
                                  patientObj[key][j][arrObjkey] = encrypt(data[key][j][arrObjkey].toString());

                                }
                              } else {
                                patientObj[key][j][arrObjkey] = data[key][j][arrObjkey];  
                              }
                            }
                          } else if (typeof (result[key][j]) == 'string') {
                            patientObj[key][j] = encrypt(result[key][j].toString());  
                          }
                        }
                      } else {
                        patientObj[key] = data[key];      
                    }
             } else {
                 patientObj[key] = encrypt(data[key].toString());
             }  
          }      
        } else {
                  patientObj[key] = data[key];
        } 
           
    }
  callback(patientObj); 
}


/**
 * Function is use to decrypt records 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 8-June-2017
 */
utility.decryptedRecord = function decryptedRecord(data, field, callback1) {
   var newArr = [];
   var fields = ['_id','createdAt', 'updatedAt','is_deleted','status', '__v' ];
    if(field.length > 0) {
      for (var i = 0; i < field.length; i++) {
        fields.push(field[i]);
      };
    }
      async.each(data, function(result, callback) {
            var patientObj = {};
            for (var key in result) {
                if (fields.indexOf(key) == -1) {
                  if (result[key]) {
                    if (result[key] instanceof Array) {
                      if (result[key].length > 0) {
                        patientObj[key]=[];
                        for (let j = 0; j < result[key].length; j++) {
                          patientObj[key][j]={};
                          if (typeof (result[key][j]) == 'object') {
                            for (var arrObjkey in result[key][j]) {
                              if (fields.indexOf(arrObjkey) == -1) {
                                if (result[key][j][arrObjkey]) {
                                  patientObj[key][j][arrObjkey] = decrypt(result[key][j][arrObjkey].toString());  
                                }
                              } else {
                                patientObj[key][j][arrObjkey] = result[key][j][arrObjkey];  
                              }
                            }
                          } else if (typeof (result[key][j]) == 'string') {
                            patientObj[key][j] = decrypt(result[key][j].toString());  
                          }
                        }
                      } else {
                        patientObj[key] = result[key];      
                      }

                    } else {
                      patientObj[key] = decrypt(result[key].toString());
                    }
                  }
                } else {
                  patientObj[key] = result[key];
                }
              }    
                  newArr.push(patientObj);
                  callback(null);
            }, function(err) {
              callback1(newArr)
            });
}

module.exports = utility;
