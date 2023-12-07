import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
// import EventForm from "../form/EventForm";
// import { sampleData } from "../../../app/api/sampleData";
import { useEffect } from "react"
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../../../app/config/firebase";
import { AppEvent } from "../../../app/types/event";
import App from "../../../app/layout/App";
import { setEvents } from "../eventSlice";
import { useState } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

// do not need props when using router
// add a type to store the Props
// type Props = {
//     formOpen: boolean
//     setFormOpen: (value: boolean) => void
//     // need to specify null in the type Props
//     selectEvent: (event: AppEvent | null) => void
//     selectedEvent: AppEvent | null
// }
// remove props when using router
// export default function EventDashboard({ formOpen, setFormOpen, selectEvent, selectedEvent }: Props) {
    export default function EventDashboard() {
        const {events} = useAppSelector(state => state.events);
        const dispatch = useAppDispatch();
        // set up loading
        const [loading, setLoading] = useState(true);

        // this is how we listen to data from firestore
        // populate events using useEffect
        useEffect(() => {
            // create a variable to store the query in
            // inside the query, specify the collection, the database(from firebase) and the path to the collection
            const q = query(collection(db, 'events'));
            // onSnapshot is a listener that will listen to any changes in the database
            // pass onSnapshot to the query and observer object = next: querySnapshot
            // querySnapshot is a snapshot of the data in the database
            const unsubscribe = onSnapshot(q, {
                // what will happen next after we receive the data
                // we'll get a querySnapshot returned from the onSnapshot method
                next: querySnapshot => {
                    // create an empty array to store the events
                    const evts: AppEvent[] = [];
                    // for each document, we'll push that document into an array
                    querySnapshot.forEach(doc => {
                        // push the document id and the data into the array
                        // it doesn't understand what the data is coming back as
                        // so we specify as AppEvent, what it can expect
                        evts.push({id: doc.id, ...doc.data()} as AppEvent)
                    })
                    // dispatch the events to the store
                    dispatch(setEvents(evts));
                    // set loading to false
                    setLoading(false);
                },
                // specify what to do in case of error
                // and turn off loading
                error: err => {
                    console.log(err)
                    setLoading(false);
                },
                // specify what to do when it's complete
                // this will never be called because it's a never ending stream of events
                complete: () => console.log('never will see this!')
            });
            // no longer listening when we leave this component
            return () => unsubscribe()
            // empty array means it will only run once
            // but we need to pass dispatch in the array because it's a dependency
        }, [dispatch])

        // check if loading is true
        // if it is, then display LoadingComponent file
        if (loading) return <LoadingComponent />

    // events is an array of AppEvent
        // NO LONGER need useState because we are using store/routing
    // const [events, setEvents] = useState<AppEvent[]>([]);

    // if we want something to only happen once then the last argument must be an empty array []
    // NO LONGER need useEffect because we are using store/routing
    // useEffect(() => {
    //     setEvents(sampleData);
    // }, [])

    // do not need if using router
    // function addEvent(event: AppEvent) {
    //     // we want to swap our old array with our new array
    //     // do not use push because it will mutate the array
    //     // this gives us a new array that we will add the new event to [...prevState, event]
    //     setEvents(prevState => {
    //         return [...prevState, event]
    //     })
    // }

    // function updateEvent(updatedEvent: AppEvent) {
    //     // update event, if the id matches then we want to update the event
    //     // if the id doesn't match then we want to return the event as is
    //     setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
    //     // in order for this line to allow null, we need to specify null in the type Props
    //     selectEvent(null);
    //     // close the form
    //     setFormOpen(false);
    // }

    // this will return an array of everything but the event ID
    // function deleteEvent(eventID: string) {
    //         setEvents(events.filter(evt => evt.id !== eventID));
    // }


    return (
        <Grid>
            {/* 16 columns total */}
            <Grid.Column width={10}>
                {/* passing events down to EventList
                need to pass "props: any" in EventList.tsx*/}
                {/* do not need props when using router */}
                {/* <EventList events={events} selectEvent={selectEvent} deleteEvent={deleteEvent}/> */}
                <EventList events={events}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Filters</h2>
                {/* if formOpen is set to true in App.tsx, then anything after the &&
                will be displayed, like the EventForm will disappear if we put it inside the {} */}
                {/* {formOpen &&
                <EventForm setFormOpen={setFormOpen}
                            updateEvent={updateEvent}
                            addEvent={addEvent}
                            selectedEvent={selectedEvent}
                            // add a key to EventForm so it will re-render when we select a new event
                            // says if selectedEvent is null, then use 'create' as the key
                            key={selectedEvent ? selectedEvent.id : 'create'}
                            />} */}
            </Grid.Column>
        </Grid>
    )
}