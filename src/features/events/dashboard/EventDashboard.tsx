import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from "../../../app/api/sampleData";
import { useEffect, useState } from "react"
import { AppEvent } from "../../../app/types/event";


// add a type to store the Props
type Props = {
    formOpen: boolean
    setFormOpen: (value: boolean) => void
    // need to specify null in the type Props
    selectEvent: (event: AppEvent | null) => void
    selectedEvent: AppEvent | null
}

export default function EventDashboard({ formOpen, setFormOpen, selectEvent, selectedEvent }: Props) {
    // events is an array of AppEvent
    const [events, setEvents] = useState<AppEvent[]>([]);

    // if we want something to only happen once then the last argument must be an empty array []
    useEffect(() => {
        setEvents(sampleData);
    }, [])

    function addEvent(event: AppEvent) {
        // we want to swap our old array with our new array
        // do not use push because it will mutate the array
        // this gives us a new array that we will add the new event to [...prevState, event]
        setEvents(prevState => {
            return [...prevState, event]
        })
    }

    function updateEvent(updatedEvent: AppEvent) {
        // update event, if the id matches then we want to update the event
        // if the id doesn't match then we want to return the event as is
        setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
        // in order for this line to allow null, we need to specify null in the type Props
        selectEvent(null);
        // close the form
        setFormOpen(false);
    }


    return (
        <Grid>
            {/* 16 columns total */}
            <Grid.Column width={10}>
                {/* passing events down to EventList
                need to pass "props: any" in EventList.tsx*/}
                <EventList events={events} selectEvent={selectEvent} />
            </Grid.Column>
            <Grid.Column width={6}>
                {/* if formOpen is set to true in App.tsx, then anything after the &&
                will be displayed, like the EventForm will disappear if we put it inside the {} */}
                {formOpen &&
                <EventForm setFormOpen={setFormOpen}
                            updateEvent={updateEvent}
                            addEvent={addEvent}
                            selectedEvent={selectedEvent}
                            // add a key to EventForm so it will re-render when we select a new event
                            // says if selectedEvent is null, then use 'create' as the key
                            key={selectedEvent ? selectedEvent.id : 'create'}
                            />}
            </Grid.Column>
        </Grid>
    )
}