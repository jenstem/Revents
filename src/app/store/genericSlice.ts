// add imports
import { createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers,  } from '@reduxjs/toolkit'
import { ActionCreatorWithoutPayload, ActionCreatorWithPreparedPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit/src/createAction'

// interface GenericState<T> {
    // change interface to type and add = before {
        // add export so we can use it in other files
export type GenericState<T> = {
    // T is a placeholder for the type of data we want to store in the state
    // remove optional parament from data
    data: T
    status: 'loading' | 'finished' | 'error'
    // add errors
    errors?: any
}

// add export so we can use it in other files
export const createGenericSlice = <
    T,
    Reducers extends SliceCaseReducers<GenericState<T>>
>({
    name = '',
    initialState,
    reducers,
}: {
    name: string
    initialState: GenericState<T>
    reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            // start(state) {
                // change to loading because we are using loading reducers
            loading: (state) => {
                state.status = 'loading'
            },

            success: (state: GenericState<T>, action: PayloadAction<T>) => {
                state.data = action.payload
                state.status = 'finished'
            },
            // add error reducer
            error: (state, action) => {
                state.errors = action.payload
                state.status = 'error'
            },
            ...reducers,
        },
    })
}
// export type
export type GenericActions<T> = {
    loading: ActionCreatorWithoutPayload<string>
    success: ActionCreatorWithPayload<T, string> | ActionCreatorWithPreparedPayload<any, T, string, never, never>;
    error: ActionCreatorWithPayload<any, string>;
}

// remove initially, do not need
//   const wrappedSlice = createGenericSlice({
//     name: 'test',
//     initialState: { status: 'loading' } as GenericState<string>,
//     reducers: {
//       magic(state) {
//         state.status = 'finished'
//         state.data = 'hocus pocus'
//       },
//     },
//   })