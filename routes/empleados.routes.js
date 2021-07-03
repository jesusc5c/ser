const express = require('express');
const empleadoController = require('../controllers/empleado.controller');
const router = express.Router();

// incluir el controlador

const empleados = require('../controllers/empleado.controller');

//obtener todos los empleados
router.get('/', empleados.getEmpleados);


// Crear un empleado

router.post ('/', empleados.createEmpleado);

//obtener un empleado
router.get('/:id', empleados.getEmpleado);

//Actualizar empleado
router.put('/:id', empleados.updateEmpleado);

//eliminar un empleado
router.delete('/:id',empleados.deleteEmpleado);

module.exports = router;
