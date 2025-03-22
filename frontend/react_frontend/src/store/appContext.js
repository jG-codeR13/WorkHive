import { createContext, useCallback, useState } from "react";
import { ApiInstance } from "../api/axiosInstance";

const initialContext = {
  isDataLoading: false,
  isErrorLoading: false,
  LoginUser: (username, password) => {},
  RegisterUser: (data) => {},
  clearLoginUser: () => {},
  getToken: () => {},
};

export const AppContext = createContext(initialContext);

export const AppContextComponent = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);

  const LoginUser = useCallback(
    (username, password) => {
      setIsDataLoading(true);
      setIsErrorLoading(false);
      ApiInstance.post("login", { username, password })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data?.jwt);
          }
          setIsErrorLoading(false);
          setIsDataLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsDataLoading(false);
          setIsErrorLoading(true);
        });
    },
    []
  );

  const RegisterUser = useCallback(
    (data) => {
      setIsDataLoading(true);
      setIsErrorLoading(false);
      ApiInstance.post("users", data)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data?.jwt);
          }
          setIsDataLoading(false);
          setIsErrorLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsDataLoading(false);
          setIsErrorLoading(true);
        });
    },
    []
  );

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const clearLoginUser = () => {
    localStorage.removeItem("token");
  };

  return {
    LoginUser,
    isDataLoading,
    isErrorLoading,
    RegisterUser,
    clearLoginUser,
    getToken,
  };
};
