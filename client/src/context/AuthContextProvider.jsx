import { createContext, useCallback, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { baseUrl } from "../utils/services";
import { useNavigate} from 'react-router'

export const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("User")) || null
  );
  const [token, setToken] = useState(
  localStorage.getItem("Token") || null
  );
  const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const registerUser = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/auth/register`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let userInfo = response.data;
      localStorage.setItem(
        "User",
        JSON.stringify({
          userName: userInfo.userName,
          isAdmin: userInfo.isAdmin,
          id: userInfo.id,
          email: userInfo.email,
        })
      );
      localStorage.setItem(
        "Token",
       userInfo.token
      );
      setIsLoading(false);
      setUser(userInfo);
      setToken(userInfo.token);
      navigate("/")
      toast.success(userInfo.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      setIsLoading(false);
      // If the call fails, show an error toast
      toast.error(error.userInfo.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  });

  // LOGIN API

  const loginUser = useCallback(async (data) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const response = await axios.post(
        `${baseUrl}/auth/login`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      let userInfo = response.data;
      localStorage.setItem(
        "User",
        JSON.stringify({
          userName: userInfo.userName,
          isAdmin: userInfo.isAdmin,
          id: userInfo.id,
          email: userInfo.email,
        })
      );
      localStorage.setItem(
        "Token",
        userInfo.token
      );
      setUser(userInfo);
      setToken(userInfo.token);
      setIsLoading(false);
      
        navigate("/")
        toast.success(userInfo.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  });

  // LOGOUT USER

  const logoutUser = useCallback(async (e) => {
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    setUser(null);
    setToken(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        registerUser,
        token,
        user,
        ToastContainer,
        isLoading,
        logoutUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}