"use client";
import useClientForm from "@/hooks/useClientForm";
import Button from "../atoms/button";
import { InputField } from "../atoms/inputField";
import useErrors from "@/hooks/useErrors";
import { useEffect, useRef, useState } from "react";
import BoxDesign from "../atoms/boxDesign";
import "./loginForm.css";
import Link from "next/link";
import GlobeUI from "../atoms/globe";
import Title from "../atoms/title";
import CurrentTime from "../atoms/currentTime";
import { GetGeoInfo } from "../../../helper/GetLocation";
import TickIcon from "../icons/tick";
import { SubmitLoginCredentials } from "@/REST/POST";
import { useRouter } from "next/navigation";
import { ErrorMessageProps } from "@/types/interfaces";

const LoginForm = () => {
  console.log(GetGeoInfo(true));
  const router = useRouter();
  const [mainError, setMainError] = useState<string>("");
  const [geoData, setGeoData] = useState({
    country_name: "",
    timezone: "",
  });
  useEffect(() => {
    (async () => {
      const data = await GetGeoInfo(true);
      setGeoData({ country_name: data.countryName, timezone: data.timeZone });
    })();
  }, []);

  const loginCredentials = useClientForm({
    email: "",
    password: "",
  });

  const errorsHook = useErrors();
  const dimensionRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (dimensionRef.current) {
      const { width, height } = dimensionRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []);
  //   e.preventDefault();

  //   const getErrors = await SubmitClientSchedule(meetingForm.formData, clients);

  //   if (getErrors.errors && getErrors.success === false) {
  //     const filteredErrors = getErrors.errors.filter(
  //       (err: ErrorMessageProps) => err.error === true
  //     );
  //     errorsHook.setErrors(filteredErrors);
  //   }

  // };
  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    errorsHook.clearErrors();
    setMainError("");
    const response = await SubmitLoginCredentials(
      loginCredentials.formData.email,
      loginCredentials.formData.password
    );
    if (response.success === true) {
      console.log(response.message);
      router.push("/");
    } else {
      if (response?.errors && response?.success === false) {
        const filteredLogInErrors = response.errors.filter(
          (err: ErrorMessageProps) => err.error === true
        );
        errorsHook.setErrors((prevErrors: ErrorMessageProps[]) => [
          ...prevErrors,
          ...filteredLogInErrors,
        ]);
      } else {
        setMainError(response.message);
      }
    }
  }
  return (
    <div className="login-wrapper">
      <BoxDesign centeredX="leftX" variant="transparent-DesignBox" padding="medium">
        <h1 className="signIn-Title">Sign in </h1>
        <p className="signIn-subTitle">Enter your credentials to continue</p>

        <form id="login-credentials" onSubmit={handleLoginSubmit}>
          <InputField
            color="var(--bg-light)"
            autocomplete="off"
            type="text"
            name="email"
            label="Email"
            value={loginCredentials.formData.email}
            id="email"
            onChange={loginCredentials.handleChange}
            placeholder="example@gmail.com"
            error={errorsHook.getErrorBoolean("email")}
            errorMsg={errorsHook.getErrorMsg("email")}
          />
          <InputField
            color="var(--bg-light)"
            autocomplete="off"
            type="password"
            name="password"
            label="Password"
            value={loginCredentials.formData.password}
            id="password"
            onChange={loginCredentials.handleChange}
            placeholder="password"
            error={errorsHook.getErrorBoolean("password")}
            errorMsg={errorsHook.getErrorMsg("password")}
          />
          <p>{errorsHook.getErrorMsg("incorrectCredentials")}</p>
        </form>
        <BoxDesign className="remember-forgot-wrapper">
          <div className="remember-me-wrapper">
            <input type="checkbox" id="remember" className="checkbox" />
            <label htmlFor="remember" className="remember-label">
              Remember me
            </label>
          </div>
          <Link href="/" className="forgot-Password">
            Forgot Password?
          </Link>
        </BoxDesign>
        <Button type="submit" variant="sign-in-btn" form="login-credentials">
          Sign In
        </Button>
        <div className="line-with-text">
          <span className="span-SignUp">OR Sign Up</span>
        </div>
        <BoxDesign
          orientation="row"
          padding="small"
          variant="fullwidth-DesignBox"
          centeredX="middleX"
        >
          <Button>Google</Button>
          <Button>Facebook</Button>
        </BoxDesign>
        <BoxDesign padding="none" variant="fullwidth-DesignBox" centeredX="middleX">
          <p className="register-account">
            Don't have an account?{" "}
            <Link className="register-link" href="/register">
              Register
            </Link>
          </p>
        </BoxDesign>
      </BoxDesign>
      <div className="globe-wrapper" ref={dimensionRef}>
        <div className="globe-data-wrapper">
          <div className="globe-Title">
            <Title title="SyncMeet" variant="main-Title"></Title>
          </div>
          <div className="globe-subTitle"> - Your team, Your time, Anywhere.</div>
          <ul className="globe-list">
            <p>
              <TickIcon className="login-Tick" /> Arrage meeting anywhere.
            </p>
            <p>
              <TickIcon className="login-Tick" /> Smart availability checks.
            </p>
            <p>
              <TickIcon className="login-Tick" /> Collaborate globally.
            </p>
            <p>
              <TickIcon className="login-Tick" /> Real-time updates.
            </p>
          </ul>
          {/* <div className="tester">
            <h1>{geoData.country_name}</h1>
            <h1>{geoData.timezone}</h1>
          </div>
          <CurrentTime /> */}
        </div>
        <div>
          {size.width > 0 && size.height > 0 && <GlobeUI width={size.width} height={size.height} />}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
