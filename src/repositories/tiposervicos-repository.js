'use strict';
const mongoose = require('mongoose');
const TipoServicos = mongoose.model('TipoServicos');

exports.get = async() => {
    const res = await TipoServicos.find({}, 'nome status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await TipoServicos
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var tiposervicos = new TipoServicos(data);
    await tiposervicos.save();
}

exports.update = async(id, data) => {
    await TipoServicos
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await TipoServicos
        .findOneAndRemove(id);
}
