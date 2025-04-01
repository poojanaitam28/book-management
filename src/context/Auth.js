import axios from "axios";
import { useState, createContext } from "react";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("createurAccessToken", accessToken);
    
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const checkLogin = () => {
  return localStorage.getItem("token") ? true : false;
};

export default function AuthProvider({ children }) {
  const [isLogIn, setIsLogin] = useState(checkLogin());

  const data = {
    userLoggedIn: isLogIn,
    userLogin: (type, token) => {
      setIsLogin(type);
      setSession(token);
    },
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
