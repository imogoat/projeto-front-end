"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getUser } from "@/api/userServices";

interface AuthContextProps {
  user: { id: number; username: string; email: string; number: string; role: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextProps["user"] | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Salva os dados no localStorage
  const persistUser = (user: AuthContextProps["user"], token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", token);
  };

  // Remove os dados do localStorage
  const clearUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  // Carrega os dados do localStorage ao inicializar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Faz o login e pega o ID e o token
      const loginResponse = await loginUser(email, password);
      const userData = await getUser(loginResponse.id);

      const user = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        number: userData.number,
        role: userData.role,
      };

      setUser(user);
      setToken(loginResponse.token);
      persistUser(user, loginResponse.token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro inesperado durante o login.");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearUser();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
