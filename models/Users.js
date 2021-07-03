const mongoose = require('mongoose');

const { Schema } = mongoose;
//modulo para encriptar contraseña
const bcrypt = require('bcryptjs');


//modificadores
//  trim: sirve para limpiar los espacion en blanco
// unique sirve para el atributo email sea unico en la base de datos
//required sirve para inidicar que al atributo bede contener valores
const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tipo: { // AGREGAMOS UN TIPO DE USUARIOS EN EL USER.JS
    type: String,
    required: true,
    trim: true
    }
});
module.exports = mongoose.model('Users', UsersSchema);
