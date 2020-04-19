'use strict';
const mongoose = require('mongoose');
const Problemas = mongoose.model('Problemas');

exports.get = async() => {
    const res = await Problemas.find({}, 'unidades tiposervicos tipoequipamentos profissionais numerodeserie fabricante modelo titulo laudoprevio foto tipos status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Problemas
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var problemas = new Problemas(data);
    await problemas.save();
}

exports.update = async(id, data) => {
    await Problemas
        .findByIdAndUpdate(id, {
            $set: {
                unidades: data.unidades,
                tiposervicos: data.tiposervicos,
                tipoequipamentos: data.tipoequipamentos,
                profissionais: data.profissionais,
                numerodeserie: data.numerodeserie,
                fabricante: data.fabricante,
                modelo: data.modelo,
                titulo: data.titulo,
                laudoprevio: data.laudoprevio,
                foto: data.foto,
                tipos: data.tipos,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Problemas
        .findOneAndRemove(id);
}
