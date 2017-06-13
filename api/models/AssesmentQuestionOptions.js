'use strict';

var mongoose = require('mongoose');

var AssesmentQuestionOptionSchema = mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssesmentQuestion'
    },
   option_text: {
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

var AssesmentQuestionOption = mongoose.model('AssesmentQuestionOption', AssesmentQuestionOptionSchema);