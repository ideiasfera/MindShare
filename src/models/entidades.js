'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntidadesSchema = new Schema({
    estados: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estados'
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

module.exports = mongoose.model('Entidades', EntidadesSchema);
