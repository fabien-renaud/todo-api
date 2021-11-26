import express, {Router} from 'express';
import {health} from './health';
import {lists} from './lists';
import {tasks} from './tasks';

const router: Router = express.Router();

router.use('/health', health);
router.use('/lists', lists);
router.use('/tasks', tasks);

export {router as v1};
