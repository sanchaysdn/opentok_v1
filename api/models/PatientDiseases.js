'use strict';

var mongoose = require('mongoose');

var PatientDiseaseSchema = mongoose.Schema({
    disease_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Disease'
    },
    patient_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    datetime_diagnosed: {
        type: String
    },
    status: {
        type: String,
    }
}, {
    timestamps: true
});

var PatientDisease = mongoose.model('PatientDisease', PatientDiseaseSchema);