'use strict';

var mongoose = require('mongoose');

var TowingReqActionSchema = mongoose.Schema({
    towing_message_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TowingMessage'
    },
    driver: {
        type: String,
        required:true
    },
    vehicle_number: {
        type: String,
        required:true
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

var TowingReqAction = mongoose.model('TowingReqAction', TowingReqActionSchema);