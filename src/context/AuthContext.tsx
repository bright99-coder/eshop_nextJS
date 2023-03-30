import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { createContext, ReactNode, useContext } from "react";
import swal from "sweetalert";

type AuthContextProvider = {
  children: ReactNode;
};

type AuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null | any>>;
  logout: () => void;
  updateprofile: (data: any) => void;
  changePassword: (data: any) => void;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: AuthContextProvider) {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const router = useRouter();

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
      value={{
        user,
        setUser,
        logout,
        updateprofile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
