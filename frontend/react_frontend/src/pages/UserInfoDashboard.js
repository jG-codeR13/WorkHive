import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/UserInfoDashboard.css";
import Hero from "../components/hero/Hero";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";
import UserItem from "../components/UserItem/UserItem";


export const UserInfoDashboard = (props) => {
  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const history = useHistory();

  // These states are bound to the values of the text inputs
  // on the page (see JSX below).

  // These state variables control whether or not we show
  // the success and error message sections after making
  // a network request (see JSX below).
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  return (
    <>
      <Navbar history={history} />
      <Hero />
      {/* <UserItem/>
      <Footer /> */}
    </>
  );
};
