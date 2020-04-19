'use strict';
const mongoose = require('mongoose');
const Entidades = mongoose.model('Entidades');

exports.get = async() => {
    const res = await Entidades.find({}, 'estados nome email telefone status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Entidades
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var entidades = new Entidades(data);
    await entidades.save();
}

exports.update = async(id, data) => {
    await Entidades
        .findByIdAndUpdate(id, {
            $set: {
                estados: data.estados,
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Entidades
        .findOneAndRemove(id);
}
