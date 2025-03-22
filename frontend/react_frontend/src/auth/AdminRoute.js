import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../store/appContext";
import { useContext } from "react";
import { getPayloadFromToken } from "../util/useQueryParams";

export const AdminRoute = (props) => {
  const { getToken } = useContext(AppContext);
  const token = getToken();
  let user = token ? getPayloadFromToken(token) : null;

  if (!user || user?.role !== "ADMIN") return <Redirect to="/" />;

  return <Route {...props} />;
};
