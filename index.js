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

const getConcludeButton = () =>{
    const concludeButton = document.createElement('input');
    concludeButton.type = 'button';
    concludeButton.value = 'Concluir';
    concludeButton.className = "concludeButton"
    return concludeButton;
}

const createTaskItem = (task) =>{
    const list = document.getElementById('taskList');
    const newTask = document.createElement('div');
    const newTaskDesc = document.createElement('li');
    const newTaskTag = document.createElement('li');
    const newTaskDate = document.createElement('li');

    newTask.id = task.id

    newTaskDesc.textContent = task.description
    newTask.appendChild(newTaskDesc)

    newTaskTag.textContent = task.tag
    newTaskTag.className = 'taskTag'
    newTask.appendChild(newTaskTag)

    newTaskDate.textContent = task.creationDate
    newTaskDate.className = 'taskDate'
    newTask.appendChild(newTaskDate)

    newTask.appendChild(getConcludeButton())

    list.appendChild(newTask)

    return newTask
}

const createTask = () =>{
    tasks.forEach((task)=>{
        console.log(task);
        const newTaskData = getTaskInfo(task);
        const {description, id, tag, creationDate} = newTaskData;
        createTaskItem(newTaskData);
    })
    
}

window.onload = function (){
    const form = document.getElementById("createTaskForm");
    //form.addEventListener('submit', createTask);
    tasks.forEach((task)=>{
        createTaskItem(task);
        
    })
}

//TODO FUNC ADICIONAR TAREFAS PELO SUBMIT; REMOVER LOGICA ARRAY HARDCODED E TROCAR POR LOGICA DE LOCAL STORAGE