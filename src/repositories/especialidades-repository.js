'use strict';
const mongoose = require('mongoose');
const Especialidades = mongoose.model('Especialidades');

exports.get = async() => {
    const res = await Especialidades.find({}, 'nome status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Especialidades
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var especialidades = new Especialidades(data);
    await especialidades.save();
}

exports.update = async(id, data) => {
    await Especialidades
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Especialidades
        .findOneAndRemove(id);
}
