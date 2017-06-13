'use strict';

var mongoose = require('mongoose');

var PatientDemographicSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    SSN: {
        type: String,
        required:true
    },
    date_of_birth: {
        type: Date,
        required:true
    },
    gender: {
        type: String,
        required:true
    },
    race: {
        type: String,
        required:true
    },
    ethnicity: {
        type: String
    },
    preferred_language: {
        type: String,
        required:true
    },
    country: {
        type: String,
        required:true
    },
    street_address: {
        type: String,
        required:true
    },
    zip_code: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required:true
    }

}, {
    timestamps: true
});

var PatientDemographic = mongoose.model('PatientDemographic', PatientDemographicSchema);