import { Button, Divider, Form, Label } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/common/modals/modalSlice";
// import { signIn } from "./authSlice";
// import authorization from firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
    // add setError for login errors
    const { register, handleSubmit, setError, formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
        mode: 'onTouched'
    })
    const dispatch = useAppDispatch();

    async function onSubmit(data: FieldValues) {
        // dispatch(signIn(data));
        // dispatch(closeModal());

        // firebase authentication
        try {

            // remove const result for authentication
            // const result = await signInWithEmailAndPassword(auth, data.email, data.password);
            await signInWithEmailAndPassword(auth, data.email, data.password);

            // can remove below line for authentication, once you've added dispatch(signIn(user))
            // in App.tsx
            // dispatch(signIn(result.user));
            dispatch(closeModal());
        } catch (error: any) {
            setError('root.serverError', {
                type: '400', message: error.message
            })
        }
    }

    return (
        // if buttons are looking too large, add size='mini' to ModalWrapper
        <ModalWrapper header='Sign into re-vents' size='mini'>
            {/* handleSubmit will pass the values to onSubmit */}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    defaultValue=''
                    placeholder='Email Address'
                    // when you want to add regex to an email
                    // use pattern: and make sure to put the regex in between / /
                    // also when you have two rules (required and pattern), you'll need two error messages
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
                {/* add Label for serverError */}
                {errors.root && (
                    <Label
                        basic
                        color='red'
                        style={{ display: 'block', marginBottom: 10 }}
                        // use serverError here
                        content={errors.root.serverError.message}
                    />
                )}
                <Button
                    loading={isSubmitting}
                    // isDirty means nothing has been submitted into the fields
                    disabled={!isValid || !isDirty || isSubmitting}
                    type='submit'
                    // fluid means the button will take up the entire width of the form
                    fluid
                    size='large'
                    color='teal'
                    content='Login'
                />
                {/* add Divider and SocialLogin to LoginForm */}
                <Divider horizontal>Or</Divider>
                <SocialLogin />
            </Form>
        </ModalWrapper>
    )
}