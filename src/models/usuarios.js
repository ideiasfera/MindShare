'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    id_tipo: {
        type: String,
		default: ''
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tipo: [{
        type: String,
        required: true,
        enum: ['mindshare', 'entidade', 'profissional'],
        default: 'profissional'
    }],
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

module.exports = mongoose.model('Usuarios', UsuariosSchema);
