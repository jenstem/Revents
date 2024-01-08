import { Label, Item, Segment } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import { Link } from "react-router-dom";

// add Props
type Props = {
    event: AppEvent
}

export default function EventDetailedSideBar({ event }: Props) {
    return (
        <>
            <Segment
                textAlign="center"
                style={{ border: 'none' }}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {/* Change 2 People Going to this instead */}
                {event.attendees.length} People Going
            </Segment>
            <Segment attached>
                <Item.Group relaxed divided>
                    {/* loop over attendees and because we're looping give it a key */}
                    {event.attendees.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.id}>
                            {/* highlight who the host is
                            will add an orange ribbon to whoever the host is in the sidebar */}
                            {event.hostUid === attendee.id && (
                                <Label style={{position: 'absolute'}} color="orange" ribbon="right" content="Host" >
                                    Host
                                </Label>
                            )}
                            {/* update user image */}
                            <Item.Image size="tiny" src={attendee.photoURL || '/user.png'} />
                            <Item.Content verticalAlign="middle">
                                {/* Change to Link, which comes from react router dom */}
                                {/* Add "to" this will allow us to go to the user's profile */}
                                <Item.Header as={Link} to={`/profiles/${attendee.id}`}>
                                    {/* update user name
                                    if you get an error, check the event.ts
                                    and make sure displayName is spelled the same */}
                                    <span>{attendee.displayName}</span>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    ))}
                    <Item style={{ position: 'relative' }}>
                        {/* update user image */}
                        <Item.Image size="tiny" src={'/user.png'} />
                        <Item.Content verticalAlign="middle">
                            <Item.Header as="h3">
                                <span>Tom</span>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </>
    )
}