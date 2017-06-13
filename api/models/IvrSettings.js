'use strict';

var mongoose = require('mongoose');

var IvrSettingSchema = mongoose.Schema({
    ivr_label: {
        type: String,
    },
   language: {
        type: String
    },
    welcome_message: {
        type: String
    },
    verification_message: {
        type: String
    },
    system_id_message: {
        type: String
    },
    client_id: {
        type: String
    },
    task_code: {
        type: String
    },
    thankyou_message: {
        type: String
    },
    clockin_thankyou_message: {
        type: String
    },
    clockout_thankyou_message: {
        type: String
    },
    care_note_message: {
        type: String
    },
    actively_assigned_to: {
        type: String
    }
}, {
    timestamps: true
});

var IvrSetting = mongoose.model('IvrSetting', IvrSettingSchema);