// contexts/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  username: string;
  email: string;
  role: "student" | "teacher" | "admin";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for saved token on mount
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode<{
          sub: string;
          username: string;
          role: "student" | "teacher" | "admin";
          exp: number;
        }>(savedToken);

        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        } else {
          setToken(savedToken);

          // Fetch user profile
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
              headers: { Authorization: `Bearer ${savedToken}` },
            })
            .then((response) => {
              setUser(response.data);
            })
            .catch(() => {
              localStorage.removeItem("token");
              setToken(null);
              setUser(null);
            });
        }
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      const { access_token, user } = response.data;
      localStorage.setItem("token", access_token);
      setToken(access_token);
      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
