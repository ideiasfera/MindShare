'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CargosSchema = new Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    datahoracadastro: {
        type: Date,
        required: true,
        default: Date.now
    },
    datahoraatualizado: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Cargos', CargosSchema);
