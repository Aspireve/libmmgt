"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setError("");

    try {
      const response = await axios.post(
        "https://admissionserver.onrender.com/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.token) {
        // Store token in local storage if needed
        localStorage.setItem("token", data.token);
        // Dispatch global user state via Redux
        dispatch(setUser(data));
        // Redirect to dashboard or home page
        router.push("/ImportPage");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Login to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
