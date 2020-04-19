'use strict';

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const router = express.Router();

mongoose.connect(config.connectionString, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Pais = require('./models/pais');
const Estados = require('./models/estados');
const Entidades = require('./models/entidades');
const Especialidades = require('./models/especialidades');
const Exames = require('./models/exames');
const TipoUnidades = require('./models/tipounidades');
const Unidades = require('./models/unidades');
const Cargos = require('./models/cargos');
const Profissionais = require('./models/profissionais');
const TipoEquipamentos = require('./models/tipoequipamentos');
const TipoServicos = require('./models/tiposervicos');
const Problemas = require('./models/problemas');
const Usuarios = require('./models/usuarios');

const indexRoute = require('./routes/index-route');

const paisRoute = require('./routes/pais-route');
const estadosRoute = require('./routes/estados-route');
const entidadesRoute = require('./routes/entidades-route');
const especialidadesRoute = require('./routes/especialidades-route');
const examesRoute = require('./routes/exames-route');
const tipounidadesRoute = require('./routes/tipounidades-route');
const unidadesRoute = require('./routes/unidades-route');
const cargosRoute = require('./routes/cargos-route');
const profissionaisRoute = require('./routes/profissionais-route');
const tipoequipamentosRoute = require('./routes/tipoequipamentos-route');
const tiposervicosRoute = require('./routes/tiposervicos-route');
const problemasRoute = require('./routes/problemas-route');
const usuariosRoute = require('./routes/usuarios-route');

app.use(cors())

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);

app.use('/pais', paisRoute);
app.use('/estados', estadosRoute);
app.use('/entidades', entidadesRoute);
app.use('/especialidades', especialidadesRoute);
app.use('/exames', examesRoute);
app.use('/tipounidades', tipounidadesRoute);
app.use('/unidades', unidadesRoute);
app.use('/cargos', cargosRoute);
app.use('/profissionais', profissionaisRoute);
app.use('/tipoequipamentos', tipoequipamentosRoute);
app.use('/tiposervicos', tiposervicosRoute);
app.use('/problemas', problemasRoute);
app.use('/usuarios', usuariosRoute);

module.exports = app;
