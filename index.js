const fs = require('fs');

// let tasks=[];

function readTasks(){
    return new Promise(( resolve, reject) => {
        fs.readFile('tasks.json', 'utf8', (err,data) => {
            if(err){
                reject(err);
            }
            else{
                resolve(data.trim() === '' ? '[]' : data);
            }
        });
    });
}

// if(fs.readFileSync('tasks.json', 'utf8').trim() !== ''){
//     tasks = JSON.parse(fs.readFileSync('tasks.json'));
// }


function saveTasks(tasks){
    return new Promise((resolve, reject) => {
        fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve();
            }
        });
        // fs.writeFileSync('tasks.json', JSON.stringify(tasks));
        // resolve();
    });
}

// function saveTasks(){
//     fs.writeFileSync('tasks.json', JSON.stringify(tasks));
// }

async function main()
{
const action = process.argv[2];
const taskName = process.argv.slice(3);

try{
    const data = await readTasks();
    const tasks = JSON.parse(data);

if(action === 'add'){
    tasks.push({name: taskName, done: false});
    await saveTasks(tasks);
    console.log(`Task added: ${taskName}`);
}

else if(action === 'view')
{
    console.log(' Your Tasks :');
    tasks.forEach ((task , index) => {
        console.log(`${index + 1}. ${task.name} - ${task.done ? 'Done' : 'NotDone'} `);
    });
}

else if(action === 'done'){
    const taskIndex= parseInt(process.argv[3]) - 1;
    tasks[taskIndex].done = true;
    await saveTasks(tasks);
    console.log(`Task ${tasks[taskIndex].name} is done`);
}

else if (action === 'delete')
{
    const taskIndex = parseInt(process.argv[3]) - 1;
    tasks.splice(taskIndex, 1);
    await saveTasks(tasks);
    console.log(`Task ${taskIndex + 1} is deleted`);
}

else if(action === 'filter')
{
    const status = process.argv[3];
    const filteredTasks = tasks.filter( task => task.done.toString() === status);

    console.log( `Tasks ${ status === 'true' ? 'Done' : 'Not Done' } :`);
    filteredTasks.forEach( (task,index) => {
        console.log(`${index+1}. ${task.name}`);
    })
}
}
catch (error)
{
    console.error('Error:' , error.message);
}
}

main();
