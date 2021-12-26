import {database} from '../../core/database';
import {createService} from '../../services';
import {createOperations} from '../../services';
import {List} from '../../types';

const ListService = createService<List>(database, 'list');
export const {
    getAll: getAllLists,
    getById: getListById,
    create: createList,
    update: updateList,
    remove: removeList
} = createOperations(ListService);
