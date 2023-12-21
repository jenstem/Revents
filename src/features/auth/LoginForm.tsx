import { Button, Form } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/common/modals/modalSlice";
// import { signIn } from "./authSlice";
// import authorization from firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/config/firebase";

export default function LoginForm() {
    const { register, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
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
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModalWrapper header='Sign into re-vents'>
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
                    defaultValue=''
                    placeholder='Password'
                    {...register('password', { required: true })}
                    error={errors.password && 'Password is required'}
                />
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
            </Form>
        </ModalWrapper>
    )
}