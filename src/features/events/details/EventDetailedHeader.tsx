import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AppEvent } from '../../../app/types/event';

type Props = {
    event: AppEvent

}

export default function EventDetailedHeader({ event }: Props) {
    const eventImageStyle = {
        filter: 'brightness(30%)'
    }

    const eventImageTextStyle = {
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        width: '100%',
        height: 'auto',
        color: 'white'
    }


    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={`/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle} />

                <Segment basic style={eventImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={event.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{event.date}</p>
                                <p>
                                    Hosted by <strong>{event.hostedBy}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom" clearing>
                {event.isHost ? (
                    <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
                        Manage Event
                    </Button>
                ) : (
                    <Button
                        content={event.isGoing ? 'Cancel My Place' : 'JOIN THIS EVENT'}
                        color={event.isGoing ? 'grey' : 'teal'}
                    />
                )}

            </Segment>
        </Segment.Group>

    )
}