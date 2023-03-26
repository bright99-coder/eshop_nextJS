import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { createContext, ReactNode, useContext } from "react";

type AuthContextProvider = {
  children: ReactNode;
};

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null | any>>;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: AuthContextProvider) {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const router = useRouter();

  const login = (email: string, password: string) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/login`, { email, password }).then((res) => {
        if (res.data.status === 200) {
          setUser(res.data.username);
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("user", res.data.username);
          router.push("/profile");
        } else if (res.data.status === 401) {
          console.log(res.data.message);
        } else {
          console.log("errror");
        }
      });
    });
  };

  const logout = () => {
    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        setUser(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
