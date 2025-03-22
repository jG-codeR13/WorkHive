import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../store/appContext";

export const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUserName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const { RegisterUser, isErrorLoading } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    if (isErrorLoading) {
      setErrorMessage("Error Occurred while trying to register the user");
    }
  }, [isErrorLoading]);

  const onSignUpClicked = async () => {
    RegisterUser({
      username: username,
      email: emailValue,
      password: passwordValue,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
    });
    history.push("/");
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <h1>Sign Up</h1>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <input
          className="button-input"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="username"
        />
        <input
          className="button-input"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="someone@gmail.com"
        />
        <input
          className="button-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name"
        />
        <input
          className="button-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name"
        />
        <input
          className="button-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="phone number"
        />
        <input
          className="button-input"
          type="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="password"
        />
        <input
          className="button-input"
          type="password"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
          placeholder="confirm password"
        />
        <hr />
        <button
          className="button-input"
          disabled={
            !username ||
            !passwordValue ||
            passwordValue !== confirmPasswordValue
          }
          onClick={onSignUpClicked}
        >
          Sign Up
        </button>
        <button className="button-input" onClick={() => history.push("/login")}>
          Already have an account? Log In
        </button>
      </div>
    </div>
  );
};
