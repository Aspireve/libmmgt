"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";
import { useOne, useUpdate } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { dataProvider } from "@/providers/data";
import { InputField } from "@/components/custom/inputfield";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from "@/components/ui/label";
import { EditUser } from "@/types/user";

const EditUserPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const user_id = searchParams.get("user_id");
    const [designation, setDesignation] = useState<string>("")
    const { mutate, isLoading } = useUpdate();


    const { data: UserData } = useOne<EditUser>({
        resource: "user",
        id: `_user_id=${user_id}` || ""
    });
    const BookTitle = "Edit Book"

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<EditUser>();



    useEffect(() => {
        if (Array.isArray(UserData?.data) && UserData.data.length > 0) {
            const book = UserData.data[0];
            Object.keys(book).forEach((key) => {
                let value = book[key as keyof EditUser];
                setValue(key as keyof EditUser, value as never);
            });
            //   setIsLoadingInput(false);
        }
    }, [UserData, setValue]);

    const onSubmit = async (data: any) => {
        // setIsLoading(true)

        mutate(
              {
                resource: "user/edit",
                values: data
              },
              {
                onSuccess: () => {
                  toast.success("User updated successfully!");
                  
                },
                onError: (error: any) => {
                  toast.error(
                    `Error updating user: ${
                      error.message || "Please try again later."
                    }`
                  );
                },
              }
            );
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <>
                <section className="p-10">
                    <div className="container">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <div className="grid grid-cols-3 gap-4 p-4">
                                    <InputField
                                        label="Name of User"
                                        name="user_name"
                                        register={register}
                                        errors={errors}
                                        type="text"
                                        validation={{
                                            required: "Name of User is required",
                                        }}
                                        placeholder="Enter Name of User"
                                    />
                                    <InputField
                                        label="Email "
                                        name="email"
                                        register={register}
                                        errors={errors}
                                        type="email"
                                        validation={{
                                            required: "Email is required",
                                        }}
                                        placeholder="Enter Email"
                                    />

                                    <InputField
                                        label="Password"
                                        name="password"
                                        register={register}
                                        errors={errors}
                                        type="password"
                                        validation={{
                                            required: "Password is required",
                                        }}
                                        placeholder="Enter Password"
                                    />
                                    <div className='text-[#717680]'>
                                        <Label>Designation</Label>
                                        <Select
                                            onValueChange={(value) => {
                                                setDesignation(value);
                                                setValue("designation", value);
                                            }}
                                            value={designation}
                                        >
                                            <SelectTrigger className="w-full p-2 border border-[#717680] rounded">
                                                <SelectValue placeholder="Select Designation" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="librarian">Librarian</SelectItem>
                                                <SelectItem value="assistant">Assistant</SelectItem>
                                                <SelectItem value="receptionist">Receptionist</SelectItem>

                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <InputField
                                        label="Phone Number"
                                        name="phone_number"
                                        register={register}
                                        errors={errors}
                                        type="text"
                                        validation={{
                                            required: "Phone number is required",
                                        }}
                                        placeholder="Enter phone number"
                                    />

                                </div>


                            </div>
                            <div className='flex justify-center gap-6'>
                                <Button
                                    className='shadow-none text-[#1E40AF] rounded-[10px]'
                                    type='button'
                                >Cancel</Button>
                                <Button
                                    type="submit"
                                    className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]"
                                >
                                    Update User
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            </></Suspense>
    );
};

export default EditUserPage;
