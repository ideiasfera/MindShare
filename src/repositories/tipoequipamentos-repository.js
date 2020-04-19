'use strict';
const mongoose = require('mongoose');
const TipoEquipamentos = mongoose.model('TipoEquipamentos');

exports.get = async() => {
    const res = await TipoEquipamentos.find({}, 'tipoequipamento unidades equipamento foto fabricante modelo status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await TipoEquipamentos
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var tipoequipamentos = new TipoEquipamentos(data);
    await tipoequipamentos.save();
}

exports.update = async(id, data) => {
    await TipoEquipamentos
        .findByIdAndUpdate(id, {
            $set: {
                tipoequipamento: data.tipoequipamento,
                unidades: data.unidades,
                equipamento: data.equipamento,
                foto: data.foto,
                fabricante: data.fabricante,
                modelo: data.modelo,
                status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.delete = async(id) => {
    await TipoEquipamentos
        .findOneAndRemove(id);
}
