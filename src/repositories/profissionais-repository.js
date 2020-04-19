'use strict';
const mongoose = require('mongoose');
const Profissionais = mongoose.model('Profissionais');

exports.get = async() => {
    const res = await Profissionais.find({}, 'unidades cargos nome email telefone tipo status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Profissionais
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var profissionais = new Profissionais(data);
    await profissionais.save();
}

exports.update = async(id, data) => {
    await Profissionais
        .findByIdAndUpdate(id, {
            $set: {
                unidades: [data.unidades],
                cargos: data.cargos,
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                tipo: data.tipo,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Profissionais
        .findOneAndRemove(id);
}
