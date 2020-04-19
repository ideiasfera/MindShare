'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnidadesSchema = new Schema({
    entidades: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entidades'
    },
    estados: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estados'
    },
    tipounidades: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoUnidades'
    },
    especialidades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Especialidades'
    }],
    exames: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exames'
    }],
    nome: {
        type: String,
        required: true,
        unique: true
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
    diretor: {
        type: String,
        required: true
    },
    horario: {
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

module.exports = mongoose.model('Unidades', UnidadesSchema);
