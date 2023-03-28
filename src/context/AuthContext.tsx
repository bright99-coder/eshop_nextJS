import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { createContext, ReactNode, useContext } from "react";
import swal from "sweetalert";

type AuthContextProvider = {
  children: ReactNode;
};

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null | any>>;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateprofile: (data: any) => void;
  changePassword: (data: any) => void;
  register:(data:any)=>void
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: AuthContextProvider) {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const router = useRouter();

  const register = (data: any) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          sessionStorage.setItem("auth_token", res.data.token);
          sessionStorage.setItem("user", res.data.username);
          setUser(res.data.username);
          swal("Success", res.data.message, "success");
          router.push("/profile");
        }
      });
    });
  };

  const login = (email: string, password: string) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/login`, { email, password }).then((res) => {
        if (res.data.status === 200) {
          setUser(res.data.username);
          sessionStorage.setItem("auth_token", res.data.token);
          sessionStorage.setItem("user", res.data.username);
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
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("user");
        router.push("/login");
      }
    });
  };

  const updateprofile = (data: any) => {
    axios.post(`/api/profile`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 422) {
        swal("All Fields are mandetory", "", "error");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };

  const changePassword = (data: any) => {
    axios.post(`/api/change-password`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 422) {
        swal("All Fields are mandetory", "", "error");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, register, login, logout, updateprofile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
