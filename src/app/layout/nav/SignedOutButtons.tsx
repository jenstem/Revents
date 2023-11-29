import { Button, MenuItem } from "semantic-ui-react";

export default function SignedOutButtons() {
    return (
        <MenuItem position='right'>
        <Button basic inverted content="Login" />
        <Button basic inverted content="Register" style={{marginLeft: '0.5rem'}} />
    </MenuItem>
    )
}