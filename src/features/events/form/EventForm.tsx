import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useEffect, useState, ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { createEvent, updateEvent } from "../eventSlice";
import { createId } from "@paralleldrive/cuid2";
import { FieldValues, useForm } from "react-hook-form";


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
    // need to change const { id } = use Params() to let { id } = useParams()
    // we need to change the id to let because we'll be updating the id
    let { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // this comes from react-hook-form
    const { register, handleSubmit, formState: {errors, isValid, isSubmitting} } = useForm({
        mode: 'onTouched'
    });

    // create an object we can pass into our useState
    // ?? = if selected event is null use what's inside this const
    // do NOT need selectedEvent when using router
    // const initialValues = selectedEvent ?? {
    // we replace this with event ?? meaning use event otherwise use the following
    // with react-hook-form we don't need to use initialValues
    // const initialValues = event ?? {
    //     title: '',
    //     category: '',
    //     description: '',
    //     city: '',
    //     venue: '',
    //     date: ''
    // }

    // state
    // with react-hook-form we don't need to use state
    // const [values, setValues] = useState(initialValues);


    // what will happen when we submit our form
    function onSubmit(data: FieldValues) {
        console.log(data);
        // remove any props you're no longer using when using router
        // check to see if there's anything inside selectedEvent
        // if we do have a selectedEvent then we want to update the event
        // id = id ?? createId();
        // event
        //     ? dispatch(updateEvent({ ...event, ...values }))
        //     : dispatch(createEvent({ ...values, id, hostedBy: 'bob', attendees: [], hostPhotoURL: '' }));
        // we want to navigate to the event we just updated or created
        // navigate(`/events/${id}`);
    }

    // NO LONGER need this function, register with react-hook-form takes its place
    // function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    //     const { name, value } = e.target;
    //     // we want to spread the values and then set the name to the value of just update one value
    //     // ...values gives us all values and [name]: value specifies which value to update
    //     setValues({ ...values, [name]: value })
    // }

    return (
        <Segment clearing>
            {/* : = or */}
            {/* remove props you aren't using with router */}
            {/* <Header content={selectedEvent ? 'Update Event' : 'Create Event'} /> */}
            {/* replace selectedEvent with event because of useParam hook */}
            {/* sub = subheader */}
            <Header content={'Event details'} sub color='teal'/>
            {/* we want to use the react-hook-form onSubmit */}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    placeholder='Event Title'
                    defaultValue={event?.title || ''}
                    // use {required: true} for a required field
                    {...register('title', {required: true})}
                    // this will notify users that the title is required
                    error={errors.title && 'Title is required'}
                // we'll use the name and value to update the state
                // name='title'
                // this is a change event for an HTML element
                // onChange={e => handleInputChange(e)}
                />

                <Form.Input
                    placeholder='Category'
                    defaultValue={event?.category || ''}
                    {...register('category', {required: 'Category is required'})}
                    error={errors.category && errors.category.message}
                />
                {/* Form.TextArea is a text area for a form */}
                <Form.TextArea
                    placeholder='Description'
                    defaultValue={event?.description || ''}
                    {...register('description', {required: 'Description is required'})}
                    error={errors.description && errors.description.message}
                />
                <Header sub content='Location details' color='teal'/>
                <Form.Input
                    placeholder='City'
                    defaultValue={event?.city || ''}
                    {...register('city', {required: 'City is required'})}
                    error={errors.city && errors.city.message}
                />

                <Form.Input
                    placeholder='Venue'
                    defaultValue={event?.venue || ''}
                    {...register('venue', {required: 'Venue is required'})}
                    error={errors.venue && errors.venue.message}
                />

                <Form.Input
                    type='date'
                    placeholder='Date'
                    defaultValue={event?.date || ''}
                    {...register('date', {required: 'Date is required'})}
                    error={errors.date && errors.date.message}
                />

                <Button loading={isSubmitting} type='submit' disabled={!isValid} floated='right' positive content='Submit' />
                {/* the onClick is set to false because we want to close the form
                    or rather have the form disappear when we click the cancel button */}
                {/* remove onClick when using router */}
                {/* <Button onClick={() => setFormOpen(false)} type='button' floated='right' content='Cancel' /> */}
                <Button disabled={isSubmitting} as={Link} to='/events' type='button' floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
}