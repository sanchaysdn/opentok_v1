'use strict';

var mongoose = require('mongoose');

var PatientMedicationSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    medication: {
        type: Array,
        default:[]
    },
    start_date: {
        type: Date,
        required:true
    },
    stop_date: {
        type: Date,
        required:true
    },
    status: {
        type: String
    },
    prescribed_by: {
        type: String,
        required:true
    },
    refill_date: {
        type: Date
    }
}, {
    timestamps: true
});

var PatientMedication = mongoose.model('PatientMedication', PatientMedicationSchema);