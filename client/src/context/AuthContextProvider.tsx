import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";

type AuthContextType = {
  currentUser: any,
  login: (input: any) => void,
  logout: () => void,
};

type AuthContextProviderType ={
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")!) || null
  );

  const login = async (input: any) => {
    const result = await axios.post(
      "http://localhost:8080/server/user/login",
      input
    );
    setCurrentUser(result.data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
};
