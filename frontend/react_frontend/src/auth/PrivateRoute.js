import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../store/appContext";
import { useContext } from "react";
import { getPayloadFromToken } from "../util/useQueryParams";

export const PrivateRoute = (props) => {
  const { getToken } = useContext(AppContext);
  const token = getToken();
  let user = token ? getPayloadFromToken(token) : null;

  if (!user) return <Redirect to="/login" />;

  return <Route {...props} />;
};
