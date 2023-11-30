// import
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
    reducers: {}
})