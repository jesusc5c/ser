const express = require ('express');
const morgan = require('morgan');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authorization = require('auth-header');

//modelo de datos de usuarios
const Users = require('./models/Users');

const app = express();



//conectamos base de datos 
const {mongoose }= require('./database');
const {head} = require('./routes/empleados.routes');

//consifiguraciones
app.set('port', process.env.PORT || 3000 );
app.set('secret', 'my_Secret_1357')

// middleware
app.use(express.urlencoded({ extended:true}))
app.use(morgan('dev'));  //enviar mensajes a consola de lo que el usuario pide de manera externa
app.use(express.json()); //esta libreria es para optener datos del usuario en request.body
app.use(cors()); //permite la comunicacion desde fuera del servidor



//rutas para iniciar secion enel api

//se me hace que aqui se hase lo del usuario -------/**************** */
app.post('/api/login', async (req, res) => {
    const email = req.body.email;
    const passwd =req.body.password;
    return new Promise((resolve, reject) => {
        Users.findOne({email: email})
            .then ((user)=>{
                if(!user){ //si la consulta no regresa ningun usuario
                    res.json({success: false, message: 'Usuario no encontrado'})
                }else {//si se encontro el usuario
                    //comprobar que el password corresponde al usuario
                    if(bcrypt.compareSync(passwd, user.password)){
                        const expire = 3600;//1 hora de secion activa
                        const token= jwt.sign (
                                            {user},
                                            app.get('secret'),
                                            {expiresIn: expire}
                                            )
                    res.json({
                        success: true,
                        token: token
                    })
                    }else {
                        res.json({success: false,message: 'password no coincide'})
                }//else
            }//else
        })//.then
    })//new promise
    
});//fin de api login en el


//el token se entvia atraves de reques,body ( en json)
//reques.query.token ( en la url)
//reques.header ( contiene las cabeceras de authorization})

//http://localhost:3000/api/user HTTP/1.1
//content-type: application/json
//authorization: token-auth token
app.use( (req, res, next) => {

    //verificamos si el token viene por el header 
    var tokenauth='';
    if(req.get('authorization')){
        auth = authorization.parse(req.get('authorization'));
        if(auth.scheme == 'token-auth')
            tokenauth = auth.token;
    }
    const token = req.body.token || //json
                  req.query.token || //url
                  tokenauth; //header
                  if(token) {
                      
                      jwt.verify(token, app.get('secret'),(err, decoded) => {
                          if(err)
                                return res.json({success: false, message: 'fallo en la autenticacion'})
                           else{
                               req.decoded = decoded;//almacenamos en req el token descodificado
                               next(); //permite ejecutar las siguientes funciones de las rutas
                           }
                      })
                  }else{// si no exite el token o no se enviado en el requesr
                    return res.status(403).send({
                        success: false, 
                        message: 'el token no existe'
                    })
                  }
});// fin de app.use

// las ruta entand e aqui para abajo solo se tendra acceso
//si el usuario envia un token y ha iniciado sesion


// rutas del servidor
app.use('/api/empleados',require('./routes/empleados.routes'));
app.use('/api/users', require('./routes/users.routes'));


//incia servidor

app.listen(app.get('port'), ()=>{
    console.log("servidor corriendo en el puerto "+ app.get('port'));
});
