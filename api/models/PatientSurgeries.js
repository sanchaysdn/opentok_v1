'use strict';

var mongoose = require('mongoose');

var PatientSurgerySchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    surgery: {
        type: String,
        required:true
    },
    surgery_date: {
        type: Date,
        required:true
    },
    Physician: {
        type: String,
        required:true
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

var  PatientSurgery = mongoose.model(' PatientSurgery', PatientSurgerySchema);