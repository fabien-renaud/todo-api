import {Status} from './status';

export type Task = {
    id: string;
    name: string;
    description?: string;
    status: Status;
};
