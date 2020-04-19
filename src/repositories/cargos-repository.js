'use strict';
const mongoose = require('mongoose');
const Cargos = mongoose.model('Cargos');

exports.get = async() => {
    const res = await Cargos.find({}, 'nome status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Cargos
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var cargos = new Cargos(data);
    await cargos.save();
}

exports.update = async(id, data) => {
    await Cargos
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Cargos
        .findOneAndRemove(id);
}
