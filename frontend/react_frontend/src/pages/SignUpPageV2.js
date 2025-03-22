import { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../store/appContext";
import { useForm } from 'react-hook-form';

export const SignUpPageV2 = () => {
  const {
    handleSubmit,
    register,
    formState: {
      errors,
    },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const { RegisterUser, isErrorLoading } = useContext(AppContext);
  const EMAIL_REGEX = /^([-\w+~]+(?:\.[-\w+~]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  const history = useHistory();

  useEffect(() => {
    if (isErrorLoading) {
      setErrorMessage("Error Occurred while trying to register the user");
    }
  }, [isErrorLoading]);

  const onSubmit = useCallback(async ({ username, email, password, firstName, lastName, phoneNumber }) => {
    RegisterUser({
      username,
      email,
      password,
      firstName,
      lastName,
      phone: phoneNumber,
    });
    history.push("/");
  }, [RegisterUser, history]);

  return (
    <div className="page-container">
      <div className="content-container">
        <h1>Sign Up</h1>
        {errorMessage && <div className="fail">{errorMessage}</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            className="button-input"
            id="username"
            placeholder="Username (8+ characters)"
            {...register("username", {
              required: 'Enter a username.',
              minLength: { value: 8, message: 'Please enter a username 8-15 characters in length.' },
              maxLength: { value: 15, message: 'Please enter a username 8-15 characters in length.' },
            })}
          />
          { errors.username ? <div className="field-error"> {errors.username.message} </div> : null }
          <input
            className="button-input"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: 'Enter an email.',
              minLength: { value: 8, message: 'Please enter an email 8-32 characters in length.' },
              maxLength: { value: 32, message: 'Please enter an email 8-32 characters in length.' },
              validate: (value) => EMAIL_REGEX.test(value.trim()) || 'Please enter a valid email.',
            })}
          />
          { errors.email ? <div className="field-error"> {errors.email.message} </div> : null }
          <input
            className="button-input"
            id="firstName"
            placeholder="First Name"
            {...register("firstName", {
              required: 'Enter a first name.',
              minLength: { value: 1, message: 'Please enter a first name 1-15 characters in length.' },
              maxLength: { value: 15, message: 'Please enter a first name 1-15 characters in length.' },
            })}
          />
          { errors.firstName ? <div className="field-error"> {errors.firstName.message} </div> : null }
          <input
            className="button-input"
            id="lastName"
            placeholder="Last Name"
            {...register("lastName", {
              required: 'Enter a last name.',
              minLength: { value: 1, message: 'Please enter a last name 1-15 characters in length.' },
              maxLength: { value: 15, message: 'Please enter a last name 1-15 characters in length.' },
            })}
          />
          { errors.lastName ? <div className="field-error"> {errors.lastName.message} </div> : null }
          <input
            className="button-input"
            id="phoneNumber"
            placeholder="Phone Number"
            {...register("phoneNumber", {
              required: 'Enter a phone number.',
              validate: (value) => value.trim().length === 10 || 'Please enter a phone number 10 characters in length.',
            })}
          />
          { errors.phoneNumber ? <div className="field-error"> {errors.phoneNumber.message} </div> : null }
          <input
            className="button-input"
            id="password"
            type="password"
            placeholder="Password (8+ characters)"
            {...register("password", {
              required: 'Enter a password.',
              minLength: { value: 8, message: 'Please enter a password 8-15 characters in length.' },
              maxLength: { value: 15, message: 'Please enter a password 8-15 characters in length.' },
            })}
          />
          { errors.password ? <div className="field-error"> {errors.password.message} </div> : null }
          <hr />
          <button className="button-input" type="submit">
            Sign Up
          </button>
        </form>
        <button className="button-input" onClick={() => history.push("/login")}>
          Already have an account? Log In
        </button>
      </div>
    </div>
  );
};
