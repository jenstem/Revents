import { createSlice } from "@reduxjs/toolkit";

type State = {
    data: number
}

const initialState: State = {
    data: 42
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        increment: (state) => {
            state.data += 1
        },
        decrement: (state) => {
            state.data -= 1
        },
        // will update the state by the amount passed in the action ( + or - 1)
        incrementByAmount: (state, action) => {
            state.data += action.payload
        },
    }
})
// export the actions
export const {incrementByAmount, increment, decrement} = testSlice.actions