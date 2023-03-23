import { createContext, useContext } from "react";

interface User {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  logged: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  logged: false,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
