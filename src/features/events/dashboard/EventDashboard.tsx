import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../app/store/store";
import { useEffect } from "react"
import { actions } from "../eventSlice";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import EventFilters from "./EventFilters";
import { useState } from "react";
import { QueryOptions } from '../../../app/hooks/firestore/types';
import EventListItemPlaceholder from "./EventListItemPlaceholder";


export default function EventDashboard() {
    const { data: events, status } = useAppSelector(state => state.events);
    const { loadCollection } = useFireStore('events');
    const [query, setQuery] = useState<QueryOptions[]>([
        { attribute: 'date', operator: '>=', value: new Date() }
    ])

    useEffect(() => {
        loadCollection(actions, {
            queries: query
        })
    }, [loadCollection, query])

    return (
        <Grid>
            <Grid.Column width={10}>
                {status === 'loading' ? (
                    <>
                        <EventListItemPlaceholder />
                        <EventListItemPlaceholder />
                    </>
                ) : (
                    <EventList events={events} />
                )}
                <EventList events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventFilters setQuery={setQuery} />
            </Grid.Column>
        </Grid>
    )
}