"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import  bot2  from "../components/page-photos/robot-2.png";

import PageImage from "../components/auth/PageImage";
import FormLabel from "../components/auth/FormLabel";
import Button from "../components/shared/Button";

import styles from "./AuthForm.module.css";

import axios from "axios"; // Enable sending credentials (e.g., cookies) in cross-origin requests

import { useAuth } from "../context/context";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

const Login = () => {
  const [buttonName, setButtonName] = useState("Login");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setButtonName("Loading ...");
      toast.loading("Signing in ..", { id: "login" });
      await auth?.login(email, password);
      setButtonName("Login");
      toast.success("Signed in successfully", { id: "login" });
      navigate("/chat");
    } catch (error) {
      setButtonName("Login");
      toast.error(error.message, { id: "login" });
      console.log(error, "error");
    }
  };

  return (
    <div className={styles.parent}>
      <div>
        <PageImage
          src={bot2}
          alt="login chat bot image"
          className={styles.image}
        />
      </div>
      <div>
        <h2>Log Into Your Account </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormLabel
            className={styles.auth_label}
            htmlFor="email"
            id="email"
            name="email"
            type="text"
            required
            maxLength={20}
            minLength={5}
            label="E-Mail"
            onChange={() => {}}
            inputPH="name@example.com"
          />

          <FormLabel
            className={styles.auth_label}
            htmlFor="password"
            id="password"
            name="password"
            type="password"
            required
            maxLength={16}
            minLength={8}
            label="Password"
            onChange={() => {}}
            inputPH="Password"
          />

          <Button
            buttonLabel={buttonName}
            type="submit"
            className={styles.button}
          />
        </form>
        <p>
          Don't have an account? <Link to="/signup">Create One</Link> now{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
