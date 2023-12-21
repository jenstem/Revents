import { Button, MenuItem } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
// import openModal
import { openModal } from "../../common/modals/modalSlice";

export default function SignedOutButtons(){
    const dispatch = useAppDispatch();
    return (
        <MenuItem position='right'>
        <Button
            basic inverted
            content="Login"
            onClick={() => dispatch(openModal({type: 'LoginForm'}))} />
        <Button
        basic
        inverted content="Register"
        style={{marginLeft: '0.5rem'}}
        // add onClick to open modal to add user
        onClick={() => dispatch(openModal({type: 'RegisterForm'}))}
        />
    </MenuItem>
    )
}