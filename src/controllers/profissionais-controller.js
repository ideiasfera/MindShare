'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/profissionais-repository');

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
    contract.isArray(req.body.unidades, 'A unidade deve ser válida');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.cargos, 'O cargo deve ser válido');
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
    contract.hasMinMaxLen(req.body.endereco, 3, 60, 'O endereco deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isEqualOrOr(req.body.tipo, 'unidade', 'voluntario', 'tercerizado', 'o tipo deve ser válido');
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
            unidades: [req.body.unidades],
            cargos: req.body.cargos,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            tipo: req.body.tipo,
			status: req.body.status
        });
        res.status(201).send({
            message: 'Profissional cadastrado com sucesso!'
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
    contract.isArray(req.body.unidades, 'A unidade deve ser válida');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isId(req.body.cargos, 'O cargo deve ser válido');
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
    contract.hasMinMaxLen(req.body.endereco, 3, 60, 'O endereco deve conter entre 3 a 60 caracteres');
	if (!contract.isValid()) {
		res.status(400).send(contract.errors()).end();
		return;
	}
    contract.isEqualOrOr(req.body.tipo, 'unidade', 'voluntario', 'tercerizado', 'o tipo deve ser válido');
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
            message: 'Profissional atualizado com sucesso!'
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
            message: 'Profissional removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
