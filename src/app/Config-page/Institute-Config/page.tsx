"use client";
import { useState } from "react";
import { useForm, Path } from "react-hook-form";
import Image from "next/image";
import { InputField } from "@/components/custom/inputfield";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil } from "lucide-react";
import ThakurTrustLogo from "@/images/ThakurTrustLogo.png";
import Header from "@/components/custom/header";
import AllUsers from "../Users/page";

type FormFields = {
  instituteName: string;
  email: string;
  phoneNumber: string;
  author: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      instituteName: "Tanvir R Chavan",
      email: "tanvirchavan@gmail.com",
      phoneNumber: "89xxxxxxx",
      author: "01",
    },
  });

  const [isEditable, setIsEditable] = useState(false);

  const onSubmit = (data: FormFields) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <>
    <Header heading="Institute Configuration" subheading="Tanvir Chavan"/>
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Institute Info</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={ThakurTrustLogo}
              alt="Thakur Trust Logo"
              className="w-32 h-32 object-contain"
            />
            <Button
              size="icon"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-white"
              onClick={() => setIsEditable(!isEditable)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Input Fields */}
        <div className="flex-grow">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {(
                Object.keys({
                  instituteName: "Institute Name",
                  email: "Email",
                  phoneNumber: "Phone Number",
                  author: "Author",
                }) as Array<keyof FormFields>
              ).map((key) => (
                <div className="space-y-2 w-full">
                  <InputField
                    label={key}
                    type="text"
                    register={register}
                    name={key as Path<FormFields>} // Ensures type safety
                    readonly={!isEditable}
                    errors={errors}
                  />
                </div>
              ))}
            </div>

            {isEditable && (
              <Button type="submit" className="mt-4">
                Save Changes
              </Button>
            )}
          </form>
        </div>
      </div>

      {/* Toggle Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Visualization Section */}
        <div className="border border-[#cdcdd5] rounded-[12px] p-4 bg-white">
          <h2 className="font-medium mb-4">Visualization</h2>
          <div className="flex flex-col space-y-4">
            <div className="border border-[#cdcdd5] rounded-[12px] p-3 bg-white flex items-center justify-between w-full">
              <Label htmlFor="dashboardCard" className="w-full">
                Dashboard card
              </Label>
              <Switch id="dashboardCard" />
            </div>
            <div className="border border-[#cdcdd5] rounded-[12px] p-3 bg-white flex items-center justify-between w-full">
              <Label htmlFor="reportCards" className="w-full">
                Report Cards
              </Label>
              <Switch id="reportCards"/>
            </div>
          </div>
        </div>

        {/* Interface Section */}
        <div className="border border-[#cdcdd5] rounded-[12px] p-4 bg-white">
          <h2 className="font-medium mb-4">Interface</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border border-[#cdcdd5] rounded-[12px] p-3 bg-white w-full">
              <Label htmlFor="darkMode" className="w-full">
                Dark Mode
              </Label>
              <Switch id="darkMode" defaultChecked />
            </div>
          </div>
        </div>
      </div>

      <AllUsers/>
    </div>
    </>
  );
};

export default Page;
