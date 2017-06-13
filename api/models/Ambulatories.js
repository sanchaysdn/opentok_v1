'use strict';

var mongoose = require('mongoose');

var AmbulatorySchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company_name: {
        type: String,
        required:true
    },
    vehicles: {
        type: String,
        required:true
    },
    vehicle_type: {
        type: String,
        required:true
    },
    contact_number: {
        type: String,
        required:true
    },
    helpline_number: {
        type: String,
        required:true
    },
    service_time: {
        type: Date
    },
    service_type: {
        type: String,
        required:true
    },
    country: {
        type: String,
        required:true
    },
    street_address: {
        type: String,
        required:true
    },
    zip_code: {
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
    status: {
        type: Boolean,
        default:false
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Ambulatory = mongoose.model('Ambulatory', AmbulatorySchema);