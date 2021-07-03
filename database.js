const mongoose = require ('mongoose');

// configuracion de los parametros de la base de datos

//url='mongodb://localhost/empleados';
url= "mongodb+srv://sistema_empleados:SistemaEmpleados.2021@cluster0.tkjew.mongodb.net/Sistema?retryWrites=true&w=majority"
dbparams = {
    useCreateIndex: true,
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
mongoose.connect(url,dbparams)
            .then (db => console.log('BD esta conectada'))
            .catch( err => console.log(err));
module.exports = mongoose;