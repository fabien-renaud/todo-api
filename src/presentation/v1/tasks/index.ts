import express, {Request, Response, Router} from 'express';
import {TaskController} from '../../../controllers';
import {Task} from '../../../types';

const router: Router = express.Router();

router.get('/', (request: Request, response: Response) => {
    TaskController.findAll()
        .then((tasks: Task[]) => {
            if (!tasks) response.sendStatus(404);
            response.status(200).send(tasks);
        })
        .catch((error) => response.status(500).send(error));
});

router.get('/:id', (request: Request, response: Response) => {
    const {id} = request.params;
    TaskController.findById(id)
        .then((task: Task) => {
            if (!task) response.sendStatus(404);
            response.status(200).send(task);
        })
        .catch((error) => response.status(500).send(error));
});

router.post('/', (request: Request, response: Response) => {
    const task: Task = request.body;
    TaskController.create(task)
        .then(() => response.sendStatus(201))
        .catch((error) => response.status(500).send(error));
});

router.patch('/:id', (request: Request, response: Response) => {
    const {id} = request.params;
    const task: Task = request.body;
    TaskController.update(id, task)
        .then(() => response.sendStatus(204))
        .catch((error) => response.status(500).send(error));
});

router.delete('/:id', (request: Request, response: Response) => {
    const {id} = request.params;
    TaskController.remove(id)
        .then(() => response.sendStatus(204))
        .catch((error) => response.status(500).send(error));
});

export {router as tasks};
