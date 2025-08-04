// import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import User from "../types/User";

// type AuthContextType = {
//     isAuthenticated: boolean,
//     user: User,
//     login: () => void,
//     logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const AuthProvider = ({children}: {children: ReactNode}) => {
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [user, setUser] = useState<User | undefined>(undefined);
//     useEffect(() => {

//     }, []);

//     return (
//         <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthProvider;