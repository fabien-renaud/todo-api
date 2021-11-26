import {List} from '../types';
import {FirestoreService} from '../services';

async function findAll(): Promise<List[]> {
    return FirestoreService.findAll<List>('lists');
}

async function findById(id: string): Promise<List> {
    return FirestoreService.findById<List>('lists', id);
}

async function create(list: List): Promise<void> {
    await FirestoreService.create<List>('lists', list);
}

async function update(id: string, list: List): Promise<void> {
    await FirestoreService.update<List>('lists', id, list);
}

async function remove(id: string): Promise<void> {
    await FirestoreService.remove('lists', id);
}

export const ListController = {findAll, findById, create, update, remove};
