let tasks = [
    {id: 1, description: "Teste1", tag: "TestTag", creationDate: "hoje?"},
    {id: 2, description: "Teste2", tag: "TestTag", creationDate: "hoje?"}
]

const getTaskInfo = (task) =>{
    const description = task.description;
    const id = task.id;
    const tag = task.tag;
    const creationDate = task.creationDate;
    return {description, id, tag, creationDate}
}

const createTaskItem = (task) =>{
    const list = document.getElementById('taskList');
    const newTask = document.createElement('li');

    newTask.id = task.id
    newTask.textContent = task.description
    list.appendChild(newTask)

    return newTask
}

const createTask = () =>{
    tasks.forEach((task)=>{
        console.log(task)
        const newTaskData = getTaskInfo(task);
        const {description, id, tag, creationDate} = newTaskData;
        createTaskItem(newTaskData);
        console.log(createTaskItem(newTaskData))
    })
    
}


window.onload = function (){
    const form = document.getElementById("createTaskForm");
    //form.addEventListener('submit', createTask);
    tasks.forEach((task)=>{
        createTaskItem(task);
        
    })
}