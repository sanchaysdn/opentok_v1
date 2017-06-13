'use strict';

var mongoose = require('mongoose');

var RoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   description: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Role = mongoose.model('Role', RoleSchema);