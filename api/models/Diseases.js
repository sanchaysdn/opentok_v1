'use strict';

var mongoose = require('mongoose');

var DiseaseSchema = mongoose.Schema({
    diseaseName: {
        type: String,
        required:true
    },
    diseaseType: {
        type: String,
        required:true
    },
    ICD_code: {
        type: String,
        required:true
    },
    ICD_version: {
        type: String,
        required:true
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

var Disease = mongoose.model('Disease', DiseaseSchema);