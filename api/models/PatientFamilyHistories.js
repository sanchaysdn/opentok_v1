'use strict';

var mongoose = require('mongoose');

var PatientFamilyHistorySchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    disease_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease'
    },
    start_date: {
        type: Date,
        required:true
    },
    stop_date: {
        type: Date,
        required:true
    },
    member_name: {
        type: String,
        required:true
    },
    relation: {
        type: String,
        required:true
    },
    type: {
        type: String,
        required:true
    },
    cause: {
        type: String,
        required:true
    },
    cause_of_death: {
        type: String,
        required:true
    }
}, {
    timestamps: true
});

var PatientFamilyHistory = mongoose.model('PatientFamilyHistory', PatientFamilyHistorySchema);