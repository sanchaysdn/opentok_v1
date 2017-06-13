'use strict';

var mongoose = require('mongoose');

var PatientAssesmentSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    question_options_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionOption'
    },
    is_deleted: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

var PatientAssesment = mongoose.model('PatientAssesment', PatientAssesmentSchema);