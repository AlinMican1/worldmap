"use client";
import useClientForm from "@/hooks/useClientForm";
import Button from "../atoms/button";
import { InputField } from "../atoms/inputField";
import useErrors from "@/hooks/useErrors";
import { useState } from "react";
import BoxDesign from "../atoms/boxDesign";
import "./loginForm.css";
import Link from "next/link";
const LoginForm = () => {
  const loginCredentials = useClientForm({
    email: "",
    password: "",
  });

  const errorsHook = useErrors();

  function handleLoginSubmit() {}
  return (
    <div className="test">
      <BoxDesign variant="sixth-DesignBox" padding="medium">
        <h1 className="signIn-Title">Sign in </h1>
        <p className="signIn-subTitle">Enter your credentials to continue</p>
        <form onSubmit={handleLoginSubmit}>
          <InputField
            autocomplete="off"
            type="text"
            name="email"
            label="Email"
            value={loginCredentials.formData.email}
            id="email"
            onChange={loginCredentials.handleChange}
            placeholder="example@gmail.com"
            error={errorsHook.getErrorBoolean("name")}
            errorMsg={errorsHook.getErrorMsg("name")}
          />
          <InputField
            autocomplete="off"
            type="password"
            name="password"
            label="Password"
            value={loginCredentials.formData.email}
            id="password"
            onChange={loginCredentials.handleChange}
            placeholder="password"
            error={errorsHook.getErrorBoolean("name")}
            errorMsg={errorsHook.getErrorMsg("name")}
          />
        </form>
        <BoxDesign orientation="row" padding="small">
          <div className="remember-me">
            <input type="checkbox" id="remember" className="checkbox" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Link href="/" className="forgot-Password">
            Forgot Password?
          </Link>
        </BoxDesign>
        <Button type="submit" variant="sign-in-btn">
          Sign In
        </Button>
        <p className="register-account">
          Don't have an account?{" "}
          <Link className="register-link" href="/register">
            Register
          </Link>
        </p>
      </BoxDesign>
    </div>
  );
};

export default LoginForm;
