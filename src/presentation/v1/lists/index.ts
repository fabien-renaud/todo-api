import express, {Request, Response} from 'express';
import {ListController} from '../../../controllers';
import {List} from '../../../types';

const router = express.Router();

router.get('/', (request: Request, response: Response) => {
    ListController.findAll()
        .then((lists: List[]) => {
            if (!lists) response.sendStatus(404);
            response.status(200).send(lists);
        })
        .catch((error) => response.status(500).send(error));
});

router.get('/:id', (request: Request, response: Response) => {
    const {id} = request.params;
    ListController.findById(id)
        .then((list: List) => {
            if (!list) response.sendStatus(404);
            response.status(200).send(list);
        })
        .catch((error) => response.status(500).send(error));
});

router.post('/', (request: Request, response: Response) => {
    const list: List = request.body;
    ListController.create(list)
        .then(() => response.sendStatus(201))
        .catch((error) => response.status(500).send(error));
});

router.patch('/:id', (request: Request, response: Response) => {
    const {id} = request.params;
    const list: List = request.body;
    ListController.update(id, list)
        .then(() => response.sendStatus(204))
        .catch((error) => response.status(500).send(error));
});

router.delete('/:id', (request: Request, response: Response) => {
    const {id} = request.params;
    ListController.remove(id)
        .then(() => response.sendStatus(204))
        .catch((error) => response.status(500).send(error));
});

export {router as lists};
