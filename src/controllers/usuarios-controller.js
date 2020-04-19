'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/usuarios-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
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
    contract.hasMinMaxLen(req.body.login, 6, 32, 'O login deve conter entre 6 a 32 caracteres');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    contract.hasMinMaxLen(req.body.senha, 6, 32, 'A senha deve conter entre 6 a 32 caracteres');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    contract.isEmail(req.body.email,  'O e-mail deve ser válido');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            login: req.body.login,
            senha: md5(req.body.senha + global.SALT_KEY),
            email: req.body.email
        });
        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!'
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
    contract.hasMinMaxLen(req.body.login, 6, 32, 'O login deve conter entre 6 a 32 caracteres');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    contract.hasMinMaxLen(req.body.senha, 6, 32, 'A senha deve conter entre 6 a 32 caracteres');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    contract.isEmail(req.body.email,  'O e-mail deve ser válido');
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
        req.body.senha = md5(req.body.senha + global.SALT_KEY)
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Usuário atualizado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.putRole = async(req, res, next) => {
	let contract = new ValidationContract();
    contract.isEqualOrOr(req.body.tipo, 'mindshare', 'entidade', 'profissional', 'o tipo deve ser válido');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    contract.isString(req.body.id_tipo, 'O código tipo deve ser válido');
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
        await repository.updateRole(req.params.id, req.body);
        res.status(200).send({
            message: 'Usuário permissão com sucesso!'
        });
    } catch (e) {
		console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.authenticate = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinMaxLen(req.body.login, 6, 32, 'O login deve conter entre 6 a 32 caracteres');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    contract.hasMinMaxLen(req.body.senha, 6, 32, 'A senha deve conter entre 6 a 32 caracteres');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        const usuario = await repository.authenticate({
            login: req.body.login,
            senha: md5(req.body.senha + global.SALT_KEY)
        });
        if (!usuario) {
            res.status(404).send({
                message: 'Login ou senha inválidos'
            });
            return;
        }
        const token = await authService.generateToken({
            id: usuario._id,
            login: usuario.login,
            senha: usuario.senha,
            email: usuario.email
        });

        res.status(201).send({
            message: "Login efetuado com sucesso",
            token: token,
            usuario: {
                id: usuario.id,
                login: usuario.login,
                senha: usuario.senha,
                email: usuario.email
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.refreshToken = async(req, res, next) => {
    let contract = new ValidationContract();
    if ((req.body.token === null) || (req.body.token === undefined)){
        res.status(400).send({
            message: 'Token nulo ou indefinido'
        });
        return;
    }
    if(req.body.token == 0){
        res.status(400).send({
            message: 'Token vazio'
        });
        return;
    }
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const usuario = await repository.getById(data.id);

        if (!usuario) {
            res.status(404).send({
                message: 'Usuário não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: usuario._id,
            login: usuario.login,
            senha: usuario.senha,
            email: usuario.email
        });

        res.status(201).send({
            message: "Token atualizado",
            token: token,
            usuario: {
                id: usuario._id,
                login: usuario.login,
                senha: usuario.senha,
                email: usuario.email
            }
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
            message: 'Usuário removido com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
