const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
    
},{timestamps: true}//Agrega automaticamente el CreateAt y UpdateAt
);

module.exports = mongoose.model('Task', taskSchema);//(nomebreColeccion, nombreEsquema);