const { getPossibleInstrumentationHookFilenames } = require('next/dist/build/utils');
const Task = require('../models/task.model');

//Traer todas las tareas
exports.getTask = async (req, res) => {
    const tasks = await Task.find();//Await se usa cuando hay interaccion con la bd y find es un metod de mongo para encontrar las tareas

    try{
        if(tasks.length === 0){
            res.status(200).json({message: "No hay tareas aun"})
        }else{
            res.status(200).json(tasks);
        }
    }catch(error){
        console.log("Ha ocurrido el siguiente error: " + error);
        res.status(500).json({error: "Error al obtener tareas"})
    }

}

//Crear tareas
exports.createTask = async (req, res) => {
    const task = new Task({title: req.body.title});

    try{
        const savedTask = await task.save();
        res.status(200).json({message: "Tarea creada con exito.", task: savedTask});
    }catch{
        console.log("Ha ocurrido el siguiente error: " + error);
        res.status(500).json({message: "Error al crear la tarea"});
    }

}

//Actualizar tarea
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                completed: req.body.completed
            },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.status(200).json({ message: "Tarea actualizada correctamente.", task });
    } catch (error) {
        console.error("Ha ocurrido el siguiente error: " + error);
        res.status(500).json({ error: "Error al actualizar tarea" });
    }
};

//Eliminar tarea
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    try{
        res.status(200).json({message: "Tarea eliminada correctamente."});
    }catch(error){
        console.log("Ha ocurrido el siguiente error: " + error);
        res.status(500).json({error: "Error al eliminar tarea"});
    }

}