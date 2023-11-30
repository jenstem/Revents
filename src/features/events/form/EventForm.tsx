import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useEffect, useState, ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";


// import { AppEvent } from "../../../app/types/event";
// import { createId } from "@paralleldrive/cuid2";


// do NOT need when using router
// type Props = {
//     setFormOpen: (value: boolean) => void;
//     addEvent: (event: AppEvent) => void;
//     // need to specify if it's an AppEvent or null, otherwise you'll get errors with AppEvent in code
//     selectedEvent: AppEvent | null
//     // add updateEvent to Props
//     updateEvent: (event: AppEvent) => void;
// }
// add updateEvent to Props
// remove props when using router
// export default function EventForm({ setFormOpen, addEvent, selectedEvent, updateEvent }: Props) {
    export default function EventForm() {
    // add useParams hook
    const { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));

    // create an object we can pass into our useState
    // ?? = if selected event is null use what's inside this const
    // do NOT need selectedEvent when using router
    // const initialValues = selectedEvent ?? {
        // we replace this with event ?? meaning use event otherwise use the following
        const initialValues = event ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    }

    // state
    const [values, setValues] = useState(initialValues);


    // what will happen when we submit our form
    function onSubmit() {
        console.log(values);
        // remove any props you're no longer using when using router
        // check to see if there's anything inside selectedEvent
        // if we do have a selectedEvent then we want to update the event
        // selectedEvent
        //     ? updateEvent({...selectedEvent, ...values})
        //     : addEvent({...values, id: createId(), hostedBy: 'bob', attendees: [], hostPhotoURL: ''});
        // // after we submit our info into Create Event form, we want to close the form
        // setFormOpen(false);
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        // we want to spread the values and then set the name to the value of just update one value
        // ...values gives us all values and [name]: value specifies which value to update
        setValues({ ...values, [name]: value })
    }

    return (
        <Segment clearing>
            {/* : = or */}
            {/* remove props you aren't using with router */}
            {/* <Header content={selectedEvent ? 'Update Event' : 'Create Event'} /> */}
            {/* replace selectedEvent with event because of useParam hook */}
            <Header content={event ? 'Update event' : 'Create Event'} />
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <input
                        type='text'
                        placeholder='Event Title'
                        value={values.title}
                        // we'll use the name and value to update the state
                        name='title'
                        // this is a change event for an HTML element
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder='Category'
                        value={values.category}
                        name='category'
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder='Description'
                        value={values.description}
                        name='description'
                        onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder='City'
                        value={values.city}
                        name='city'
                        onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input type='text' placeholder='Venue'
                        value={values.venue}
                        name='venue'
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <input type='date' placeholder='Date'
                        value={values.date}
                        name='date'
                        onChange={e => handleInputChange(e)}
                    />
                </Form.Field>
                <Button type='submit' floated='right' positive content='Submit' />
                {/* the onClick is set to false because we want to close the form
                    or rather have the form disappear when we click the cancel button */}
                    {/* remove onClick when using router */}
                {/* <Button onClick={() => setFormOpen(false)} type='button' floated='right' content='Cancel' /> */}
                <Button as={Link} to='/events' type='button' floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
}