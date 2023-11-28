import EventListItem from "./EventListItem";
// import AppEvent from event.ts
import { AppEvent } from '../../../app/types/event';

// set Props to an array of AppEvent
type Props = {
    events: AppEvent[]
    selectEvent: (event: AppEvent) => void

}

// add any to props - to treat TypeScript like JavaScript
// when you get an error when using props, you can add any to it
// export default function EventList(props: any) {

    // change props: any to {events}: Props
    export default function EventList({events, selectEvent}: Props) {
    return (
        <>
        {/* map/loop over EventListItem */}
        {/* This is saying that for each event in the events array, we want to return an EventListItem component */}
        {/* When you use () around <EventListItem event={event} /> it implies a return, instead if you use {} it implies a function
        and you'll have to add "return" */}
        {/* {props.events.map((event: any) => ( */}

        {/* Can get rid of props.events.map and change it to events.map because we set Props to an array of AppEvent above */}
        {/* event is now part of AppEvent and you can remove "any" from event */}
        {events.map((event) => (
            // need to give event a unique key
            <EventListItem key={event.id} event={event} selectEvent={selectEvent}/>
        ))}

        </>
    )
}