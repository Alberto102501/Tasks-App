import React, {useEffect, useState} from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import '../App.css';

export default function TaskList(){
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] =  useState('');

    const loadTask = async () =>{
        const data = await fetchTasks();
        setTasks(data);
    }

    useEffect(() => {
        loadTask();
    }, []);

    const handleAdd = async(e) => {
        e.preventDefault();//Evita que el formulario recargue la pagina

        if(!title.trim()){//Si el titulo esta vacio
            return;
        }

        await createTask(title);

        setTitle('');

        loadTask();

    };

    const toggleComplete = async (task) => {
        await updateTask(task._id, !task.completed);
        loadTask();
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        loadTask();
    };

    return(
        <div className="container mt-4">
            <form onSubmit={handleAdd} className="input-group mb-3">
                <input 
                    type="text" value={title} 
                    onChange={(e) => { setTitle(e.target.value)}} 
                    placeholder="Nueva tarea"
                    className="form-control"
                />
                <button className="btn btn-primary">Agregar</button>
            </form>

            <ul className="list-group">
                {
                    tasks.map((task) => (
                        <li 
                            key={task._id}
                            className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`}
                        >
                            <div className="contenido">
                                <div>
                                    <input 
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => {toggleComplete(task)}}
                                        className="form-check-input me-2"
                                    />
                                    {task.title}
                                </div>
                                <button 
                                    onClick={() => {removeTask(task._id)}}
                                    className="btn btn-sm btn-danger"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};