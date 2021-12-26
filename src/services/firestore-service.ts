import {Firestore, QueryDocumentSnapshot, QuerySnapshot} from '@google-cloud/firestore';

export type CRUDService = {
    findAll: <T>() => Promise<T[]>,
    findById: <T>(id: string) => Promise<T>,
    create: <T>(document: T) => Promise<void>,
    update: <T>(id: string, document: T) => Promise<void>,
    remove: <T>(id: string) => Promise<void>
}

function findAll<T>(database: Firestore, collectionName: string) {
    return async function <T>(): Promise<T[]> {
        const query: QuerySnapshot = await database.collection(collectionName).get();
        return query.docs.map((doc: QueryDocumentSnapshot<T>) => doc.data());
    };
}

function findById<T>(database: Firestore, collectionName: string) {
    return async function <T>(id: string): Promise<T> {
        return Promise.resolve(undefined);
    };
}

function create<T>(database: Firestore, collectionName: string) {
    return async function <T>(document: T): Promise<void> {
        await database.collection(collectionName).add(document);
    };
}

function update<T>(database: Firestore, collectionName: string) {
    return async function <T>(id: string, document: T): Promise<void> {
        await Promise.resolve();
    };
}

function remove<T>(database: Firestore, collectionName: string) {
    return async function (id: string): Promise<void> {
        await Promise.resolve();
    };
}

export function createService<T>(database: Firestore, collectionName: string): CRUDService {
    return {
        findAll: findAll<T>(database, collectionName),
        findById: findById<T>(database, collectionName),
        create: create<T>(database, collectionName),
        update: update<T>(database, collectionName),
        remove: remove<T>(database, collectionName)
    };
}
