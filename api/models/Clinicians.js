'use strict';

var mongoose = require('mongoose');

var ClinicianSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    first_name: {
        type: String,
        required:true
    },
    last_name: {
        type: String,
        required:true
    },
    specialization: {
        type: String
    },
    is_verified: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

var Clinician = mongoose.model('Clinician', ClinicianSchema);