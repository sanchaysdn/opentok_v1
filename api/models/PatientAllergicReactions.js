'use strict';

var mongoose = require('mongoose');

var PatientAllergicReactionSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    Substance: {
        type: String,
        required:true
    },
    reaction: {
        type: String,
        required:true
    },
    severity: {
        type: String,
        required:true
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

var PatientAllergicReaction = mongoose.model('PatientAllergicReaction', PatientAllergicReactionSchema);