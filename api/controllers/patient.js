'use strict';

var mongoose = require('mongoose'),
    Patient = mongoose.model('Patient'),
    co = require('co'),
    LabTest = mongoose.model('LabTest'),
    Prescription = mongoose.model('Prescription'),
    PatientDemographic = mongoose.model('PatientDemographic'),
    PatientInsurance = mongoose.model('PatientInsurance'),
    PatientVital = mongoose.model('PatientVital'),
    PatientEncounter = mongoose.model('PatientEncounter'),
    PatientMedication = mongoose.model('PatientMedication'),
    PatientDisease = mongoose.model('PatientDisease'),
    PatientFamilyHistory = mongoose.model('PatientFamilyHistory'),
    Device = mongoose.model('Device'),
    crypto = require('crypto'),
    utility = require('../lib/utility.js'),
    async = require('async'),
    constantsObj = require('../lib/constants');

module.exports = {
    addPatient: addPatient,
    updatePatient : updatePatient,
    getAllPatient: getAllPatient,
    prescribeMedication: prescribeMedication,
    orderLabTest: orderLabTest,
    addPatientDemographics : addPatientDemographics,
    addPatientInsuranceDetails : addPatientInsuranceDetails,
    addPatientVitals : addPatientVitals,
    addPatientEncounter : addPatientEncounter,
    addPatientMedication : addPatientMedication,
    addPatientDisease : addPatientDisease,
    addPatientDevice : addPatientDevice,
    getPatientDevice : getPatientDevice

};

/**
 * Function is use to Add Patient 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 6-June-2017
 */
function addPatient(req, res) {
    co(function*() {
        let savedData = yield Patient.findById(req.body._id);
        if (savedData) {
             savedData.primary_provider = req.body.primary_provider;
             savedData.first_name = req.body.first_name;
             savedData.middle_name = req.body.middle_name;
             savedData.last_name = req.body.last_name;
             savedData.title = req.body.title;
             savedData.status = req.body.status;
             savedData.suffix = req.body.suffix;
             savedData.image = req.body.image;
             let patientData = yield savedData.save();
             return res.json(Response(200, constantsObj.messages.patientCreatedSuccess, {}));
        }  
        else if(!savedData){
          var patientObj = {};
          var field = [];
          var obj = req.body;
            utility.encryptedRecord(obj,field,function(patientObj){
                console.log("patientobj-----",patientObj);
                var patient = new Patient(patientObj);
                patient.save(function (err, patient) {
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.patientCreatedSuccess,
                    data: patient
                    });
                  }

                });
        })
      }else{
      return res.json(Response(402,constantsObj.validationMessages.patientCreatedFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402,utility.validationErrorHandler(err), err));

    });
} 

/**
 * Function is use to Get Patient List
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 6-june-2017
 */   
function getAllPatient(req, res) {
  console.log(' i m here');
  Patient.find({}).lean().exec(function (err, patient) {
    if (err) {
      res.json({
        code: 404,
        message: utility.validationErrorHandler(err)
      });
    } else if (patient) {
      var newArr = [];
      var filed = [];
      utility.decryptedRecord(patient, filed, function(newArr){
          res.json({
                code: 200,
                message: constantsObj.messages.patientsGetSuccessfully,
                data: newArr
          })
      })   
      } else {
          res.json({
          code: 404,
          message: constantsObj.messages.noDataFound
          })
      }
  }).catch(function (err) {
     return res.json(Response(402,utility.validationErrorHandler(err), err));
  })
}


 /**
 * Function is use to Prescribe Medication to Patient 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 8-June-2017
 */
function prescribeMedication(req, res) {
    co(function*() {
        let savedData = yield Prescription.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            console.log(req.body);
            var prescriptionObj = {};
            var field = [];
            var obj = req.body;
            
            utility.encryptedRecord(obj,field,function(prescriptionObj){
                console.log("prescriptionObj-----",prescriptionObj);
                var patient = new Prescription(prescriptionObj);
                patient.save(function (err, prescription) {
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.prescribeMedicationSuccess,
                    data: prescription
                    });
                  }

                });
        })
      }else{
      return res.json(Response(402, constantsObj.validationMessages.prescribeMedicationFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
}

 /**
 * Function is use to Order Lab Test for Patient 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 9-June-2017
 */
function orderLabTest(req, res) {
    co(function*() {
        let savedData = yield LabTest.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            var labTestObj = {};
            var field = [];
            var obj = req.body;
            
            utility.encryptedRecord(obj,field,function(labTestObj){
                console.log("labTestObj-----",labTestObj);
                var test = new LabTest(labTestObj);
                test.save(function (err, labTest) {
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.orderLabTestSuccess,
                    data: labTest
                    });
                  }

                });
        })
      }else{
      return res.json(Response(402, constantsObj.validationMessages.orderLabTestFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
} 


/**
 * Function is use to Add Patient Demographics 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 9-June-2017
 */
function addPatientDemographics(req, res) {
    co(function*() {
        let savedData = yield PatientDemographic.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            var demographicObj = {};
            var field = ['date_of_birth'];
            var obj = req.body;
            
            utility.encryptedRecord(obj,field,function(demographicObj){
                console.log("demographicObj-----",demographicObj);
                var demographic = new PatientDemographic(demographicObj);
                demographic.save(function (err, demographics) {
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.patientDemographicAddedSuccess,
                    data: demographics
                    });
                  }

                });
        })
      }else{
      return res.json(Response(402, constantsObj.validationMessages.patientDemographicAddedFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
} 

/**
 * Function is use to Add Patient Insurance Details 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 9-June-2017
 */
function addPatientInsuranceDetails(req, res) {
    co(function*() {
        let savedData = yield PatientInsurance.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            var insuranceObj = {};
            var field = ['card_issue_date','card_expiry_date'];
            var obj = req.body;
            
            utility.encryptedRecord(obj,field,function(insuranceObj){
                console.log("insuranceObj-----",insuranceObj);
                var patientInsurane = new PatientInsurance(insuranceObj);
                patientInsurane.save(function (err, insurance) {
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.patientInsuranceAddedSuccess,
                    data: insurance
                    });
                  }

                });
        })
      }else{
      return res.json(Response(402, constantsObj.validationMessages.patientInsuranceAddedFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
}

/**
 * Function is use to Add Patient Vitals 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 9-June-2017
 */
function addPatientVitals(req, res) {
    co(function*() {
        let savedData = yield PatientVital.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            var vitalsObj = {};
            var field = [];
            var obj = req.body;
            
            utility.encryptedRecord(obj,field,function(vitalsObj){
                console.log("vitalsObj-----",vitalsObj);
                var patientVitals = new PatientVital(vitalsObj);
                patientVitals.save(function (err, vitals) {
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.patientVitalsAddedSuccess,
                    data: vitals
                    });
                  }

                });
        })
      }else{
      return res.json(Response(402, constantsObj.validationMessages.patientVitalsAddedFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
} 

/**
 * Function is use to Add Patient Encounter 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 9-June-2017
 */
function addPatientEncounter(req, res) {
    co(function*() {
        let savedData = yield PatientEncounter.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            var encounterObj = {};
            var field = ['encounter_date'];
            var obj = req.body;
            
            utility.encryptedRecord(obj,field,function(encounterObj){
                console.log("encounterObj-----",encounterObj);
                var patientEncounter = new PatientEncounter(encounterObj);
                patientEncounter.save(function (err, encounter) {
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.patientEncounterAddedSuccess,
                    data: encounter
                    });
                  }

                });
        })
      }else{
      return res.json(Response(402, constantsObj.validationMessages.patientEncounterAddedFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
}

/**
 * Function is use to Add Patient Medication 
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 9-June-2017
 */
function addPatientMedication(req, res) {
    co(function*() {
        let savedData = yield PatientMedication.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            var medicationObj = {};
            var field = ['start_date','stop_date','refill_date'];
            var obj = req.body;
            
            utility.encryptedRecord(obj,field,function(medicationObj){
                console.log("medicationObj-----",medicationObj);
                var patientMedication = new PatientMedication(medicationObj);
                patientMedication.save(function (err, medication) {
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.patientMedicationAddedSuccess,
                    data: medication
                    });
                  }

                });
        })
      }else{
      return res.json(Response(402, constantsObj.validationMessages.patientMedicationAddedFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
} 

/**
 * Function is use to Add Patient Disease  
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 9-June-2017
 */
function addPatientDisease(req, res) {
    co(function*() {
        let savedData = yield PatientDisease.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            var diseaseObj = {};
            var patientDiseaseArray = [];
            var field = ['datetime_diagnosed','disease_id'];
            console.log(req.body);
            
            async.each(req.body,function(obj,callback){
                utility.encryptedRecord(obj,field,function(diseaseObj){
                console.log("diseaseObj-----",diseaseObj);
                var patientDisease = new PatientDisease(diseaseObj);
                patientDisease.save(function (err, disease){
                if (err) {
                  res.json({
                  code: 404,
                  message: utility.validationErrorHandler(err)
                });
                  console.log(err)
                } else {
                    res.json({
                    code: 200,
                    message: constantsObj.messages.patientDiseaseAddedSuccess,
                    data: disease
                    });
                  }

                });
           })
          })
           return res.json({
                    code: 200,
                    message: constantsObj.messages.patientDiseaseAddedSuccess,
                    data: disease
                    }); 
      }else{
      return res.json(Response(402, constantsObj.validationMessages.patientDiseaseAddedFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
}

/**
 * Function is use to Update Patient Data
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 6-June-2017
 */
function updatePatient(req, res) {
    co(function*() {
        let patientData = yield Patient.findById(req.body._id);
        if (patientData) {
            let savedData = yield patientData.save();
            return res.json(Response(200, constantsObj.messages.patientUpdatedSuccess, {}));
        } else {
            return res.json(Response(402, constantsObj.validationMessages.patientUpdatedFailed, err));    
        }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
}

/**
 * Function is use to Add Patient Device
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 10-June-2017
 */
function addPatientDevice(req, res) {
    co(function*() {
        let savedData = yield Device.findById(req.body._id);
        if (savedData) {
        }  
        else if(!savedData){
            var deviceObj = {};
            var field = [];
            var obj = req.body;
            
            utility.encryptedRecord(obj,field,function(deviceObj){
                console.log("deviceObj-----",deviceObj);
                Patient.findOne({user_id:req.user.id}).exec(function (err, patient) {
                    if (err) {
                      res.json({
                        code: 404,
                        message: utility.validationErrorHandler(err)
                      });    
                    }else{
                          deviceObj.patient_id = patient._id;
                          console.log('deviceObj',deviceObj);
                          var device = new Device(deviceObj);
                          device.save(function (err, device) {
                          if (err) {
                            res.json({
                              code: 404,
                              message: utility.validationErrorHandler(err)
                            });
                            console.log(err)
                          } else {
                              res.json({
                              code: 200,
                              message: constantsObj.messages.DeviceAddedSuccess,
                              data: device
                              });
                            }

                          });
                    }
                });

                
        })
      }else{
      return res.json(Response(402, constantsObj.validationMessages.patientMedicationAddedFailed, err));
    }
    }).catch(function(err) {
        return res.json(Response(402, utility.validationErrorHandler(err), err));
    });
} 

/**
 * Function is use to Get Patient Device  
 * @access private
 * @return json
 * Created by Sunny
 * @smartData Enterprises (I) Ltd
 * Created Date 10-June-2017
 */
function getPatientDevice(req, res) {
  Device.find({}).lean().exec(function (err, device) {
    if (err) {
      res.json({
        code: 404,
        message: utility.validationErrorHandler(err)
      });
    } else if (device) {
      var newArr = [];
      var filed = ['patient_id'];
      utility.decryptedRecord(device, filed, function(newArr){
          res.json({
                code: 200,
                message: constantsObj.messages.patientDeviceGettingSuccess,
                data: newArr
          })
      })   
      } else {
          res.json({
          code: 404,
          message: constantsObj.messages.noDataFound
          })
      }
  }).catch(function (err) {
     return res.json(Response(402,utility.validationErrorHandler(err), err));
  })
}