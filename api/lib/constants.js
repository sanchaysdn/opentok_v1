/*
 * Constant messages are declared here
 * Constants - Constants.js
 * Author: smartData Enterprises
 * Created by Sunny
 * Date: 8 June 2017
 */
const config = {
    "cryptoAlgorithm": "aes-256-ctr",
    "cryptoPassword": 'd6F3Efeq'
}

const messages = {
    "loginSuccess": "Logged in successfully",
    "signupSuccess": "Signup successfully, please check you email to activate your account",
    "dataRetrievedSuccess": "Data retrieved successfully",
    "errorRetreivingData": "Error in retrieving data",
    "noDataFound": "No Data Found",
    "logoutSuccess": "Successfully logout",
    "successInChangePassword": "Password changed successfully",
    "forgotPasswordSuccess": "Password sent successfully, please check your mail",
    "patientCreatedSuccess": "Patient created successfully",
    "patientsGetSuccessfully":"Patients get successfully",
    "prescribeMedicationSuccess":"Prescribed medication successfully",
    "prescribeMedicationFailed":"Prescribed medication failed",
    "orderLabTestSuccess":"Lab test ordered successfully",
    "orderLabTestFailed" :"Order lab test failed",
    "patientDemographicAddedSuccess":"Patient demographic added Successfully",
    "patientDemographicAddedFailed" :"Patient demographic added failed",
    "patientInsuranceAddedSuccess":"Patient insurance added successfully",
    "patientInsuranceAddedFailed":"Patient insurance added failed",
    "patientVitalsAddedSuccess":"Patient vitals added successfully",
    "patientVitalsAddedFailed":"Patient vitals added failed",
    "patientEncounterAddedSuccess":"Patient encounter added successfully",
    "patientEncounterAddedFailed":"Patient encounter added failed",
    "patientMedicationAddedSuccess":"Patient medication added successfully",
    "patientMedicationAddedFailed":"Patient medication added failed",
    "patientDiseaseAddedFailed":"Patient disease added failed",
    "patientDiseaseAddedSuccess":"Patient disease added successfully",
    "DeviceAddedSuccess":"Patient device added successfully",
    "patientDeviceGettingSuccess":"Successfully get the patient device"
} 

const validationMessages = {
    "emailAlreadyExist": "Email Id already exist, try with another",
    "diseaseAlreadyExist": "Disease already exist, try with another",
    "usernameAlreadyExist": "Username already exist, try with another",
    "emailRequired": "Email is required",
    "firstnameRequired": "First name is required",
    "passwordRequired": "Password is required",
    "invalidEmail": "Invalid Email Given",
    "invalidEmailOrPassword": "Invalid email or password",
    "internalError": "Internal error",
    "requiredFieldsMissing": "Required fields missing",
    "emailNotExist": "Email doesn't exist",
    "userNotFound": "User not found",
    "passwordNotMatch" : "New password should not be same as old password",
    "noRecordFound": "No record found",
    "paymentNotComplete": "Product payment not completed yet",
    "pageNotFound": "Page not found",
    "patientCreatedFailed":"Patient created failed"
}

const emailSubjects = {
    "forgotPassword": "Forgot password"
}

var obj = {
    config: config,
    messages: messages,
    validationMessages: validationMessages,
    emailSubjects: emailSubjects
};
module.exports = obj;
