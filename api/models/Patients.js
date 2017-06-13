'use strict';

var mongoose = require('mongoose');


var PatientSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    clinician_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Clinician'
    },
    coordinator_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator'
    },
    title: {
        type: String
    },
    first_name: {
        type: String,
        required:true
    },
    middle_name: {
        type: String,
        required:true
    },
    last_name: {
        type: String,
        required:true
    },
    primary_provider: {
        type: String,
        required:true
    },
    suffix: {
        type: String,
        required:true
    },
    image: {
        type: String
    },
    reports_documents: {
        type: Array,
        default:[]
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

var Patient = mongoose.model('Patient', PatientSchema);