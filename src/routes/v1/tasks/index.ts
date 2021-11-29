import type {Request, Response} from 'express';
import {TaskController} from '../../../controllers';
import {Task} from '../../../types';

const getAllTasks = (request: Request, response: Response) => {
    TaskController.findAll()
        .then((tasks: Task[]) => {
            if (!tasks) response.sendStatus(404);
            response.status(200).send(tasks);
        })
        .catch((error) => response.status(500).send(error));
};

const getTaskById = (request: Request, response: Response) => {
    const {id} = request.params;
    TaskController.findById(id)
        .then((task: Task) => {
            if (!task) response.sendStatus(404);
            response.status(200).send(task);
        })
        .catch((error) => response.status(500).send(error));
};

const createTask = (request: Request, response: Response) => {
    const task: Task = request.body;
    TaskController.create(task)
        .then(() => response.sendStatus(201))
        .catch((error) => response.status(500).send(error));
};

const updateTask = (request: Request, response: Response) => {
    const {id} = request.params;
    const task: Task = request.body;
    TaskController.update(id, task)
        .then(() => response.sendStatus(204))
        .catch((error) => response.status(500).send(error));
};

const removeTask = (request: Request, response: Response) => {
    const {id} = request.params;
    TaskController.remove(id)
        .then(() => response.sendStatus(204))
        .catch((error) => response.status(500).send(error));
};

export {getAllTasks, getTaskById, createTask, updateTask, removeTask};
