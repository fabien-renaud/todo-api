import express, {Router} from 'express';
import {health} from './health';

const router: Router = express.Router();

router.use('/health', health);

export {router as v1};
