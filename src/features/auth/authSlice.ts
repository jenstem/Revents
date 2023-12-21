import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// authentication - change from User to AppUser
import { AppUser } from "../../app/types/user";
import { User } from "firebase/auth";


type State = {
    authenticated: boolean;
    // authentication - change from User to AppUser
    currentUser: AppUser | null;
}

const initialState: State = {
    authenticated: false,
    currentUser: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: {
            // authentication - add reducer
            reducer: (state, action: PayloadAction<AppUser>) => {
                state.authenticated = true;
                // authentication - change email/photoURL to action.payload
                state.currentUser = action.payload
                // {
                //     email: action.payload.email,
                //     photoURL: '/user.png',
                // }

            },
            // authentication - add prepare
            prepare: (user: User) => {
                //map user into AppUser
                const mapped: AppUser = {
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    // first element of array
                    providerId: user.providerData[0].providerId,
                }
                return { payload: mapped }
            }
        },
        // change signOut to logout - to avoid conflict with firebase.auth.signOut
        logout: (state) => {
            state.authenticated = false;
            state.currentUser = null;
        }
    }
})

export const { signIn, logout } = authSlice.actions;