import { FieldValues, useForm } from "react-hook-form";
import { Button, Form, Header, Icon, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/store";
import { auth } from "../../app/config/firebase";
import { updatePassword } from "firebase/auth";
// import { current } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AccountPage() {
    const {currentUser} = useAppSelector(state => state.auth);

    // add form to change password
    // getValues() gets the values from the form - let's use it to compare the two passwords
    // to make sure that both passwords are the same
    // watch - watches the value of the password field
    // trigger - triggers validation
    // reset - resets the form after password is updated
    const { register, handleSubmit, reset, getValues, setError, watch, trigger, formState: { errors, isSubmitting, isValid } } = useForm({
        mode: 'onTouched'
    })

    // watch requires additional variables
    const password1 = watch('password1');
    const password2 = watch('password2');

    // trigger needs a useEffect to trigger validation
    useEffect(() => {
        if (password2) trigger('password2');
    }, [password2, trigger, password1])

    //
    async function onSubmit(data: FieldValues) {
        try {
            // check for currentUser
            if (auth.currentUser) {
                await updatePassword(auth.currentUser, data.password1);
                toast.success('Password updated successfully');
                // the form will reset after the password is updated
                reset();
            }
        } catch (error: any) {
            setError('root.serverError', {
                type: '400', message: error.message
            })
        }
    }

    return (
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
                            // validate that the password matches the first password
                            validate: {
                                passwordMatch: value => (value === getValues().password1) || 'Passwords do not match'
                            }
                        })}
                        // display error message if password2 is required or if the passwords do not match
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
                        // use serverError here
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
            {/* let the user know they must update their github or google on their respective sites */}
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
}