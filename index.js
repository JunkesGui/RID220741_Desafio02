const getTasksInStorage = () =>{
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'));
    return localTasks ? localTasks : [];
}

const setTasksInStorage = (tasks) =>{
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

const getTaskDate = () =>{
    const today = new Date();
    return `Criado em: ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
}

const getTaskInfo = (event) =>{
    const description = event.target.elements.description.value;
    //const id = task.id;
    const tag = event.target.elements.tag.value;
    const creationDate = getTaskDate();
    return {description, tag, creationDate}
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

const createTask = (event) =>{
    event.preventDefault();
    const newTaskData = getTaskInfo(event);
    createTaskItem(newTaskData);

    const tasks = getTasksInStorage();
    const updatedTasks = [...tasks,
         {description: newTaskData.description,
         tag: newTaskData.tag,
         creationDate: newTaskData.creationDate}]

    setTasksInStorage(updatedTasks);
}

window.onload = function (){
    const form = document.getElementById("createTaskForm");
    form.addEventListener('submit', createTask);

    const tasks = getTasksInStorage();
    tasks.forEach(task => {
        createTaskItem(task);
    });
}

//TODO FUNC getId para criar novos IDs para cada nova task 