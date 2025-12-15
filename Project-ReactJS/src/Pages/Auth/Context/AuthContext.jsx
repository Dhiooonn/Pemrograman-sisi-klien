import { createContext, useContext, useState } from "react";

// Create Context
const AuthStateContext = createContext({
    user: null,
    setUser: () => {},
})

// AuthProvider
export const AuthProvider = ({ children }) => {
    // GET user dari localStorage
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem("user")));

    // Login & Logout
    const setUser = (user) => {
        _setUser(user);

        if(user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user")
        }
    };

    return (
        <AuthStateContext.Provider value={{
            user, setUser
        }}> {children}
        </AuthStateContext.Provider>
    );
};

export const useAuthStateContext = () => useContext(AuthStateContext);