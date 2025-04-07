"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import Image from "next/image";
import images from "@/images";
import { useCreate } from "@refinedev/core";
import { toast } from "sonner";
import type { AuthStates } from "@/types/auth";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useCreate();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setError("");
    const data = { email, password };
    mutate(
      {
        resource: "user/login",
        values: data,
      },
      {
        onSuccess: (response) => {
          console.log(response.data);

          const accessToken = response.data.token.accessToken ?? null;

          // Check if user exists in response
          const userData = response.data.user ?? null;
          const instituteList = response.data.user.institute_list ?? [];

          if (!accessToken || !userData) {
            toast.error("Server Error.");
            return;
          }

          router.push("/");
          toast.success("Login successfully!");

          // const userPayload = {
          //   token: accessToken,
          //   employee_uuid: userData.user_uuid,
          //   first_name: userData.name,
          //   email: userData.email,
          //   phone: userData.phone_no,
          //   logo: userData.institute_image,
          //   instituteList, // ✅ Store the instituteList in Redux
          //   currentInstitute:
          //     instituteList.length > 0 ? instituteList[0] : null,
          // };
          // Save token to localStorage
          localStorage.setItem("token", accessToken);

          dispatch(setUser(response.data as AuthStates));
        },
        onError: () => {
          toast.error("Wrong Credentional");
          // {"statusCode":403,"message":"Invalid Credential"}
        },
      }
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <Card className="w-full max-w-md shadow-xl rounded-xl bg-white border border-gray-100">
          <CardHeader className="text-center pt-8 pb-6 flex justify-center">
            <Image
              src={images.VighnotechLogo}
              alt="Collage Logo"
              height={500}
              width={500}
            />
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Login to your account
            </p>
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
                className="w-full bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Login...
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default LoginPage;
