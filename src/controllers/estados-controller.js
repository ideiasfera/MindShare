'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/estados-repository');

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
    contract.hasMinMaxLen(req.body.pais, 3, 60, 'O país deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.estado, 3, 60, 'O estado deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.cidades, 3, 60, 'A cidade deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.zonas, 3, 60, 'A zona deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.bairros, 3, 60, 'O bairro deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isFixedLen(req.body.sigla, 2, 'A sigla deve conter 2 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
	req.body.estadocidade = req.body.estado + req.body.cidades;
    try {
        await repository.create({
            pais: req.body.pais,
            estadocidade: req.body.estadocidade,
            estado: req.body.estado,
            cidades: req.body.cidades,
            zonas: req.body.zonas,
            bairros: req.body.bairros,
            sigla: req.body.sigla
        });
        res.status(201).send({
            message: 'Estado cadastrado com sucesso!'
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
    contract.hasMinMaxLen(req.body.pais, 3, 60, 'O país deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.estado, 3, 60, 'O estado deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.cidades, 3, 60, 'A cidade deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.zonas, 3, 60, 'A zona deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.bairros, 3, 60, 'O bairro deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isFixedLen(req.body.sigla, 2, 'A sigla deve conter 2 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
	req.body.estadocidade = req.body.estado + req.body.cidades;
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
            message: 'Estado atualizado com sucesso!'
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
            message: 'Estado removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
