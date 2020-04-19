'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipoEquipamentosSchema = new Schema({
    unidades: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unidades'
    },
	tee: {
        type: String,
        required: true,
        unique: true
	},
    nome: {
        type: String,
        required: true
    },
    equipamento: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    fabricante: {
        type: String,
        required: true
    },
    modelo: {
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

module.exports = mongoose.model('TipoEquipamentos', TipoEquipamentosSchema);
