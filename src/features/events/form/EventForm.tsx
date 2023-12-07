import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
// import { createEvent, updateEvent } from "../eventSlice";
// import { createId } from "@paralleldrive/cuid2";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { AppEvent } from "../../../app/types/event";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../../app/config/firebase";
import { Timestamp, updateDoc } from "firebase/firestore";


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
    // we can change it back to const because we're no longer updating the id
    const { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // update event function
    async function updateEvent(data: AppEvent) {
        if (!event) return;
        // doc comes from firestore, db is database, collection you're going to update, id of event
        const docRef = doc(db, 'events', event.id);
        // updateDoc is from firestore
        await updateDoc(docRef, {
            // specify data you want to update, spread the data
            ...data,
            // we need to turn date into a firestore Timestamp
            // you can't go from string to type Date, so we need to go from string to Date to Timestamp
            // so we add in "as unknown" and then "as Date"
            // must use "as unknown" otherwise it won't accept it
            date: Timestamp.fromDate(data.date as unknown as Date)
        })
    }
    // create event function
    // we're passing FieldValues because we don't have an event to work with
    async function createEvent(data: FieldValues) {
        // we need firestore to create an id for us and we want to pass id to a navigate function
        // so that we can redirect to the event we just created, we don't know the id yet
        // therefore, we need to reference the document BEFORE it's been created
        // can use doc and setDoc() to create a document with an auto-generated id
        const newEventRef = doc(collection(db, 'events'));
        await setDoc(newEventRef, {
            ...data,
            hostedBy: 'bob',
            attendees: [],
            hostPhotoURL: '',
            date: Timestamp.fromDate(data.date as unknown as Date),
        })
        return newEventRef;
    }

    // this comes from react-hook-form
    // we need control for the Controller and dropdown option for category
    const { register, handleSubmit, control, setValue, formState: { errors, isValid, isSubmitting } } = useForm({
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
    async function onSubmit(data: FieldValues) {
        try {
            if (event) {
                await updateEvent({...event, ...data});
                navigate(`/events/${event.id}`);
            } else {
                const ref = await createEvent(data);
                navigate(`/events/${ref.id}`);
            }
        } catch (error) {
            console.log(error);
        }
        // remove any props you're no longer using when using router
        // check to see if there's anything inside selectedEvent
        // if we do have a selectedEvent then we want to update the event
        // remove this code because we created a function for updateEvent and createEvent above instead
        // id = id ?? createId();
        // event
        // need to add date: data.date.toString() to change the date from a date object to a string
        // dispatching update to store and then we see that update in our browser
        // ? dispatch(updateEvent({ ...event, ...data, date: data.date.toString() }))
        // : dispatch(createEvent({ ...data, id, hostedBy: 'bob', attendees: [], hostPhotoURL: '', date: data.date.toString() }));
        // Above we changed ...values to ...data because we're using react-hook-form and we're no longer using values
        // event
        // ? dispatch(updateEvent({ ...event, ...values }))
        // : dispatch(createEvent({ ...values, id, hostedBy: 'bob', attendees: [], hostPhotoURL: '' }));
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
            <Header content={'Event details'} sub color='teal' />
            {/* we want to use the react-hook-form onSubmit */}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    placeholder='Event Title'
                    defaultValue={event?.title || ''}
                    // use {required: true} for a required field
                    {...register('title', { required: true })}
                    // this will notify users that the title is required
                    error={errors.title && 'Title is required'}
                // we'll use the name and value to update the state
                // name='title'
                // this is a change event for an HTML element
                // onChange={e => handleInputChange(e)}
                />
                {/* Form.Select is a dropdown for a form */}
                {/* Form.TextArea is a text area for a form
                uses Integrating Controlled Inputs, because it's controlled we
                need rules instead of register */}
                {/* only need 1 default value for the dropdown, if you have
                a second one in the Form.Select take it out and leave
                the one in the Controller */}
                <Controller
                    name='category'
                    control={control}
                    rules={{ required: 'Category is required' }}
                    // ? = optional
                    defaultValue={event?.category}
                    render={({ field }) => (
                        < Form.Select
                            options={categoryOptions}
                            placeholder='Category'
                            clearable
                            // defaultValue={event?.category || ''}
                            {...field}
                            // works with setValue
                            // use onChange to update the state, so you don't get undefined for your category
                            // put a _ for the first parameter because we don't need it, we only need the second parameter
                            // we use the _ as a placeholder
                            onChange={(_, d) => setValue('category', d.value, { shouldValidate: true })}
                            error={errors.category && errors.category.message}
                        />
                    )}
                />

                <Form.TextArea
                    placeholder='Description'
                    defaultValue={event?.description || ''}
                    {...register('description', { required: 'Description is required' })}
                    error={errors.description && errors.description.message}
                />
                <Header sub content='Location details' color='teal' />
                <Form.Input
                    placeholder='City'
                    defaultValue={event?.city || ''}
                    {...register('city', { required: 'City is required' })}
                    error={errors.city && errors.city.message}
                />

                <Form.Input
                    placeholder='Venue'
                    defaultValue={event?.venue || ''}
                    {...register('venue', { required: 'Venue is required' })}
                    error={errors.venue && errors.venue.message}
                />
                {/* Use Form.Field so we get the styling */}
                <Form.Field>
                    <Controller
                        name='date'
                        control={control}
                        rules={{ required: 'Date is required' }}
                        defaultValue={event && new Date(event.date) || null}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={value => setValue('date', value, { shouldValidate: true })}
                                showTimeSelect
                                timeCaption="time"
                                dateFormat='MMM d, yyyy h:mm aa'
                                placeholderText="Event date and time"
                            />
                        )}
                    />
                </Form.Field>
                {/* <Form.Input
                    type='date'
                    placeholder='Date'
                    defaultValue={event?.date || ''}
                    {...register('date', { required: 'Date is required' })}
                    error={errors.date && errors.date.message}
                /> */}

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