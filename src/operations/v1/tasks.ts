import {database} from '../../core/database';
import {createService} from '../../services';
import {createOperations} from '../../services';
import {Task} from '../../types';

const TaskService = createService<Task>(database, 'task');
export const {
    getAll: getAllTasks,
    getById: getTaskById,
    create: createTask,
    update: updateTask,
    remove: removeTask
} = createOperations(TaskService);
