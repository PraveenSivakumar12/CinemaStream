import {
  createContext,
  useContext,
  useState,
} from "react";

import { dummyUsers } from "../Movie_data/dummyData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("cinema-user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  function login(email, password) {
    const user = dummyUsers.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Don't store the password in the session.
    const { password: ignoredPassword, ...safeUser } = user;

    localStorage.setItem("cinema-user", JSON.stringify(safeUser));
    setCurrentUser(safeUser);

    return {
      success: true,
      user: safeUser,
    };
  }

  function logout() {
    localStorage.removeItem("cinema-user");
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: Boolean(currentUser),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}