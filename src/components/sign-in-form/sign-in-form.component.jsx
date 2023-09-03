import {useState} from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup , singInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
    displayName: "",
    email: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await singInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break;
                case "auth/user-not-foundd":
                    alert("no user associated with this email");
                        break;
                default:
                    console.log(error)
            }
    }
}

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label ="Email" type="email" required onChange={handleChange}   name="email" value={email}></FormInput>

                <FormInput label ="Password" type="password" required onChange={handleChange} name="password" value={password}></FormInput>

                <div className="buttons-container"> 
                    <Button buttonType="google" type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogle} buttonType="google">Google SignIn</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
