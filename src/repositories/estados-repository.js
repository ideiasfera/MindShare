'use strict';
const mongoose = require('mongoose');
const Estados = mongoose.model('Estados');

exports.get = async() => {
    const res = await Estados.find({}, 'pais estadocidade estado cidades zonas bairros sigla status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Estados
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var estados = new Estados(data);
    await estados.save();
}

exports.update = async(id, data) => {
    await Estados
        .findByIdAndUpdate(id, {
            $set: {
                pais: data.pais,
                estadocidade: data.estadocidade,
                estado: data.estado,
                cidades: data.cidades,
                zonas: data.zonas,
                bairros: data.bairros,
                sigla: data.sigla,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Estados
        .findOneAndRemove(id);
}
