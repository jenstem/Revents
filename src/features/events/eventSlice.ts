// import
import { act } from "react-dom/test-utils";
import { sampleData } from "../../app/api/sampleData"
import { AppEvent } from "../../app/types/event"
import { createSlice } from "@reduxjs/toolkit";

// create type of State
type State = {
    events: AppEvent[]
}

// create initial state
const initialState: State = {
    events: sampleData
}

// export the slice
export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        createEvent: (state, action) => {
            // in standard Redux, we would not be able to use push
            // because it mutates the state
            // but we can mutate the state in Redux Toolkit
            // because it uses Immer under the hood and uses it as a draft state
            // then it will create a new state based on the draft state
            state.events.push(action.payload);
        },
        updateEvent: (state, action) => {
            // looking for the event id that's equal to the payload id
            state.events[state.events.findIndex(evt => evt.id === action.payload.id)] = action.payload
        },
        deleteEvent: (state, action) => {
            // , 1) means delete 1 item
            state.events.splice(state.events.findIndex(evt => evt.id === action.payload), 1)
        }
    }
}
)

export const { createEvent, updateEvent, deleteEvent } = eventSlice.actions