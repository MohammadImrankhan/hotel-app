import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser({ token, username: decoded.iss });
        }
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch("https://localhost:7037/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error("Invalid credentials");
      }
      const decoded = jwtDecode(data.token);
      localStorage.setItem("token", data.token);
      setUser({ token: data.token, username: decoded.iss });
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
