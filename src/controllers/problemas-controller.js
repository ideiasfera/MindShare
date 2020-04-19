'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/problemas-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
	let contract = new ValidationContract();
    if ((req.params.id === null) || (req.params.id === undefined)){
		res.status(400).send({
			message: 'Id nulo ou indefinido'
		});
		return;
	}
    if(req.params.id == 0){
        res.status(400).send({
            message: 'Id vazio'
        });
		return;
    }
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isId(req.body.unidades, 'A unidade deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.tiposervicos, 'O tipo serviço deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.tipoequipamentos, 'O tipo equipamento deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.profissionais, 'O profissional deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.numerodeserie, 3, 60, 'O número de série deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.fabricante, 3, 60, 'O fabricante deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.modelo, 3, 60, 'O modelo deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.titulo, 3, 60, 'O titulo deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.laudoprevio, 3, 60, 'O laudoprevio deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.foto, 0, 60, 'A foto deve conter entre 0 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.tipos, 3, 60, 'O tipos deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.status, 3, 60, 'O status deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    try {
        await repository.create({
            unidades: req.body.unidades,
            tiposervicos: req.body.tiposervicos,
            tipoequipamentos: req.body.tipoequipamentos,
            profissionais: req.body.profissionais,
            numerodeserie: req.body.numerodeserie,
            fabricante: req.body.fabricante,
            modelo: req.body.modelo,
            titulo: req.body.titulo,
            laudoprevio: req.body.laudoprevio,
            foto: req.body.foto,
            tipos: req.body.tipos,
            status: req.body.status
        });
        res.status(201).send({
            message: 'Problema cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isId(req.body.unidades, 'A unidade deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.tiposervicos, 'O tipo serviço deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.tipoequipamentos, 'O tipo equipamento deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.profissionais, 'O profissional deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.numerodeserie, 3, 60, 'O número de série deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.fabricante, 3, 60, 'O fabricante deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.modelo, 3, 60, 'O modelo deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.titulo, 3, 60, 'O titulo deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.laudoprevio, 3, 60, 'O laudoprevio deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.foto, 0, 60, 'A foto deve conter entre 0 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.tipos, 3, 60, 'O tipos deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.status, 3, 60, 'O status deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    if ((req.params.id === null) || (req.params.id === undefined)){
		res.status(400).send({
			message: 'Id nulo ou indefinido'
		});
		return;
	}
    if(req.params.id == 0){
        res.status(400).send({
            message: 'Id vazio'
        });
		return;
    }
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Problema atualizado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async(req, res, next) => {
	let contract = new ValidationContract();
    if ((req.body.id === null) || (req.body.id === undefined)){
		res.status(400).send({
			message: 'Id nulo ou indefinido'
		});
		return;
	}
    if(req.body.id == 0){
        res.status(400).send({
            message: 'Id vazio'
        });
		return;
    }
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Problema removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
