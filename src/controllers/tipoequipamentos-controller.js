'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/tipoequipamentos-repository');

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
    contract.isId(req.body.unidades, 'A unidade deve ser válida');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.nome, 3, 60, 'O nome deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.equipamento, 3, 60, 'O equipamento deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.foto, 0, 60, 'O foto deve conter entre 0 a 60 caracteres');
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
	req.body.tee = req.body.nome + req.body.equipamento;	
    try {
        await repository.create({
            unidades: req.body.unidades,
            nome: req.body.nome,
            equipamento: req.body.equipamento,
            foto: req.body.foto,
            fabricante: req.body.fabricante,
            modelo: req.body.modelo,
			tee: req.body.tee
        });
        res.status(201).send({
            message: 'Tipo equipamento cadastrado com sucesso!'
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
    contract.isId(req.body.unidades, 'A unidade deve ser válida');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.nome, 3, 60, 'O nome deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.equipamento, 3, 60, 'O equipamento deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.foto, 0, 60, 'O foto deve conter entre 0 a 60 caracteres');
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
	req.body.tee = req.body.nome + req.body.equipamento;	
    contract.isBoolean(req.body.status, 'O status deve ser booleano');
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
            message: 'Tipo equipamento atualizado com sucesso!'
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
            message: 'Tipo equipamento removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
