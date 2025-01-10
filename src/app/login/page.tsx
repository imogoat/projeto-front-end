"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login(email, password); // Chama o contexto para fazer login
      router.push("/"); // Redireciona para a página inicial
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao fazer login. Tente novamente.");
      } else {
        setError("Erro desconhecido ao fazer login.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-1/2 px-4 py-2 border rounded-lg mb-4"
      />
      <input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-1/2 px-4 py-2 border rounded-lg mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-[--green-light] text-white rounded-lg hover:bg-[--green-medium]"
      >
        Entrar
      </button>
    </div>
  );
};

export default LoginPage;
