import { useState, useContext } from 'react';
import Button from '../button/button.component';
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import {
    createUserDocumentFromAuth,
    SignInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase.utils";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await SignInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for mail');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    }
    return (
        <div className='sign-in-container'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={email}
                    required
                />
                <FormInput
                    label='Password'
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={password}
                    required
                />
                <div className='button-group'>
                    <Button type='submit' buttonType='inverted'>SIGN IN</Button>
                    <Button type='button' buttonType='google' onClick={SignInWithGoogle}>
                        GOOGLE SIGN IN
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;