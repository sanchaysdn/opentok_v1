'use strict';

var mongoose = require('mongoose');

var AssesmentQuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
   question_type: {
        type: String,
        required: true
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

var AssesmentQuestion = mongoose.model('AssesmentQuestion', AssesmentQuestionSchema);