"use client";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  username: string;
  email: string;
  role: "student" | "moderator" | "admin";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

// Cookie helper functions
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
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
    const savedToken = getCookie("token");
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
          removeCookie("token");
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
              removeCookie("token");
              setToken(null);
              setUser(null);
            });
        }
      } catch (error) {
        removeCookie("token");
        setToken(null);
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { access_token, user } = response.data;

      // Get token expiration from decoded JWT
      const decoded = jwtDecode<{ exp: number }>(access_token);
      const expiresIn = decoded.exp * 1000 - Date.now();
      const daysTillExpiry = Math.floor(expiresIn / (1000 * 60 * 60 * 24));

      // Set cookie with appropriate expiration (default to 7 days if can't determine)
      setCookie("token", access_token, daysTillExpiry > 0 ? daysTillExpiry : 7);

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
    removeCookie("token");
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
