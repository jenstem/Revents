import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
// import AppEvent from event.ts
import { AppEvent } from '../../../app/types/event';

type Props = {
    event:  AppEvent
    selectEvent: (event: AppEvent) => void;
}
// pass Props from event.ts to EventListItem
export default function EventListItem({ event, selectEvent }: Props) {
    return (
        <SegmentGroup>
            <Segment>
                <ItemGroup>
                    <Item>
                        {/* don't need to specify public folder, vite takes care of automatically */}
                        {/* use || "/user.png" to specify a default image if there is no image */}
                        <Item.Image size='tiny' circular src={event.hostPhotoURL || "/user.png"} />
                        <Item.Content>
                            <Item.Header>{event.title}</Item.Header>
                            <Item.Description>
                                Hosted by {event.hostedBy}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    {/* event.date, event.venue, event.hostPhotoURL, event.hostedBy etc
                    these all come from the arrays in the sampleData.ts file */}
                    <Icon name='clock' /> {event.date}
                    <Icon name='marker' /> {event.venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {event.attendees.map((attendee: any) => (
                        // need to give attendee a unique key
                        <EventListAttendee key={attendee.id} attendee={attendee} />
                    ))}
                </List>
            </Segment>
            {/* clearing will remove any float styling from the Segment element because we want to float the button to the right */}
            <Segment clearing>
                <span>{event.description}</span>
                <Button color='teal' floated='right' content='View' onClick={() => selectEvent(event)}/>
            </Segment>
        </SegmentGroup>
    )
}