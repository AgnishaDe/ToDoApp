import { readTasks, saveTasks } from './fileUtils.js';

async function addTask(taskName){
try{
    const data = await readTasks();
    const tasks = JSON.parse(data);

    tasks.push({name: taskName, done: false, date: new Date().toISOString()});
    await saveTasks(tasks);
    console.log(`Task added: ${taskName}`);
}
catch (error)
{
    console.error('Error adding task:' , error.message);
}
}

async function viewTask(){
try{
    const data = await readTasks();
    const tasks = JSON.parse(data);

    console.log(' Your Tasks :');
    tasks.forEach ((task , index) => {
        console.log(`${index + 1}. ${task.name} - ${task.done ? 'Done' : 'NotDone'}`);
    });

}
catch (error)
{
    console.error('Error viewing tasks:' , error.message);
}
}

async function markTaskDone(taskIndex){
try{
    const data = await readTasks();
    const tasks = JSON.parse(data);

    //const taskIndex= parseInt(process.argv[3]) - 1;
    tasks[taskIndex].done = true;
    await saveTasks(tasks);
    console.log(`Task ${tasks[taskIndex].name} is done`);
}
catch (error)
{
    console.error('Error marking task as done:' , error.message);
}
}


async function deleteTask(taskIndex){
try{
    const data = await readTasks();
    const tasks = JSON.parse(data);
    //const taskIndex = parseInt(process.argv[3]) - 1;
    tasks.splice(taskIndex, 1);
    await saveTasks(tasks);
    console.log(`Task ${taskIndex + 1} is deleted`);
}
catch (error)
{
    console.error('Error:' , error.message);
}
}

async function showFilterTasks(status){
try{
    const data = await readTasks();
    const tasks = JSON.parse(data);

    //const status = process.argv[3];
    const filteredTasks = tasks.filter( task => task.done.toString() === status);

    console.log( `Tasks ${ status === 'true' ? 'Done' : 'Not Done' } :`);
    filteredTasks.forEach( (task,index) => {
        console.log(`${index+1}. ${task.name}`);
    })
}
catch (error)
{
    console.error('Error:' , error.message);
}
}

async function sortTasks(criterion) {
    try{
        const data = await readTasks();
        const tasks = JSON.parse(data);
        const sortedTasks = [...tasks];
    switch (criterion) {
        case 'name':
            sortedTasks.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            break;
        case 'date':
            sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        default:
            console.log('Invalid criterion');
            return;
    }
    sortedTasks.forEach ((task , index) => {
        console.log(`${index + 1}. ${task.name} - ${task.done ? 'Done' : 'NotDone'} - ${task.date}`);
    });
    
}
catch (error)
{
    console.error('Error:' , error.message);
}
}

export { addTask, viewTask, markTaskDone, deleteTask, showFilterTasks , sortTasks};
