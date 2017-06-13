'use strict';

var mongoose = require('mongoose');

var PatientVitalSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    body_temperature: {
        type: String,
        required:true
    },
    pulse_rate: {
        type: String,
        required:true
    },
    bloodPressure: [{     
        minValue: {
            type: String,
            required:true
        },
        maxValue: {
            type: String,
            required:true
        }
    }],
    po2: {
        type: String,
        required:true
    }
}, {
    timestamps: true
});

var PatientVital = mongoose.model('PatientVital', PatientVitalSchema);