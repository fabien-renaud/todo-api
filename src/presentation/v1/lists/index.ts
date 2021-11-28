import express, {Router, Request, Response} from 'express';
import validator from 'express-joi-validation';
import {idSchema} from '../common-schema';
import {listSchema} from './list-schema';
import {ListController} from '../../../controllers';
import {List} from '../../../types';

const router: Router = express.Router();
const validate = validator.createValidator();

router.get('/', (request: Request, response: Response) => {
    ListController.findAll()
        .then((lists: List[]) => {
            if (!lists) response.sendStatus(404);
            response.status(200).send(lists);
        })
        .catch((error) => response.status(500).send(error));
});

router.get('/:id', validate.params(idSchema), (request: Request, response: Response) => {
    const {id} = request.params;
    ListController.findById(id)
        .then((list: List) => {
            if (!list) response.sendStatus(404);
            response.status(200).send(list);
        })
        .catch((error) => response.status(500).send(error));
});

router.post('/', validate.body(listSchema), (request: Request, response: Response) => {
    const list: List = request.body;
    ListController.create(list)
        .then(() => response.sendStatus(201))
        .catch((error) => response.status(500).send(error));
});

router.patch('/:id', validate.params(idSchema), validate.body(listSchema), (request: Request, response: Response) => {
    const {id} = request.params;
    const list: List = request.body;
    ListController.update(id, list)
        .then(() => response.sendStatus(204))
        .catch((error) => response.status(500).send(error));
});

router.delete('/:id', validate.params(idSchema), (request: Request, response: Response) => {
    const {id} = request.params;
    ListController.remove(id)
        .then(() => response.sendStatus(204))
        .catch((error) => response.status(500).send(error));
});

export {router as lists};
