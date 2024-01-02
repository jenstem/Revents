import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
// import for authentication
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

// import { current } from "@reduxjs/toolkit";

// Can remove after creating authSlice.ts
// type Props = {
//     setAuth: (value: boolean) => void;
// }

export default function SignedInMenu() {
    const { currentUser } = useAppSelector(state => state.auth);
    // authentication - do not need this code if using authSlice.ts
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function handleSignOut() {
        // add async/await and signOut(auth) for authentication
        await signOut(auth)

        // authentication - do not need this code if using authSlice.ts
        // dispatch(signOut());

        // Can remove after creating authSlice.ts
        // setAuth(false);
        // sends user back to homepage
        navigate('/');
    }

    return (
        <Menu.Item position='right'>
            {/* add currentUser?.photoURL instead of hardcoding /user.png, give backup image */}
            <Image avatar spaced='right' src={currentUser?.photoURL || '/user.png'} />
            {/* add currentUser?.email instead of hardcoding Bob */}
            {/* if "text" has an error, add "as string" after it */}
            {/* <Dropdown pointing='top left' text={currentUser?.email as string}> */}
            {/* display displayName instead of email */}
            <Dropdown pointing='top left' text={currentUser?.displayName as string}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create event' icon='plus' />
                    {/* Add link to profile page */}
                    <Dropdown.Item as={Link} to={`/profiles/${currentUser?.uid}`} text='My profile' icon='user' />
                    {/* create a settings page to update profile */}
                    <Dropdown.Item as={Link} to='/account' text='My account' icon='settings' />
                    <Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />
                </Dropdown.Menu>
            </Dropdown>
        </ Menu.Item>
    )
}