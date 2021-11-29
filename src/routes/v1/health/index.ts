import express, {Request, Response, Router} from 'express';
import {version} from '../../../../package.json';

/**
 * Internet Draft
 * https://datatracker.ietf.org/doc/html/draft-inadarei-api-health-check
 */
const health = (request: Request, response: Response) => {
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
};

export {health};
