'use strict';
const mongoose = require('mongoose');
const Exames = mongoose.model('Exames');

exports.get = async() => {
    const res = await Exames.find({}, 'nome status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Exames
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var exames = new Exames(data);
    await exames.save();
}

exports.update = async(id, data) => {
    await Exames
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Exames
        .findOneAndRemove(id);
}
