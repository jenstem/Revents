import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { AppEvent } from "../../../app/types/event";
import { Timestamp, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "../eventSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PlaceInput from "../../../app/common/Maps/PlaceInput";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import MapsWrapper from "../../../app/common/Maps/MapsWrapper";

export default function EventForm() {
    const { loadDocument, create, update } = useFireStore('events');
    const { register, handleSubmit, control, setValue, getValues, formState: { errors, isValid, isSubmitting } } = useForm({
        mode: 'onTouched',
        defaultValues: async () => {
            if (event) return { ...event, date: new Date(event.date) }
        }
    });
    const { id } = useParams();
    const event = useAppSelector(state => state.events.data.find(e => e.id === id));
    const { status } = useAppSelector(state => state.events);
    const { currentUser } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        loadDocument(id, actions)
    }, [id, loadDocument])

    // update event function
    async function updateEvent(data: AppEvent) {
        if (!event) return;
        await update(data.id, {
            ...data,
            date: Timestamp.fromDate(data.date as unknown as Date)
        })
    }

    // create event function
    async function createEvent(data: FieldValues) {
        if (!currentUser) return;
        const ref = await create({
            ...data,
            hostUid: currentUser.uid,
            hostedBy: currentUser.displayName,
            hostPhotoURL: currentUser.photoURL,
            attendees: arrayUnion({
                id: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            }),
            attendeeIds: arrayUnion(currentUser.uid),
            date: Timestamp.fromDate(data.date as unknown as Date),
        })
        return ref;
    }

    // cancel event function
    async function handleCancelToggle(event: AppEvent) {
        await update(event.id, {
            isCancelled: !event.isCancelled
        });
        toast.success(`Event has been ${event.isCancelled ? 'uncancelled' : 'cancelled'}`)
    }

    // submit event function
    async function onSubmit(data: FieldValues) {
        try {
            if (event) {
                await updateEvent({ ...event, ...data });
                navigate(`/events/${event.id}`);
            } else {
                const ref = await createEvent(data);
                navigate(`/events/${ref?.id}`);
            }
        } catch (error: any) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    async function handlePlaceSelect(value: any, fieldName: string) {
        const results = await getGeocode({ address: value });
        const latlng = getLatLng(results[0]);
        setValue(fieldName, value, { shouldValidate: true });
        setValue('latLng', latlng);
    }

    if (status === 'loading') return <LoadingComponent />

    return (
        <MapsWrapper>
            <Segment clearing>
                <Header content={'Event details'} sub color='teal' />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <input type='hidden' {...register('latLng')} />

                    {/* Title */}
                    <Form.Input
                        placeholder='Event Title'
                        defaultValue={event?.title || ''}
                        {...register('title', { required: true })}
                        error={errors.title && 'Title is required'}
                    />

                    {/* Category */}
                    <Controller
                        name='category'
                        control={control}
                        rules={{ required: 'Category is required' }}
                        defaultValue={event?.category}
                        render={({ field }) => (
                            < Form.Select
                                options={categoryOptions}
                                placeholder='Category'
                                clearable
                                {...field}
                                onChange={(_, d) => setValue('category', d.value, { shouldValidate: true })}
                                error={errors.category && errors.category.message}
                            />
                        )}
                    />

                    {/* Description */}
                    <Form.TextArea
                        placeholder='Description'
                        defaultValue={event?.description || ''}
                        {...register('description', { required: 'Description is required' })}
                        error={errors.description && errors.description.message}
                    />
                    <Header sub content='Location details' color='teal' />

                    {/* City */}
                    <Controller
                        name='city'
                        control={control}
                        defaultValue={event?.city}
                        rules={{ required: 'City is required' }}
                        render={({ field }) => (
                            <PlaceInput
                                field={field}
                                onSelect={handlePlaceSelect}
                                options={{
                                    types: ['(cities)']
                                }}
                                error={errors.city}
                            />
                        )}
                    />

                    {/* Venue */}
                    <Controller
                        name='venue'
                        control={control}
                        defaultValue={event?.venue}
                        rules={{ required: 'Venue is required' }}
                        render={({ field }) => (
                            <PlaceInput
                                disabled={!getValues().city && !getValues().latLng}
                                field={field}
                                onSelect={handlePlaceSelect}
                                options={{
                                    types: ['establishment'],
                                    locationBias: new google.maps.Circle({
                                        radius: 1000,
                                        center: new google.maps.LatLng(
                                            getValues().latLng
                                        )
                                    })
                                }}
                                error={errors.venue}
                            />
                        )}
                    />

                    {/* Date */}
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

                    {event && (
                        <Button
                            type='button'
                            floated='left'
                            color={event.isCancelled ? 'green' : 'red'}
                            onClick={() => handleCancelToggle(event)}
                            content={event.isCancelled ? 'Reactivate event' : 'Cancel event'}
                        />
                    )}

                    <Button loading={isSubmitting} type='submit' disabled={!isValid} floated='right' positive content='Submit' />
                    <Button disabled={isSubmitting} as={Link} to='/events' type='button' floated='right' content='Cancel' />
                </Form>
            </Segment>
        </MapsWrapper>
    )
}