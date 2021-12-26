import {Firestore} from '@google-cloud/firestore';

export const database: Firestore = new Firestore({projectId: process.env.PROJECT_ID});
