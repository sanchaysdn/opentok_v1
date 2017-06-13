'use strict';

var mongoose = require('mongoose');

var DeviceSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    coordinator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coordinator'
    },
    clinician_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinician'
    },
    added_by: {
        type: String
    },
    deviceName: {
        type: String,
        required:true
    },
    deviceType: {
        type: String,
        required:true
    },
    make: {
        type: String,
        required:true
    },
    model: {
        type: String,
        required:true
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    DateDevice_Added: {
        type: Date
    },
    DataDevice_Deleted: {
        type: Date
    },
    DataDevice_Edited: {
        type: Date
    },
    reason: {
        type: String
    },
    status: {
        type: Boolean,
        default:false
    },
    is_deleted: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

var Device = mongoose.model('Device', DeviceSchema);