import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/store';
import { GenericActions } from '../../store/genericSlice';
import { collection, DocumentData, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { toast } from 'react-toastify';
import { CollectionOptions } from "./types";
import { getQuery } from './getQuery';

type ListenerState = {
    name?: string
    unsubscribe?: () => void
}

export const useFireStore = <T extends DocumentData>(path: string) => {
    const listenersRef = useRef<ListenerState[]>([]);

    useEffect(() => {
        let listenerRefValue: ListenerState[] | null = null;

        if (listenersRef.current) {
            listenerRefValue = listenersRef.current;
        }

        return () => {
            if (listenerRefValue) {
                listenerRefValue.forEach(listener => {
                    // this is AI's line of code
                    if (listener.unsubscribe) {
                        listener.unsubscribe();
                    }
                });
            }
        };
    }, []);

    const dispatch = useAppDispatch();
    const loadCollection = useCallback((actions: GenericActions<T>, options?: CollectionOptions) => {
        dispatch(actions.loading());
        const query = getQuery(path, options);

        const listener = onSnapshot(query, {
            next: querySnapshot => {
                const data: DocumentData[] = [];
                if (querySnapshot.empty) {
                    dispatch(actions.success([] as unknown as T))
                    return;
                }
                querySnapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() })
                })
                dispatch(actions.success(data as unknown as T))
            },
            error: error => {
                dispatch(actions.error(error.message));
                console.log('Collection error:', error.message);
            }
        })
        listenersRef.current.push({ name: path, unsubscribe: listener });

    }, [dispatch, path])

    const loadDocument = useCallback((id: string, actions: GenericActions<T>) => {
        // turn on loading indicator
        dispatch(actions.loading());
        const docRef = doc(db, path, id);

        // create listener
        const listener = onSnapshot(docRef, {
            next: doc => {
                if (!doc.exists) {
                    dispatch(actions.error('Document does not exist'));
                    return;
                }
                dispatch(actions.success({ id: doc.id, ...doc.data() } as unknown as T))
            }
        })
        listenersRef.current.push({ name: path + '/' + id, unsubscribe: listener })
    }, [dispatch, path])

    // create a document
    const create = async (data: T) => {
        try {
            const ref = doc(collection(db, path));
            await setDoc(ref, data);
            return ref;
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // update a document
    const update = async (id: string, data: T) => {
        const docRef = doc(db, path, id);
        try {
            return await updateDoc(docRef, data);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // delete a document
    const remove = async (id: string) => {
        try {
            return await deleteDoc(doc(db, path, id));
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // user profiles
    const set = async (id: string, data: any) => {
        try {
            return await setDoc(doc(db, path, id), data);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return { loadCollection, loadDocument, create, update, remove, set }
}
