const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./src/routes/task.route');
const connectDB = require('./db');


const app = express();

app.use(cors()); //Para poder llamar las API's desde el front sin problemas
app.use(morgan('dev'));
app.use(express.json());//Middleware para que express pueda leer json desde el body de las peticiones
app.use("/api/tasks", taskRoutes);

connectDB();

const PORT = process.env.PORT || 3000;



function run(){
    console.log("Servidor corriendo en puerto: " + PORT);
}

app.listen(PORT, run());