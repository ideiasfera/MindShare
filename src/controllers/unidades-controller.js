'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/unidades-repository');

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
    contract.isId(req.body.entidades, 'A entidade deve ser válida');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.estados, 'O estado deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.tipounidades, 'O tipo unidade deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isArray(req.body.especialidades, 'A especialidade deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isArray(req.body.exames, 'O exame deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.nome, 3, 60, 'O nome deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isEmail(req.body.email, 'O email deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isTelephone(req.body.telefone, 'O telefone deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.diretor, 3, 60, 'O diretor deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.horario, 3, 60, 'O horário deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    try {
        await repository.create({
            entidades: req.body.entidades,
            estados: req.body.estados,
            tipounidades: req.body.tipounidades,
            especialidades: req.body.especialidades,
            exames: req.body.exames,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            diretor: req.body.diretor,
            horario: req.body.horario
        });
        res.status(201).send({
            message: 'Unidade cadastrado com sucesso!'
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
    contract.isId(req.body.entidades, 'A entidade deve ser válida');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.estados, 'O estado deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.tipounidades, 'O tipo unidade deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isArray(req.body.especialidades, 'A especialidade deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isArray(req.body.exames, 'O exame deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.nome, 3, 60, 'O nome deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isEmail(req.body.email, 'O email deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isTelephone(req.body.telefone, 'O telefone deve ser válido');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.diretor, 3, 60, 'O diretor deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.hasMinMaxLen(req.body.horario, 3, 60, 'O horário deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
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
            message: 'Unidade atualizado com sucesso!'
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
            message: 'Unidade removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
