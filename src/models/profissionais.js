'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfissionaisSchema = new Schema({
    unidades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unidades'
    }],
    cargos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cargos'
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefone: {
        type: String,
        required: true,
        unique: true
    },
    endereco: {
        type: String,
        required: true
    },
    tipo: [{
        type: String,
        required: true,
        enum: ['unidade', 'voluntario', 'tercerizado'],
        default: 'unidade'
    }],
    status: {
        type: String,
        required: true
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

module.exports = mongoose.model('Profissionais', ProfissionaisSchema);
