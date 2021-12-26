import type {Request, Response} from 'express';
import type {CRUDService} from './firestore-service';

type CRUDOperations = {
    getAll: <T>(request: Request, response: Response) => Promise<void>;
    getById: <T>(request: Request, response: Response) => Promise<void>;
    create: <T>(request: Request, response: Response) => Promise<void>;
    update: <T>(request: Request, response: Response) => Promise<void>;
    remove: <T>(request: Request, response: Response) => Promise<void>;
};

function getAll<T>(service: CRUDService) {
    return async function (request: Request, response: Response): Promise<void> {
        service
            .findAll()
            .then((resources: T[]) => response.status(200).send(resources))
            .catch((error) => response.status(500).send(error));
    };
}

function getById<T>(service: CRUDService) {
    return async function (request: Request, response: Response): Promise<void> {
        const {id} = request.params;
        service
            .findById(id)
            .then((resource: T) => {
                if (!resource) response.sendStatus(404);
                response.status(200).send(resource);
            })
            .catch((error) => response.status(500).send(error));
    };
}

function create<T>(service: CRUDService) {
    return async function (request: Request, response: Response): Promise<void> {
        const resource: T = request.body;
        service
            .create(resource)
            .then(() => response.sendStatus(201))
            .catch((error) => response.status(500).send(error));
    };
}

function update<T>(service: CRUDService) {
    return async function (request: Request, response: Response): Promise<void> {
        const {id} = request.params;
        const resource: T = request.body;
        service
            .update(id, resource)
            .then(() => response.sendStatus(204))
            .catch((error) => response.status(500).send(error));
    };
}

function remove<T>(service: CRUDService) {
    return async function (request: Request, response: Response): Promise<void> {
        const {id} = request.params;
        service
            .remove(id)
            .then(() => response.sendStatus(204))
            .catch((error) => response.status(500).send(error));
    };
}

export function createOperations(service: CRUDService): CRUDOperations {
    return {
        getAll: getAll(service),
        getById: getById(service),
        create: create(service),
        update: update(service),
        remove: remove(service)
    };
}
