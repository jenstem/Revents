import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { testSlice } from "../../features/scratch/testSlice";
// import eventSlice
import { eventSlice } from "../../features/events/eventSlice";
import { modalSlice } from "../common/modals/modalSlice";
import { authSlice } from "../../features/auth/authSlice";
import { profileSlice } from "../../features/profiles/profileSlice";
import { photosSlice } from "../../features/profiles/photosSlice";

export const store = configureStore({
    reducer: {
        test: testSlice.reducer,
        // add eventSlice reducer
        events: eventSlice.reducer,
        // add modalSlice reducer
        modals: modalSlice.reducer,
        // add authSlice reducer
        auth: authSlice.reducer,
        // add profileSlice reducer
        profiles: profileSlice.reducer,
        photos: photosSlice.reducer
    }
})

// get state code from website
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// get hooks from website
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector