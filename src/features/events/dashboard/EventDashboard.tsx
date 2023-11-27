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
}

export default function EventDashboard({ formOpen, setFormOpen }: Props) {
    const [events, setEvents] = useState<AppEvent[]>([]);

    // if we want something to only happen once then the last argument must be an empty array []
    useEffect(() => {
        setEvents(sampleData);
    }, []);
    return (
        <Grid>
            {/* 16 columns total */}
            <Grid.Column width={10}>
                {/* passing events down to EventList
                need to pass "props: any" in EventList.tsx*/}
                <EventList events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
                {/* if formOpen is set to true in App.tsx, then anything after the &&
                will be displayed, like the EventForm will disappear if we put it inside the {} */}
                {formOpen &&
                <EventForm setFormOpen={setFormOpen}/>}
            </Grid.Column>
        </Grid>
    )
}