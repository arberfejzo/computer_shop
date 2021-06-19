const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComputerSchema = new Schema({
    marka: {
        type: String,
        required: true
    },
    modeli: {
        type: String,
        required: true
    },
    versioni: {
        type: String,
        enum: ['Desktop', 'Laptop', 'All-in-One'],
        required: true
    },
    workstation: {
        type: String
    },
    oferte: {
        type: String
    },
    cmimi: {
        type: Number,
        min: 0,
        required: true
    },
    cpu: {
        type: String,
        required: true
    },
    memorjaRam: {
        type: Number,
        required: true
    },
    tipiRam: {
        type: String,
        required: true,
        enum: ['DDR3', 'DDR4', 'DDR5']
    },
    memorjaDisk: {
        type: Number,
        required: true
    },
    tipiDisk: {
        type: String,
        enum: ['HDD', 'SSD'],
        required: true
    },
    memorjaDisk2: {
        type: Number
    },
    tipiDisk2: {
        type: String,
        enum: ['HDD', 'SSD']
    },
    grafika: {
        type: String
    },
    image: {
        type: String
    },
    tekst: {
        type: String
    }

});

module.exports = mongoose.model('Computer', ComputerSchema);
