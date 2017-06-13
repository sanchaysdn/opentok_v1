'use strict';

var mongoose = require('mongoose');

var PatientInsuranceSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    insurance_company: {
        type: String,
        required:true
    },
    insurance_id_no: {
        type: String,
        required:true
    },
    group_number: {
        type: String,
        required:true
    },
    group_name: {
        type: String,
        required:true
    },
    plan_name: {
        type: String,
        required:true
    },
    plan_type: {
        type: String,
        required:true
    },
    card_issue_date: {
        type: Date,
        required:true
    },
    card_expiry_date: {
        type: Date,
        required:true
    }
}, {
    timestamps: true
});

var PatientInsurance = mongoose.model('PatientInsurance', PatientInsuranceSchema);