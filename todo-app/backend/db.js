const mongoose = require('mongoose');
require('dotenv').config();//Para poder hacer uso del contenido del archivo .env

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);//Conexion a la base de datos
        console.log("Mongodb conectado.");
    }catch(error){
        console.error("Error al conectar: " + error.message);
    }
}

module.exports = connectDB;