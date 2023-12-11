import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/store';
import { GenericActions } from '../../store/genericSlice';
import { collection, DocumentData, onSnapshot, doc } from 'firebase/firestore';
import { db } from "../../config/firebase";

type ListenerState = {
    name?: string
    unsubscribe?: () => void
}

// every hook has to start with use
export const useFireStore = <T>(path: string) => {
    // store listener references so we can unsubscribe from them
    // useRef that lets you make changes and you won't have to re-render
    // use Ref will persist for the full lifetime of the component
    const listenersRef = useRef<ListenerState[]>([]);
    // useEffect is a hook that lets you unsubscribe from a listener
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

    // function that listens to our collection
    // useCallback is a React hook that lets you memoize a function
    const loadCollection = useCallback((actions: GenericActions<T>) => {
        dispatch(actions.loading());

        const query = collection(db, path);

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
                // check to see if doc exists
                if (!doc.exists) {
                    dispatch(actions.error('Document does not exist'));
                    return;
                }
                dispatch(actions.success({ id: doc.id, ...doc.data() } as unknown as T))
            }
        })
        listenersRef.current.push({name: path + '/' + id, unsubscribe: listener})
        // add dependencies
    }, [dispatch, path])

    return { loadCollection, loadDocument }
}
