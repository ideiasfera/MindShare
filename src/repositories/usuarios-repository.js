'use strict';
const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

exports.get = async() => {
    const res = await Usuarios.find({}, 'login senha email tipo id_tipo status datahoracadastro datahoraatualizado');
    return res;
}

exports.getById = async(id) => {
    const res = await Usuarios
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var user = new Usuarios(data);
    await user.save();
}

exports.update = async(id, data) => {
    await Usuarios
        .findByIdAndUpdate(id, {
            $set: {
                login: data.login,
                senha: data.senha,
                email: data.email,
				status: data.status,
                datahoraatualizado: Date.now()
            }
        });
}

exports.updateRole = async(id, data) => {
	if ((data.id_tipo === null) || (data.id_tipo == undefined) || (data.id_tipo == 0)) {
		await Usuarios
			.findByIdAndUpdate(id, {
				$set: {
					tipo: [data.tipo],
					datahoraatualizado: Date.now()
				}
			}, {new: true}, function(err, Usuarios) { } );
	} else {
		await Usuarios
			.findByIdAndUpdate(id, {
				$set: {
					tipo: [data.tipo],
					id_tipo: data.id_tipo,
					datahoraatualizado: Date.now()
				}
			}, {new: true}, function(err, Usuarios) { } );
	}
}

exports.delete = async(id) => {
    await Usuarios
        .findOneAndRemove(id);
}

exports.authenticate = async(data) => {
    const res = await Usuarios.findOne({
        login: data.login,
        senha: data.senha
    });
    return res;
}
