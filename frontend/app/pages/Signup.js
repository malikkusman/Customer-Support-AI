import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import bot2 from "/page-photos/robot-2.png";

import PageImage from "../components/auth/PageImage";
import FormLabel from "../components/auth/FormLabel";
import Button from "../components/shared/Button";

import styles from "./AuthForm.module.css";

import { useAuth } from "../context/context";

import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true; // Enable sending credentials (e.g., cookies) in cross-origin requests

const Signup = () => {
    const [buttonName, setButtonName] = useState("SignUp");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        // const confirmPassword = formData.get("confirm-password");

        try {
            setButtonName("Loading ...");
            toast.loading("Signing up ..", { id: "signup" });
            await auth?.signup(username, email, password);
            setButtonName("SignUp");
            toast.success("Account created and Logged In", { id: "signup" });
            navigate('/login');
        } catch (error) {
            setButtonName("SignUp");
            toast.error(error.message, { id: "signup" });
            console.log(error, "error");
        }
    };

    return (
        <div className={styles.parent}>
            <div>
                <PageImage
                    src={bot2}
                    alt='login chat bot image'
                    className={styles.image}
                />
            </div>
            <div>
                <h2>Create New Account</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <FormLabel
                        className={styles.auth_label}
                        htmlFor='username'
                        id='username'
                        name='username'
                        type='text'
                        required
                        maxLength={25}
                        minLength={2}
                        label='Your Name'
                        onChange={() => {}}
                        inputPH='John Doe'
                    />

                    <FormLabel
                        className={styles.auth_label}
                        htmlFor='email'
                        id='email'
                        name='email'
                        type='text'
                        required
                        maxLength={20}
                        minLength={5}
                        label='E-Mail'
                        onChange={() => {}}
                        inputPH='name@example.com'
                    />

                    <FormLabel
                        className={styles.auth_label}
                        htmlFor='password'
                        id='password'
                        name='password'
                        type='password'
                        required
                        maxLength={16}
                        minLength={8}
                        label='Password'
                        onChange={() => {}}
                        inputPH='Password'
                    />

                    <FormLabel
                        className={styles.auth_label}
                        htmlFor='confirm-password'
                        id='confirm-password'
                        name='confirm-password'
                        type='password'
                        required
                        maxLength={16}
                        minLength={8}
                        label='Confirm Password'
                        onChange={() => {}}
                        inputPH='Confirm Password'
                    />

                    <Button
                        buttonLabel={buttonName}
                        type='submit'
                        className={styles.button}
                    />
                </form>
                <p>
                    Already have an account? <Link to='/login'>Login</Link> now
                </p>
            </div>
        </div>
    );
};

export default Signup;
