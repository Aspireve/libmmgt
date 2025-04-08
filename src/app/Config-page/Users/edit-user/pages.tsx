"use client";

import React, { useEffect, useState } from "react";
import { useCreate } from "@refinedev/core";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/custom/inputfield";
import { useForm } from "@refinedev/react-hook-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import PhoneNumber from "@/components/phone-number.tsx/PhoneNumber";
import { isPossiblePhoneNumber } from "react-phone-number-input";

const EditUserPage = ({
  userData,
  refetch,
  setOpen,
}: {
  userData: any;
  refetch: () => void;
  setOpen: (e: boolean) => void;
}) => {
  const { mutate, isLoading: createLoading } = useCreate();
  const [designation, setDesignation] = useState<string>(
    userData.designation || ""
  );

  const { institute_uuid } = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Pre-fill form fields
    setValue("username", userData.name);
    setValue("email", userData.email);
    setValue("designation", userData.designation);
    setValue("phoneNo", userData.phone_no);
  }, [userData, setValue]);

  const onSubmit = (data: any) => {
    const updatedUser = {
      ...data,
      institute_details: [institute_uuid],
    };

    console.log("Updated User:", updatedUser);

    // mutate(
    //   { resource: `user/update/${userData.id}`, values: updatedUser },
    //   {
    //     onSuccess: () => {
    //       refetch();
    //       setOpen(false);
    //       toast.success("User updated successfully!");
    //     },
    //     onError: (error) => toast.error("Error updating User: " + error.message),
    //   }
    // );
  };

  return (
    <section className="flex justify-center items-center">
      <div className="w-full bg-white p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* <h2 className="text-xl font-semibold text-gray-700">Edit User</h2> */}

          <InputField
            label="Name of User"
            name="username"
            register={register}
            errors={errors}
            type="text"
            validation={{ required: "Name of User is required" }}
            placeholder="Enter Name of User"
          />

          <InputField
            label="Email"
            name="email"
            register={register}
            errors={errors}
            type="email"
            validation={{ required: "Email is required" }}
            placeholder="Enter Email"
          />

          <div className="text-[#717680] space-y-2">
            <Label>
              Designation <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => {
                setDesignation(value);
                setValue("designation", value);
              }}
              value={designation}
              required
            >
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="librarian">Librarian</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <PhoneNumber
              i_name="phoneNo"
              readOnly={false}
              register={register}
              value={userData.phone_no}
              setValue={(name, value) => {
                setValue(name, value);
                if (isPossiblePhoneNumber(value as string)) {
                  clearErrors("phoneNo");
                }
              }}
            />
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="shadow-none text-[#1E40AF] border-[#1E40AF] rounded-md px-6"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1E40AF] text-white rounded-md px-6 hover:bg-[#1E40AF]/90"
              disabled={createLoading}
            >
              {createLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update User"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUserPage;
