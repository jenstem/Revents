import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SignedInMenu() {
    return (
        <Menu.Item position='right'>
            <Image avatar spaced='right' src='/user.png' />
            <Dropdown pointing='top left' text='Bob'>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/createEvent' text='Create event' icon='plus' />
                <Dropdown.Item text='My profile' icon='user' />
                <Dropdown.Item text='Sign out' icon='power' />
            </Dropdown.Menu>
            </Dropdown>
        </ Menu.Item>
    )
}