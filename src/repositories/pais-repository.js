'use strict';
const mongoose = require('mongoose');
const Pais = mongoose.model('Pais');

exports.get = async() => {
    const res = await Pais.find({}, 'nome status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Pais
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var pais = new Pais(data);
    await pais.save();
}

exports.update = async(id, data) => {
    await Pais
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Pais
        .findOneAndRemove(id);
}
