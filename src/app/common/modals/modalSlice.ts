import { createSlice } from '@reduxjs/toolkit';

type State = {
    open: boolean
    type: string | null
    data: any
    resignedin: boolean
    credential: string
}

const initialState: State = {
    open: false,
    type: null,
    data: null,
    resignedin: false,
    credential: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.type = action.payload.type;
            state.open = true;
            state.data = action.payload.data;
        },
        closeModal: (state) => {
            state.type = null;
            state.open = false;
            state.data = null;
        },
        setResignedIn: (state, action) => {
            state.resignedin = action.payload;
        },
        setCredential: (state, action) => {
            state.credential = action.payload;
        }
    }

})

export const { openModal, closeModal, setResignedIn, setCredential } = modalSlice.actions;