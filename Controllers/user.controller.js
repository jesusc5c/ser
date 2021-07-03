const Users = require('../models/Users');
const bcrypt = require('bcryptjs');

const userController = { }

//listar todos los usuarios
userController.getUsers = async (req, res) => {
    const users = await Users.find();
    res.json(users);
}//fin de un usuario

//crear usuario para
userController.createUser= async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const tipo = req.body.tipo; //SE AGREGA TIPO EN EL createUser
    
    //creamos un objeto usuario almacenarlo en la bd

    const User = new Users({
        name: name,
        email: email,
        password: password,
        tipo: tipo //SE AGREGA TIPO
    });
    //encriptamos el passwo del usuarios
    //encripta la contraseña 10 veces aplicando la funcion hash
    User.password = bcrypt.hashSync(password, 10);
    await User.save()
                .then ( (user)=>{
                res.json(user)
    })
    .catch((err)=>{
        return res.json({message: 'error al agregar usuario'})
    })
}//fin de createUser
userController.deleteUser = async (req, res) =>{
    await Users.findByIdAndRemove(req.params.id)
                .then( (user)=>{
                    res.json({status: 'Usuario eliminado', user: user});
                })
                .catch.log((err)=>{
                    console.log(err);
                    return res.json({message: 'error al eliminar el usuario'})
                })
}//fin de eliminar usuarios


userController.updateUser = async (req, res) => {
    const {id} = req.params;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const tipo = req.body.tipo;   //AGREGAR ATRIBUTO TIPO EN EL updateUser
    
    const user = new Users ({
        name: name,
        email: email,
        password: password,
        tipo: tipo  //AGREGAMOS ATRIBUTO TIPO
    });
    user._id = id;
    user.password = bcrypt.hashSync(password, 10);
    await Users.findByIdAndUpdate(id, {$set: user}, {new: true})
    .then((user)=>{
        res.json({status: 'usuario actualizado', user:user});
    })
    .catch((err)=> {
        console.log(err);
        return res.json({message: 'error al actualizar el usuario'});
    })
}
//buscar un usuario por id
userController.getUser = async ( req, res)=>{
    const user = await Users.findById(req.params.id)
                            .then((user)=>{
                                res.json(user);
                            })
                            .catch((err)=>{
                                console.log(err);
                                return res.json({message: 'error al obtener usuario'})
                            })
}//fin del getUser
module.exports = userController;