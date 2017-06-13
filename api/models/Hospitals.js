'use strict';

var mongoose = require('mongoose');

var HospitalSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital_name: {
        type: String,
        required:true
    },
    contactNumber: {
        type: String,
        required:true
    },
    Address: {
        type: String,
        required:true
    },
    zipCode: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required:true
    }
}, {
    timestamps: true
});

var Hospital = mongoose.model('Hospital', HospitalSchema);