import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSideBar from './EventDetailedSideBar';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/store';


export default function EventDetailedPage() {
    // add useParams hook
    const { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));

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