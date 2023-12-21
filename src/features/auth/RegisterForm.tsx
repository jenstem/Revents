// create file in auth folder - RegisterForm.tsx
// copy code from LoginForm.tsx - shares a lot of the same code
import { Button, Form, Label } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/common/modals/modalSlice";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { signIn } from "./authSlice";
// import useFirestore hook for user profiles
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { Timestamp } from "firebase/firestore";

// change to RegisterForm
export default function RegisterForm() {
    // bring in firestore hook for user profiles
    const { set } = useFireStore('profiles');

    // add setError for create account errors
    const { register, handleSubmit, setError, formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
        mode: 'onTouched'
    })
    const dispatch = useAppDispatch();

    async function onSubmit(data: FieldValues) {
        try {
            // add const userCreds - needs auth, email and password
            const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password);
            // update user profile
            await updateProfile(userCreds.user, {
                displayName: data.displayName
            })

            // after we've updated the profile then we can set the profile in firestore
            await set(userCreds.user.uid, {
                displayName: data.displayName,
                email: data.email,
                createdAt: Timestamp.now(),
            })

            // dispatch signIn
            dispatch(signIn(userCreds.user));
            dispatch(closeModal());
            // if it has an issue with error, put "catch (error: any)"
        } catch (error: any) {
            // Add setError here, we can call serverError anything we want
            setError('root.serverError', {
                type: '400', message: error.message
            })
        }
    }

    return (
        // change sign in to register
        <ModalWrapper header='Register at re-vents'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* add displayName */}
                <Form.Input
                    defaultValue=''
                    placeholder='Display name'
                    {...register('displayName', { required: true })}
                    error={errors.displayName && 'Display name is required'}
                />
                <Form.Input
                    defaultValue=''
                    placeholder='Email Address'
                    {...register('email', { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                    error={
                        errors.email?.type === 'required' && 'Email is required' ||
                        errors.email?.type === 'pattern' && 'Email is not valid'
                    }
                />

                <Form.Input
                    type='password'
                    defaultValue=''
                    placeholder='Password'
                    {...register('password', { required: true })}
                    error={errors.password && 'Password is required'}
                />
                {/* add serverError */}
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
                    disabled={!isValid || !isDirty || isSubmitting}
                    type='submit'
                    fluid
                    size='large'
                    color='teal'
                    // change to register from login
                    content='Register'
                />
            </Form>
        </ModalWrapper>
    )
}