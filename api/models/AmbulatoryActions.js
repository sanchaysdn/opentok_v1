'use strict';

var mongoose = require('mongoose');

var AmbulatoryActionSchema = mongoose.Schema({
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    message_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    care_provider: {
        type: String
    },
    vehicle_number: {
        type: String,
        required:true
    },
    admit_to: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    is_admitted: {
        type: Boolean,
        default:false
    },
    is_confirmed_by_hospital: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

var AmbulatoryAction = mongoose.model('AmbulatoryAction', AmbulatoryActionSchema);