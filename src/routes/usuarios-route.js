'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.get('/:id', authService.authorize, controller.getById);
router.post('/login', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);
router.post('/', controller.post);
router.put('/:id', authService.authorize, controller.put);
router.put('/tipo/:id', authService.authorize, controller.putRole);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
