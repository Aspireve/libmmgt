"use client";

import React, { Suspense, useState } from "react";
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
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        const mappedData = {
          ...data,
          header_image: data.header || data.header_image || null,
        };
        delete mappedData.header;
        dispatch(setUser(mappedData));
        window.location.href = "/"; // Full reload for navigation
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleTempLogin = (): void => {
    const tempToken = "temp-token-12345";
    localStorage.setItem("token", tempToken);

    const tempUserData = {
      token: tempToken,
      email: "default@example.com",
      first_name: "Temp User",
      institute_uuid: null,
      employee_uuid: null,
      institute_name: null,
      organization_uuid: null,
      phone: null,
      logo: null,
      header_image: null,
    };

    dispatch(setUser(tempUserData));
    window.location.href = "/"; // Full reload for navigation
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <Card className="w-full max-w-md shadow-xl rounded-xl bg-white border border-gray-100">
        <CardHeader className="text-center pt-8 pb-6">
          <CardTitle className="text-3xl font-bold text-gray-800 tracking-tight">
            Welcome Back!
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2 font-medium">Login to your account</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pr-12 transition-colors"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-red-600 text-sm text-center font-medium bg-red-50 py-2 rounded-md">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-2.5 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md"
            >
              Login
            </Button>
          </form>
          <Button
            onClick={handleTempLogin}
            className="w-full mt-4 bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            Temp Login
          </Button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
    </Suspense>
  );
};

export default LoginPage;
