"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getUser } from "@/api/userServices";

interface User {
  id: number;
  username: string;
  email: string;
  number: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Função para salvar os dados do usuário e token no localStorage
  const persistUser = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", token);
  };

  // Função para limpar os dados do usuário e token do localStorage
  const clearUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  // Carrega os dados do usuário e token do localStorage ao inicializar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      // Chama o serviço de login para obter o token e ID do usuário
      const loginResponse = await loginUser(email, password);

      // Obtém os detalhes completos do usuário com o ID retornado
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

      // Salva no localStorage
      persistUser(user, loginResponse.token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Erro inesperado durante o login.");
    }
  };

  // Função de logout
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

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
