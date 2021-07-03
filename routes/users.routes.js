const express = require('express');
const router = express.Router();

//const bcrypt = require('bcryptjs');

const users = require('../Controllers/user.controller');

//Obtener todos los usuarios
router.get('/', users.getUsers);

//Agregamos un usuario
router.post('/', users.createUser);

//eliminamos un usurious
router.delete('/:id', users.deleteUser);

//atualizar usuarios
router.put('/:id', users.updateUser);

//obtener un usuarios
router.get('/:id', users.getUser)

module.exports = router;