'use strict';
const mongoose = require('mongoose');
const TipoUnidades = mongoose.model('TipoUnidades');

exports.get = async() => {
    const res = await TipoUnidades.find({}, 'nome status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await TipoUnidades
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var tipounidades = new TipoUnidades(data);
    await tipounidades.save();
}

exports.update = async(id, data) => {
    await TipoUnidades
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await TipoUnidades
        .findOneAndRemove(id);
}
