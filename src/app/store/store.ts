import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { testSlice } from "../../features/scratch/testSlice";
import { eventSlice } from "../../features/events/eventSlice";
import { modalSlice } from "../common/modals/modalSlice";
import { authSlice } from "../../features/auth/authSlice";
import { profileSlice } from "../../features/profiles/profileSlice";
import { photosSlice } from "../../features/profiles/photosSlice";
import { followSlice } from "../../features/profiles/follow/followSlice";
import { feedSlice } from "../../features/events/dashboard/feedSlice";

export const store = configureStore({
    reducer: {
        test: testSlice.reducer,
        events: eventSlice.reducer,
        modals: modalSlice.reducer,
        auth: authSlice.reducer,
        profiles: profileSlice.reducer,
        photos: photosSlice.reducer,
        follows: followSlice.reducer,
        feed: feedSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [''],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector