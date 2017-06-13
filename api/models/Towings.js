'use strict';

var mongoose = require('mongoose');

var TowingSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    company_name: {
        type: String,
        required:true
    },
    company_phone: {
        type: String,
        required:true
    },
    company_email: {
        type: String,
        required:true
    },
    helpline_number : {
        type: String,
        required:true
    },
    number_of_vehicles: {
        type: String,
        required:true
    },
    service_type: {
        type: String,
        required:true
    },
    owner_name: {
        type: String,
        required:true
    },
    address: {
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
    },
    country: {
        type: String,
        required:true
    },
    zip_code: {
        type: String,
        required:true
    },
    status: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

var Towing = mongoose.model('Towing', TowingSchema);