'use strict';

var mongoose = require('mongoose');

var VideoCallRequestSchema = mongoose.Schema({
    request_from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    },
    request_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    },
    problem_description: {
        type: String,
        required:true
    },
    requested_at: {
        type:Date,
        required:true
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

var VideoCallRequest = mongoose.model('VideoCallRequest', VideoCallRequestSchema);