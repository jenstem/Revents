import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

// add a type to store the Props
// doesn't do anything except set the value to true or false
// that's why we put void in the function
// DO NOT NEED PROPS IF USING ROUTER!!!!
// type Props = {
//     setFormOpen: (value: boolean) => void;
// }
// REMOVE PROPS here too if using router
// export default function NavBar({setFormOpen}: Props) {
    export default function NavBar() {
    return (
        <Menu inverted={true} fixed="top">
            <Container>

                <MenuItem header>
                    <img src="/logo.png" alt="logo" />
                    Re-vents
                </MenuItem>

                <MenuItem name='Events' />

                <MenuItem>
                    <Button
                        // set to true because we want to open the form
                        // because we don't want the function to run right away
                        // we want it to execute only when we click the button
                        // we pass this function to another function
                        // that's why we pass it through the onClick
                        // and put an empty () => {} then it will wait till clicked
                        // this means you won't see the Create Event form until the button is clicked
                        // DO NOT NEED ONCLICK when using router - will use button as a link instead of as an onClick event
                        // onClick={() => setFormOpen(true)}
                        floated='right'
                        positive={true}
                        inverted={true}
                        content="Create Event" />
                </MenuItem>

                <MenuItem position='right'>
                    <Button basic inverted content="Login" />
                    <Button basic inverted content="Register" style={{marginLeft: '0.5rem'}} />
                </MenuItem>

            </Container>
        </Menu>

    )
}