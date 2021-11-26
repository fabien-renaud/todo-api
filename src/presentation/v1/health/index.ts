import express, {Request, Response, Router} from 'express';
import {version} from '../../../../package.json';

const router: Router = express.Router();

/**
 * Internet Draft
 * https://datatracker.ietf.org/doc/html/draft-inadarei-api-health-check
 */
router.get('/', (request: Request, response: Response) => {
    response
        .set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/health+json'
        })
        .send({
            status: 'pass',
            version: '1',
            releaseId: version
        });
});

export {router as health};
