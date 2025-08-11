import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import User from "../types/User";
import { authCheck, logIn, logOut } from "@/services/authApi";

type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

type AuthContextType = {
  status: AuthStatus;
  user: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [status, setStatus] = useState<AuthStatus>('unknown');

  useEffect(() => {
    authCheck()
      .then((data) => {
        setUser(data);
        setStatus('authenticated');
      })
      .catch((err) => {
        console.error(err);
        setStatus('unauthenticated');
      });
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const loggedInUser = await logIn(username, password);
      setUser(loggedInUser);
      setStatus("authenticated");
    } catch (err) {
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logOut();
      setUser(undefined);
      setStatus("unauthenticated")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
