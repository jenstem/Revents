import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSideBar from './EventDetailedSideBar';

export default function EventDetailedPage() {
    return (
        <Grid>
            {/* right hand side */}
            <Grid.Column width={10}>
                <EventDetailedHeader />
                <EventDetailedInfo />
                <EventDetailedChat />
            </Grid.Column>
            {/* left hand side */}
            <Grid.Column width={6}>
                <EventDetailedSideBar />
            </Grid.Column>
        </Grid>
    )
}