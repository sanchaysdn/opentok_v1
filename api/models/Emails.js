'use strict';

var mongoose = require('mongoose');

var EmailSchema = mongoose.Schema({
    from_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'From'
    },
    to_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'To'
    },
    message: {
        type: String
    },
    subject: {
        type: String
    },
    signature: {
        type: String
    },
    is_read: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Email = mongoose.model('Email', EmailSchema);