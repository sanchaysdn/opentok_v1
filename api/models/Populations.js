'use strict';

var mongoose = require('mongoose');

var PopulationSchema = mongoose.Schema({
    disease_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease'
    },
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    totalPopulation: {
        type: String,
        required:true
    },
    populationUnderRisk: {
        type: String
    }
}, {
    timestamps: true
});

var Population = mongoose.model('Population', PopulationSchema);