import {Firestore, QueryDocumentSnapshot, QuerySnapshot} from '@google-cloud/firestore';

const database: Firestore = new Firestore({projectId: process.env.PROJECT_ID});

async function findAll<T>(collectionName: string): Promise<T[]> {
    const query: QuerySnapshot = await database.collection(collectionName).get();
    return query.docs.map((doc: QueryDocumentSnapshot<T>) => doc.data());
}

async function findById<T>(collectionName: string, id: string): Promise<T> {
    return Promise.resolve(undefined);
}

async function create<T>(collectionName: string, document: T): Promise<void> {
    await database.collection(collectionName).add(document);
}

async function update<T>(collectionName: string, id: string, document: T): Promise<void> {
    await Promise.resolve();
}

async function remove(collectionName: string, id: string): Promise<void> {
    await Promise.resolve();
}

export const FirestoreService = {findAll, findById, create, update, remove};
