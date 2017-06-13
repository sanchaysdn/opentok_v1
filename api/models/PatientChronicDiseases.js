'use strict';

var mongoose = require('mongoose');

var PatientChronicDiseaseSchema = mongoose.Schema({
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
    condition: {
        type: String,
        required:true
    },
    status: {
        type: String
    },
}, {
    timestamps: true
});

var PatientChronicDisease = mongoose.model('PatientChronicDisease', PatientChronicDiseaseSchema);