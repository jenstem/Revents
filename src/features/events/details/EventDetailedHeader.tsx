import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AppEvent } from '../../../app/types/event';
import { useAppSelector } from '../../../app/store/store';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useFireStore } from '../../../app/hooks/firestore/useFirestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';

type Props = {
    event: AppEvent

}

export default function EventDetailedHeader({ event }: Props) {
    // bring in user
    const { currentUser } = useAppSelector(state => state.auth);
    // add loading status
    const [loading, setLoading] = useState(false);
    // bring in firestore hook
    const { update } = useFireStore('events');
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

    // function to toggle attendance
    async function toggleAttendance() {
        if (!currentUser) {
            toast.error('Must be logged in to do this');
            return;
        }
        setLoading(true);
        if (event.isGoing) {
            const attendee = event.attendees.find(x => x.id === currentUser.uid);
            await update(event.id, {
                // arrayRemove is a firebase function
                attendees: arrayRemove(attendee),
                attendeeIds: arrayRemove(currentUser.uid)
            })
            setLoading(false);
        } else {
            await update(event.id, {
                // arrayUnion is a firebase function
                attendees: arrayUnion({
                    id: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                }),
                attendeeIds: arrayUnion(currentUser.uid)
                })
                setLoading(false);
            }
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
                        // add an onClick event and loading
                        onClick={toggleAttendance}
                        loading={loading}
                    />
                )}

            </Segment>
        </Segment.Group>

    )
}