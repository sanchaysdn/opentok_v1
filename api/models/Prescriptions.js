'use strict';

var mongoose = require('mongoose');

var PrescriptionSchema = mongoose.Schema({
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
    pharmacy_name: {
        type: String
    },
    patient_name: {
        type: String
    },
    patient_ssn: {
        type: String
    },
    delivery_address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zip_code: {
        type: String
    },
    contact_number: {
        type: String
    },
    medication: {
        type: Array
    }
}, {
    timestamps: true
});

var Prescription = mongoose.model('Prescription', PrescriptionSchema);