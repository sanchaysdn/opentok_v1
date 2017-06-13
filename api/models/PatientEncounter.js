'use strict';

var mongoose = require('mongoose');

var PatientEncounterSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    encounter_date: {
        type: Date,
        required:true
    },
    hospital: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    zip_code: {
        type: String,
        required:true
    },
    country: {
        type: String,
        required:true
    },
    diagnosis: {
        type: Array,
        default:[]  
    },
    provider: {
        type: String
    }
}, {
    timestamps: true
});

var PatientEncounter = mongoose.model('PatientEncounter', PatientEncounterSchema);