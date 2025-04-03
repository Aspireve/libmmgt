"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/custom/inputfield";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserRound } from "lucide-react";

interface FormData {
  created_date: string;
  institute_name: string;
  institute_email: string;
  institute_phone_number: string;
  author: string;
  institute_logo: File | string | null;
}

const InstitutePage: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      created_date: "",
      institute_name: "",
      institute_email: "",
      institute_phone_number: "",
      author: "",
      institute_logo: null,
    },
  });

  const profileImage = watch("institute_logo");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setValue("institute_logo", e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    router.push("/institute-page");
  };

  const today = new Date().toISOString().split("T")[0]; // Restrict future dates

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <Header heading="Institute Creation" subheading="Register your institute" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center gap-4">
          {typeof profileImage === "string" ? (
            <Image
              src={profileImage}
              alt="Institute Logo"
              width={150}
              height={150}
              className="rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <UserRound className="text-[#1E40AF] bg-[#0066FF22] p-3 rounded-full border-8 border-[#789DFF66]" size={70} />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Button type="button" className="bg-blue-100 text-blue-700 px-6 py-2 rounded-md" onClick={() => fileInputRef.current?.click()}>
            {profileImage ? "Change Image" : "Upload Logo"}
          </Button>
        </div>

        {/* Form Fields */}
        <InputField
          label="Created Date"
          name="created_date"
          type="date"
          register={register}
          errors={errors}
          max={today} // Restrict future dates
          required
        />

        <InputField
          label="Institute Name"
          name="institute_name"
          type="text"
          register={register}
          errors={errors}
          placeholder="Enter Institute Name"
          required
        />

        <InputField
          label="Institute Email"
          name="institute_email"
          type="email"
          register={register}
          errors={errors}
          placeholder="Enter Institute Email"
          required
        />

        <InputField
          label="Phone Number"
          name="institute_phone_number"
          type="tel"
          register={register}
          errors={errors}
          placeholder="Enter Phone Number"
          required
        />

        <InputField
          label="Author Name"
          name="author"
          type="text"
          register={register}
          errors={errors}
          placeholder="Enter Author Name"
          required
        />

        <div className="flex justify-end gap-4 mt-6">
          <Button className="bg-gray-200 text-gray-700" type="button" onClick={() => router.push("/institute-page")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InstitutePage;
