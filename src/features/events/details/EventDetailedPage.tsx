import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSideBar from './EventDetailedSideBar';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAppDispatch } from '../../../app/store/store';
import { db } from '../../../app/config/firebase';
// genericSlice import actions instead of setEvents
import { actions } from '../eventSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default function EventDetailedPage() {
    // add useParams hook
    const { id } = useParams();
    const event = useAppSelector(state => state.events.data.find(e => e.id === id));
    const dispatch = useAppDispatch();
    // add loading state
    const [loading, setLoading] = useState(true);

    // use the useEffect hook to listen to the changes in the URL
    useEffect(() => {
        // when we add !id, then we're saying if we don't have an id, then we're going to return
        // but we also need to use a dependency array, so we're going to add id to the dependency array
        if (!id) return;
        const unsubscribe = onSnapshot(doc(db, 'events', id), {
            next: doc => {
                // if you get an error from id, add "as any" to the end of the object
                // change setEvents to actions.success after creating genericSlice
                dispatch(actions.success({id: doc.id, ...doc.data()} as any))
                setLoading(false);
            },
            error: err => {
                console.log(err);
                toast.error(err.message);
                setLoading(false);
            }
        })
        return () => unsubscribe();
        // this is the dependency array with id, otherwise leave it blank so the useEffect hook only runs once
        // dispatch also needs to be added to the dependency array
    }, [id, dispatch])

    if (loading) return <LoadingComponent />
    // check to see if we have the event, if we do NOT have the event
    if (!event) return <h2>Event not found</h2>
    // if we do have the event then we're going to pass it down to our EventDetailedHeader
    // and EventDetailedInfo components

    return (
        <Grid>
            {/* right hand side */}
            <Grid.Column width={10}>
                <EventDetailedHeader event={event}/>
                <EventDetailedInfo event={event}/>
                <EventDetailedChat />
            </Grid.Column>
            {/* left hand side */}
            <Grid.Column width={6}>
                <EventDetailedSideBar />
            </Grid.Column>
        </Grid>
    )
}