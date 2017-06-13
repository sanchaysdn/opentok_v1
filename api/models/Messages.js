'use strict';

var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sender'
    },
   receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receiver'
    },
    message: {
        type: String,
        required:true
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

var Message = mongoose.model('Message', MessageSchema);