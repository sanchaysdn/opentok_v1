'use strict';

var mongoose = require('mongoose');

var PatientDeviceConfigSchema = mongoose.Schema({
    patient_id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    api_name: {
        type: String
    },
    accessToken: {
        type: String,
    },
    accessTokenSecret: {
        type: String,
    },
    withing_user_id: {
        type: String,
    }
}, {
    timestamps: true
});

var PatientDeviceConfig = mongoose.model('PatientDeviceConfig', PatientDeviceConfigSchema);