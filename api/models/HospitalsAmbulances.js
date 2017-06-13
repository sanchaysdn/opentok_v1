'use strict';

var mongoose = require('mongoose');

var HospitalAmbulanceSchema = mongoose.Schema({
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    ambulatory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ambulatory'
    },
    hospital_name: {
        type: String,
        required:true
    },
    number_of_vehicles: {
        type: Number,
        required:true
    },
    status: {
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

var HospitalAmbulance = mongoose.model('HospitalAmbulance', HospitalAmbulanceSchema);