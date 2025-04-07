"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllInstitutes, setUser } from "@/redux/authSlice";
import Image from "next/image";
import images from "@/images";
import { useCreate } from "@refinedev/core";
import { toast } from "sonner";
import type { AuthStates } from "@/types/auth";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ReloadIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { FieldValues, useForm } from "react-hook-form";
import type { AppDispatch } from "@/redux/store/store";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { mutate, isLoading } = useCreate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async ({ email, password }: FieldValues) => {
    mutate(
      {
        resource: "user/login",
        values: { email, password },
      },
      {
        onSuccess: (response) => {
          const accessToken = response.data.token.accessToken ?? null;
          localStorage.setItem("token", accessToken);
          router.push("/");
          toast.success("Login successfully!");
          dispatch(setUser(response.data as AuthStates));
          dispatch(getAllInstitutes());
        },
        onError: () => {
          toast.error("Incorrect email or password.");
        },
      }
    );
  };

  return (
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
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <label
                onClick={() => console.log(errors)}
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Email or Employee ID
              </label>
              <Input
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors text-black placeholder:text-[#aaa]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {(errors?.email?.message as string) || "Email is required"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pr-12 transition-colors text-black placeholder:text-[#aaa]"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <HugeiconsIcon
                    icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {(errors?.password?.message as string) ||
                    "Password is required"}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 disabled:from-blue-600 disabled:to-blue-600 text-white font-semibold py-2.5 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md"
            >
              {isLoading ? (
                <>
                  Logging In...
                  <HugeiconsIcon
                    icon={ReloadIcon}
                    className="h-5 w-5 animate-spin"
                    strokeWidth={2}
                  />
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
