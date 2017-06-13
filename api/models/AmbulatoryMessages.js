'use strict';

var mongoose = require('mongoose');

var AmbulatoryMessageSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    ambulatory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ambulatory'
    },
    risk_category: {
        type: String,
        required:true
    },
    reason: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    Ambulatory_message: {
        type: String,
        required:true
    },
    status: {
        type: String
    },
    confirmed_by_hospital: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var AmbulatoryMessage = mongoose.model('AmbulatoryMessage', AmbulatoryMessageSchema);