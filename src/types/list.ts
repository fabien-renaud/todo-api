import {Task} from './task';
import {Status} from './status';

export type List = {
    id: string;
    name: string;
    tasks: Task[];
    status: Status;
};
