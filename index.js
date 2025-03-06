
import { addTask , viewTask , markTaskDone , deleteTask , showFilterTasks} from './functionManager.js';

const action = process.argv[2];
const taskName = process.argv.slice(3);
const taskIndex = parseInt(process.argv[3]) - 1;

async function main()
{
    switch(action){
        case 'add':
            await addTask(taskName);
            break;
        case 'view':
            await viewTask();
            break;
        case 'done':
            await markTaskDone(taskIndex);
            break;
        case 'delete':
            await deleteTask(taskIndex);
            break;
        case 'filter':
            const status = process.argv[3];
            await showFilterTasks(status);
            break;

        default:
            console.log('Invalid Action');
    }


}

main();
