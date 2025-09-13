const firstTimeTasks = [
    {id:1, description: "Implementar tela de listagem de tarefas", tag: "frontend", creationDate: "Criado em: 21/08/2024", done: false},
    {id:2, description: "Criar endpoint para cadastro de tarefas", tag: "backend", creationDate: "Criado em: 21/08/2024", done: false},
    {id:3, description: "Implementar protótipo da listagem de tarefas", tag: "backend", creationDate: "Criado em: 21/08/2024", done: true}
]

const getTasksInStorage = () =>{
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'));
    return localTasks;
}

const setTasksInStorage = (tasks) =>{
    document.getElementById("taskProgress")
            .textContent = `${doneTaskCount(tasks)} tarefa(s) concluída(s)`
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

const doneTaskCount = (tasks)=>{
    const doneTasks = tasks.filter(({done}) => done);
    return doneTasks.length;
}

const clearForm = () =>{
    document.getElementById('description').value = "";
    document.getElementById('tag').value = "";
}

const getTaskDate = () =>{
    const today = new Date();
    return `Criado em: ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
}

const getTaskId = () =>{
    const tasks = getTasksInStorage();
    const lastId = tasks[tasks.length - 1]?.id;
    const newId = lastId? lastId + 1 : 1;
    return newId;
}

const getTaskInfo = (event) =>{
    const description = event.target.elements.description.value;
    const id = getTaskId();
    const tag = event.target.elements.tag.value;
    const creationDate = getTaskDate();
    return {id, description, tag, creationDate}
}

const getConcludeButton = (taskId) =>{
    const concludeButton = document.createElement('input');
    concludeButton.type = 'button';
    concludeButton.value = 'Concluir';
    concludeButton.className = "concludeButton"
    concludeButton.addEventListener("click", concludeTask)
    concludeButton.id = `concludeButton-${taskId}`;
    return concludeButton;
}

const getDoneIcon = () =>{
    const doneIcon = document.createElement('img')
    doneIcon.src = "./styles/doneIcon.svg"
    doneIcon.id = "doneIcon"
    return doneIcon
}

const visualConcludeTask = (id)=>{
    document.getElementById(`taskDescription${id}`)
            .setAttribute('id', 'DONE')
    
    const taskDiv = document.getElementById(`taskDivId${id}`)
    taskDiv.removeChild(document.getElementById(`concludeButton-${id}`))
    
    taskDiv.append(getDoneIcon())
}

const removeDoneTask = ()=>{
    const tasks = getTasksInStorage();
    const updatedTasks = tasks.filter(({done}) => done === false);
    setTasksInStorage(updatedTasks)
}

const concludeTask = (event) =>{
    const tasks = getTasksInStorage();
    const id = event.target.id.split('-')[1];
    
    const updatedTasks = tasks.map((task) =>{
        if(parseInt(task.id) === parseInt(id)){
            visualConcludeTask(id);        
            return {... task, done: true}
        }else{
            return task;
        }
    })
    setTasksInStorage(updatedTasks);
}

const createTaskItem = (task) =>{
    const list = document.getElementById('taskListDiv');
    const newTask = document.createElement('div');
    const newTaskWrapper = document.createElement('div');
    const newTaskDetailsWrapper = document.createElement('div');
    const newTaskDesc = document.createElement('li');
    const newTaskTag = document.createElement('li');
    const newTaskDate = document.createElement('li');

    const newTaskId = task.id;
    newTask.id = `taskDivId${newTaskId}`;
    newTaskWrapper.className = `taskWrapper`

    newTaskDesc.textContent = task.description
    newTaskDesc.id = `taskDescription${newTaskId}`
    newTaskWrapper.appendChild(newTaskDesc)

    newTask.appendChild(newTaskWrapper);

    newTaskTag.textContent = task.tag
    newTaskTag.className = 'taskTag'
    newTaskDetailsWrapper.appendChild(newTaskTag)

    newTaskDate.textContent = task.creationDate
    newTaskDate.className = 'taskDate'
    newTaskDetailsWrapper.appendChild(newTaskDate)

    newTaskWrapper.appendChild(newTaskDetailsWrapper)

    newTask.appendChild(getConcludeButton(newTaskId))

    list.appendChild(newTask)

    return newTask
}

const createTask = (event) =>{
    event.preventDefault();
    const newTaskData = getTaskInfo(event);
    createTaskItem(newTaskData);

    const tasks = getTasksInStorage();
    const updatedTasks = [...tasks,
         {id: newTaskData.id,
         description: newTaskData.description,
         tag: newTaskData.tag,
         creationDate: newTaskData.creationDate,
         done: false}]

    setTasksInStorage(updatedTasks);
    clearForm();
}

const loadTasks = (tasks) =>{
    tasks.forEach(task => {
        createTaskItem(task);
    });
}

window.onload = function (){
    if(getTasksInStorage() == null){
        const tasks = firstTimeTasks;
        setTasksInStorage(tasks);
        loadTasks(tasks);
        visualConcludeTask(3);
    }else{
        removeDoneTask();
        const tasks = getTasksInStorage();
        loadTasks(tasks);
    }

    const form = document.getElementById("createTaskForm");
    form.addEventListener('submit', createTask);
}
