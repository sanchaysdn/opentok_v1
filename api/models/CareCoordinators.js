'use strict';

var mongoose = require('mongoose');

var CareCoordinatorSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required:true
    },
    phone_number: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    is_verified: {
        type: Boolean,
        default:false
    },
    status: {
        type: Boolean,
        default:false
    },
    is_deleted: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

var CareCoordinator = mongoose.model('CareCoordinator', CareCoordinatorSchema);