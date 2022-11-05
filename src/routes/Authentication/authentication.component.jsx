import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import './authentication.styles.scss';


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in-form/sign-in-form.component";


const Authentication = () => {
   

    // useEffect(async () => {
    //     const { user } = await getRedirectResult(auth);
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }, []);

    return (
        <div class='authentication-container'>
            {/* <button onClick={logGoogleUser}>SignIn</button> */}
            <SignIn/>
            {/* <button onClick={signInWithGoogleRedirect}>SignIn</button> */}
            <SignUpForm />
        </div>
    )
}

export default Authentication;