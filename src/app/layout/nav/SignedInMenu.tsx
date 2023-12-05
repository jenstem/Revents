import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signOut } from "../../../features/auth/authSlice";
// import { current } from "@reduxjs/toolkit";

// Can remove after creating authSlice.ts
// type Props = {
//     setAuth: (value: boolean) => void;
// }

export default function SignedInMenu() {
    const { currentUser } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleSignOut() {
        dispatch(signOut());
        // Can remove after creating authSlice.ts
        // setAuth(false);
        // sends user back to homepage
        navigate('/');
    }

    return (
        <Menu.Item position='right'>
            <Image avatar spaced='right' src='/user.png' />
            {/* add currentUser?.email instead of hardcoding Bob */}
            <Dropdown pointing='top left' text={currentUser?.email}>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/createEvent' text='Create event' icon='plus' />
                <Dropdown.Item text='My profile' icon='user' />
                <Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />
            </Dropdown.Menu>
            </Dropdown>
        </ Menu.Item>
    )
}