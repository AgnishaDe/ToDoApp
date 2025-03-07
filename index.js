
import { addTask , viewTask , markTaskDone , deleteTask , showFilterTasks, sortTasks} from './functionManager.js';



const action = process.argv[2];
const taskName = process.argv.slice(3).join(' ');
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
        case 'sort':
            {
            const criterion = process.argv[3]?.trim();
            await sortTasks(criterion);
            break;
            }

        default:
            console.log('Invalid Action');
    }


}

main();
