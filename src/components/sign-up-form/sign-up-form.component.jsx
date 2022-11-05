import {useState } from 'react';
import { createAuthUserWIthEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''

}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }
        try {
            const { user } = await createAuthUserWIthEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();

        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create user , email already in use');
            }
            console.log(error);
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='displayName'
                    name='displayName'
                    onChange={handleChange}
                    type='text'
                    value={displayName}
                    required />
                <FormInput
                    label='email'
                    name='email'
                    onChange={handleChange}
                    type='email'
                    value={email}
                    required />
                
                <FormInput
                    label='Password'
                    name='password'
                    onChange={handleChange}
                    type='password'
                    value={password}
                    required />
                
                <FormInput
                    label='Confirm Password'
                    name='confirmPassword'
                    onChange={handleChange}
                    type='password'
                    value={confirmPassword}
                    required />
                <Button type='submit' buttonType='inverted'>Submit</Button>
            </form>
        </div>
    )
}

export default SignUpForm;