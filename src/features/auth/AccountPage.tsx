import { FieldValues, useForm } from "react-hook-form";
import { Button, Form, Header, Icon, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { auth } from "../../app/config/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, RootState } from "../../app/store/store";
import { openModal } from "../../app/common/modals/modalSlice";

export default function AccountPage() {
    const {currentUser} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset, getValues, setError, watch, trigger, formState: { errors, isSubmitting, isValid } } = useForm({
        mode: 'onTouched'
    })

    const resignedin = useAppSelector((state: RootState) => state.modals.resignedin);
    const credential = useAppSelector((state: RootState) => state.modals.credential);
    const [currentcred, setCurrentCred] = useState<any>();

    const password1 = watch('password1');
    const password2 = watch('password2');

    useEffect(() => {
        if (password2) trigger('password2');
    }, [password2, trigger, password1])

    // Opens the LoginForm modal
    useEffect(() => {
        console.log("resignedin: ", resignedin)
        dispatch(openModal({type: 'LoginForm'}))
    }, [])

    useEffect(() => {
        console.log("resignedin changed: ", resignedin)
        console.log("credentialchanged: ", credential)
        if (credential !== "") {
            setCurrentCred(EmailAuthProvider.credential(credential.split(':')[0], credential.split(':')[1]))
        }
    }, [resignedin, credential])

    async function onSubmit(data: FieldValues) {
        try {
            if (auth.currentUser) {
                await reauthenticateWithCredential(auth.currentUser, currentcred);
                await updatePassword(auth.currentUser, data.password1);
                toast.success('Password updated successfully');
                reset();
            }
        } catch (error: any) {
            setError('root.serverError', {
                type: '400', message: error.message
            })
        }
    }

    return (
        resignedin && (
            <Segment>
                <Header dividing size='large' content='Account' />
                {currentUser?.providerId === 'password' &&
                <div>
                    <Header color='teal' sub content='Change password' />
                    <p>Use this form to change your password</p>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Input
                            type='password'
                            defaultValue=''
                            placeholder='Password'
                            {...register('password1', { required: true })}
                            error={errors.password1 && 'Password is required'}
                        />
                        <Form.Input
                            type='password'
                            defaultValue=''
                            placeholder='Confirm Password'
                            {...register('password2', {
                                required: true,
                                validate: {
                                    passwordMatch: value => (value === getValues().password1) || 'Passwords do not match'
                                }
                            })}

                            error={
                                errors.password2?.type === 'required' && 'Confirm Password is required' ||
                                errors.password2?.type === 'passwordMatch' && errors.password2.message
                            }
                        />
                        {errors.root && (
                        <Label
                            basic
                            color='red'
                            style={{display: 'block', marginBottom: 10}}
                            content={errors.root.serverError.message}
                        />
                    )}
                        <Button
                            loading={isSubmitting}
                            type='submit'
                            disabled={!isValid || isSubmitting}
                            size='large'
                            positive
                            content='Update password'
                        />
                    </Form>
                </div>}

                {currentUser?.providerId === 'github.com' &&
                <div>
                    <Header color='teal' sub content='GitHub Account' />
                    <p>Please visit GitHub to update your account settings</p>
                    <Button as={Link} to='https://github.com' color='black'>
                        <Icon name='github' /> Go to GitHub
                    </Button>
                </div>}
                {currentUser?.providerId === 'google.com' &&
                <div>
                    <Header color='teal' sub content='Google Account' />
                    <p>Please visit Google to update your account settings</p>
                    <Button as={Link} to='https://google.com' color='google plus' >
                        <Icon name='google' /> Go to Google
                    </Button>
                </div>}
            </Segment>
        )
    )
}