import {Task} from '../types';
import {FirestoreService} from '../services';

async function findAll(): Promise<Task[]> {
    return FirestoreService.findAll<Task>('tasks');
}

async function findById(id: string): Promise<Task> {
    return FirestoreService.findById<Task>('tasks', id);
}

async function create(task: Task): Promise<void> {
    await FirestoreService.create<Task>('tasks', task);
}

async function update(id: string, task: Task): Promise<void> {
    await FirestoreService.update<Task>('tasks', id, task);
}

async function remove(id: string): Promise<void> {
    await FirestoreService.remove('tasks', id);
}

export const TaskController = {findAll, findById, create, update, remove};
