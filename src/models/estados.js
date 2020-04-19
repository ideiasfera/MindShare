'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstadosSchema = new Schema({
    pais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pais'
    },
	estadocidade: {
        type: String,
        required: true,
        unique: true
	},
    estado: {
        type: String,
        required: true
    },
    cidades: {
        type: String,
        required: true
    },
    zonas: {
        type: String,
        required: true
    },
    bairros: {
        type: String,
        required: true
    },
    sigla: {
        type: String,
        required: true
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

module.exports = mongoose.model('Estados', EstadosSchema);
