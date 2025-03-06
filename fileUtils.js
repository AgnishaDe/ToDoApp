import fs from 'fs';
// if(fs.readFileSync('tasks.json', 'utf8').trim() !== ''){
//     tasks = JSON.parse(fs.readFileSync('tasks.json'));
// }
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

// function saveTasks(){
//     fs.writeFileSync('tasks.json', JSON.stringify(tasks));
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

export { readTasks, saveTasks };