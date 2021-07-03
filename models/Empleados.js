const mongoose = require('mongoose');

const{ Schema } = mongoose;

const EmpleadoSchema = new Schema({
    Nombre: {
        type: String,
        require: true
    },
    Puesto: {
        type: String,
        require: true
    },
    Departamento: {
        type: String,
        require: true
    },
    Salario: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('Empleados', EmpleadoSchema);