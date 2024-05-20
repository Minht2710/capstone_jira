import React, { useState } from "react";
import "./signIn.scss";
import jiralogo from "./../../asset/img/jiralogo.svg";
import SignIn from "../../layout/SignIn/SignIn";
import SignUp from "../../layout/SignUp/SignUp";

const ToggleSignIn = () => {
  // Initialize the state for controlling the form display
  const [formSignIn, setFormSignIn] = useState(true);

  // Function to toggle between sign-in and sign-up forms
  const toggleChangeForm = () => {
    setFormSignIn(!formSignIn);
  };
  const handleBackSignIn = () => {
    setFormSignIn(true);
  };

  return (
    <div className="overlaySignIn">
      <div className="formSignin my-10 p-5 pb-10 bg-white rounded-2xl">
        <div className="titleSignIn flex items-end mb-5">
          <img src={jiralogo} alt="" className="h-10" />
          <h2 className="ml-2 font-bold">
            {formSignIn ? "Sign In" : "Sign Up"}
          </h2>
        </div>

        {/* Render either sign-in or sign-up form based on formSignIn state */}
        <div className="inputGroup">
          {formSignIn ? <SignIn /> : <SignUp backSignIn={handleBackSignIn} />}
        </div>

        {/* Button to toggle between sign-in and sign-up */}
        <div>
          {formSignIn ? (
            <small>
              Don't have an account?
              <button
                onClick={toggleChangeForm}
                className="text-xs text-blue-700"
              >
                Sign Up
              </button>
            </small>
          ) : (
            <small>
              Have an account?
              <button
                onClick={toggleChangeForm}
                className="text-xs text-blue-700"
              >
                Sign In
              </button>
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToggleSignIn;
