'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemasSchema = new Schema({
    unidades: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unidades'
    },
    tiposervicos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoServicos'
    },
    tipoequipamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoEquipamentos'
    },
    profissionais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profissionais'
    },
    numerodeserie: {
        type: String,
        required: true,
        unique: true
    },
    fabricante: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    laudoprevio: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    tipos: [{
        type: String,
        required: true
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

module.exports = mongoose.model('Problemas', ProblemasSchema);
