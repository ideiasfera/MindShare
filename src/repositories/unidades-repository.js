'use strict';
const mongoose = require('mongoose');
const Unidades = mongoose.model('Unidades');

exports.get = async() => {
    const res = await Unidades.find({}, 'entidades estados tipounidades especialidades exames nome email telefone diretor horario status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Unidades
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var unidades = new Unidades(data);
    await unidades.save();
}

exports.update = async(id, data) => {
    await Unidades
        .findByIdAndUpdate(id, {
            $set: {
                entidades: data.entidades,
                estados: data.estados,
                tipounidades: [data.tipounidades],
                especialidades: [data.especialidades],
                exames: data.exames,
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                diretor: data.diretor,
                horario: data.horario,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await Unidades
        .findOneAndRemove(id);
}
