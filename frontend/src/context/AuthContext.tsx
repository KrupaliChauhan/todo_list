import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const login = (username: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
