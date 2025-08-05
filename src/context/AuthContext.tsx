import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import User from "../types/User";
import { authCheck, logIn, logOut } from "@/services/authApi";

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    authCheck()
      .then(setUser)
      .catch((err) => {
        console.error(err);
      });
      console.log("Я РАБОТАЮ")
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const loggedInUser = await logIn(username, password);
      setUser(loggedInUser);
    } catch (err) {
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logOut();
      setUser(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
