'use strict';

var mongoose = require('mongoose');

var TowingMessageSchema = mongoose.Schema({
    towing_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Towing'
    },
    message: {
        type: String,
        required:true
    },
    tow_from: {
        type: String,
        required:true
    },
    tow_to: {
        type: String,
        required:true
    },
    service_type : {
        type: String,
        required:true
    },
    contact_no: {
        type: String,
        required:true
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

var TowingMessage = mongoose.model('TowingMessage', TowingMessageSchema);