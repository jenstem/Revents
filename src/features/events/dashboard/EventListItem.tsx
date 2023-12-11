import { Button, Icon, Item, ItemGroup, Label, List, Segment, SegmentGroup } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
// import AppEvent from event.ts
import { AppEvent } from '../../../app/types/event';
import { Link } from "react-router-dom";
// import { deleteEvent } from "../eventSlice";
// import { useAppDispatch } from "../../../app/store/store";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { db } from "../../../app/config/firebase";
// import { deleteDoc, doc } from "firebase/firestore";

// remove because we are using CANCEL instead of DELETE
// import { useFireStore } from "../../../app/hooks/firestore/useFirestore";

// import { set } from "firebase/database";

type Props = {
    event: AppEvent
    // do not need when using router
    // selectEvent: (event: AppEvent) => void;
    // deleteEvent: (eventId: string) => void;
}
// pass Props from event.ts to EventListItem
// revising when using router
// export default function EventListItem({ event, selectEvent, deleteEvent }: Props) {
export default function EventListItem({ event }: Props) {

    // add remove from CRUD from useFirestore.ts
    // REMOVE this in order to add CANCEL event
    // const { remove } = useFireStore('events');

    // add hook for dispatch
    // const dispatch = useAppDispatch();

    // remove after adding CRUD from useFirestore.ts
    // const [loading, setLoading] = useState(false);

    // remove after adding CRUD from useFirestore.ts
    // async function removeEvent() {
    // setLoading(true);
    // try {
    //     await deleteDoc(doc(db, 'events', event.id));
    //     // setLoading(false);
    // } catch (error: any) {
    //     console.log(error);
    //     toast.error(error.message);
    //     // setLoading(false);
    //     // instead of having setLoading(false) in each catch block, we can use finally
    //     // to use setLoading only once
    // } finally {
    //     setLoading(false);
    // }
    // }

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

                            {/* add conditional rendering for cancelled events */}
                            {event.isCancelled && (
                                <Label
                                    style={{ top: '-40px' }}
                                    ribbon='right'
                                    color='red'
                                    content='This event has been cancelled'
                                />
                            )}

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
                    {event.attendees.map(attendee => (
                        // need to give attendee a unique key
                        <EventListAttendee key={attendee.id} attendee={attendee} />
                    ))}
                </List>
            </Segment>
            {/* clearing will remove any float styling from the Segment element because we want to float the button to the right */}
            <Segment clearing>
                <span>{event.description}</span>
                {/* get ride of click events when using router */}
                {/* <Button color='red' floated='right' content='Delete' onClick={() => deleteEvent(event.id)}/>
                <Button color='teal' floated='right' content='View' onClick={() => selectEvent(event)}/> */}
                {/* <Button loading={loading} onClick={() => dispatch(deleteEvent(event.id))}  color='red' floated='right' content='Delete' /> */}
                {/* Add removeEvent function to delete event */}

                {/* remove after adding CRUD from useFirestore.ts
                <Button loading={loading} onClick={removeEvent} color='red' floated='right' content='Delete' /> */}

                {/* Remove the delete button because we are going to add CANCEL instead */}
                {/* <Button onClick={() => remove(event.id)} color='red' floated='right' content='Delete' /> */}

                <Button as={Link} to={`/events/${event.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </SegmentGroup>
    )
}