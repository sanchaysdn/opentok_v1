'use strict';

var mongoose = require('mongoose');

var LabTestSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
   clinician_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinician'
    },
    to: {
        type: String
    },
    from: {
        type: String
    },
    cc: {
        type: String
    },
    subject: {
        type: String
    },
    description: {
        type: String
    },
    lab_name: {
        type: String
    },
    lab_address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip_code: {
        type: String
    },
    country: {
        type: String
    }
}, {
    timestamps: true
});

var LabTest = mongoose.model('LabTest', LabTestSchema);