// import
// import { act } from "react-dom/test-utils";
import { sampleData } from "../../app/api/sampleData"
import { AppEvent } from "../../app/types/event"
// import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import { PayloadAction } from "@reduxjs/toolkit";
import { createGenericSlice, GenericState, GenericActions } from "../../app/store/genericSlice";

// create type of State
type State = {
    // events: AppEvent[]
    // change events to data because we are using genericSlice and we want to match it
    data: AppEvent[]
}

// create initial state
const initialState: State = {
    // events: sampleData - change because we changed the date from a string
    // to a timestamp for firestore
    // events: []
    // change events to data because we are using genericSlice and we want to match it
    data: []
}

// export the slice
// we want to use the generic slice so we change createSlice to createGenericSlice
// export const eventSlice = createSlice({
    export const eventSlice = createGenericSlice({
    name: 'events',
    // initialState,
    initialState: initialState as GenericState<AppEvent[]>,
    // reducer functions
    reducers: {
        // genericSlice - change setEvents to success
        success: {
            // turn date into a string
            reducer: (state, action: PayloadAction<AppEvent[]>) => {
                // state.events = action.payload
                // change events to data because we are using genericSlice and we want to match it
                state.data = action.payload
                // add finished
                state.status = 'finished'
            },
            // check our prepare method to see what it does, are working with an array or object
            prepare: (events: any) => {
                // we're saying eventArray is a type of AppEvent and set it equal to an empty array
                // use let when something will be updated
                let eventArray: AppEvent[] = [];
                // check to see if events is an array or object
                // if it is an array set eventArray equal to events
                // if it is an array push events into eventArray
                Array.isArray(events) ? eventArray = events : eventArray.push(events)
                // now that we created eventArray, we'll need to map over that instead of just events
                const mapped = eventArray.map((e: any) => {
                    return { ...e, date: (e.date as Timestamp).toDate().toISOString() }
                });
                return { payload: mapped }
            }
        },
        // REMOVE these because we create createEvents and removeEvents etc functions instead
        // createEvent: (state, action) => {
        //     // in standard Redux, we would not be able to use push
        //     // because it mutates the state
        //     // but we can mutate the state in Redux Toolkit
        //     // because it uses Immer under the hood and uses it as a draft state
        //     // then it will create a new state based on the draft state
        //     state.events.push(action.payload);
        // },
        // updateEvent: (state, action) => {
        //     // looking for the event id that's equal to the payload id
        //     state.events[state.events.findIndex(evt => evt.id === action.payload.id)] = action.payload
        // },
        // deleteEvent: (state, action) => {
        //     // , 1) means delete 1 item
        //     state.events.splice(state.events.findIndex(evt => evt.id === action.payload), 1)
        // }
    }
}
)
// also REMOVE these because we are no longer using them
// export const { createEvent, updateEvent, deleteEvent, setEvents } = eventSlice.actions
// export const { setEvents } = eventSlice.actions
// we want access to setEvents and genericSlice
export const actions = eventSlice.actions as GenericActions<AppEvent[]>