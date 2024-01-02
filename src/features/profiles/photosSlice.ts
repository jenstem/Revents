import { GenericState, createGenericSlice } from "../../app/store/genericSlice";
import { Photo } from "../../app/types/profile";

type State = {
    data: Photo[]
}

const intialState: State = {
    data: []
}

export const photosSlice = createGenericSlice({
    name: 'photos',
    initialState: intialState as GenericState<Photo[]>,
    reducers: {}
})

export const actions = photosSlice.actions;