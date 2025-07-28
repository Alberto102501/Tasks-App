const API_URL = '/api/tasks';
// const API_URL_create = '/api/tasks/create';
// const API_URL_update = '/api/tasks/update';
// const API_URL_delete = '/api/tasks/delete';

export async function fetchTasks(){
    const res = await fetch(API_URL);
    return res.json();
}

export async function createTask(title){
    const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({title})
    })

    return res.json();
}

export async function updateTask(id, completed){
    const res = await fetch(`${API_URL}/update/${id}`, {
        method: 'PUT',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({completed})
    });

    return res.json();

}

export async function deleteTask(id){
    const res = await fetch(`${API_URL}/delete/${id}`,{
        method: 'DELETE'
    });

    return res.json();

}