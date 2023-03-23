import { useLocalStorage } from "@/hooks/useLocalStorage";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";

interface User {
  email: string;
  password: string;
}
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [logged, setLogged] = useState(() => {
    if (typeof sessionStorage !== "undefined") {
      if (sessionStorage.getItem("auth_token")) {
        return true;
      }
    } else {
      return false;
    }
    false;
  });

  const login = (email: string, password: string) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/login`, { email, password }).then((res) => {
        if (res.data.status === 200) {
          setLogged(true);
          sessionStorage.setItem("auth_token", res.data.token);
          sessionStorage.setItem("auth_name", res.data.username);
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
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("auth_name");
        setLogged(false);
        router.push("/login");
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, logged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
