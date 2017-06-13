'use strict';

var mongoose = require('mongoose');

var ConversationSchema = mongoose.Schema({
    from_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'From'
    },
    to_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'To'
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

var Conversation = mongoose.model('Conversation', ConversationSchema);