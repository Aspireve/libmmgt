'use client'

import React, { useState } from 'react'
import Header from '../Header/header'
import { useCreate } from '@refinedev/core'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/custom/inputfield'
import { useForm } from '@refinedev/react-hook-form'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea'
import { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import { AddUserType } from './data'
import PhoneNumber from '@/components/phone-number.tsx/PhoneNumber'

const AddUser = () => {

  const { mutate, isLoading: createLoading } = useCreate()
  const [role, setRole] = useState<string>("")

  const { institute_uuid, institute_name } = useSelector((state: RootState) => state.auth.currentInstitute);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();


  const onSubmit = (data: any) => {
    const formattedData: AddUserType = {
      ...data,
      institute_uuid,
      institute_name
    };
    mutate(
      { resource: "/create-user", values: formattedData },
      {
        onSuccess: () => {
          toast.success("User added successfully!")
        },
        onError: (error) => toast.error("Error adding User: " + error.message),
      }
    );
  };
  return (
    <>
      <Header heading='Add User' subheading='Tanvir Chavan' />
      <section>
        <div>
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
                  <Label>Frequency</Label>
                  <Select
                    onValueChange={(value) => {
                      setRole(value);
                      setValue("role", value);
                    }}
                    value={role}
                  >
                    <SelectTrigger className="w-full p-2 border border-[#717680] rounded">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Librarian">Librarian</SelectItem>
                      <SelectItem value="Assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div>
                  <Label>
                    Phone Number <span className="text-red-500"> *</span>
                  </Label>
                  <PhoneNumber
                    i_name="phone_no"
                    readOnly={false}
                    error={errors}
                    register={register}
                    setValue={(name, value) => {
                      setValue(name, value);
                      if (isPossiblePhoneNumber(value as string)) {
                        clearErrors("phone_no");
                      }
                    }}
                  />
                </div> */}
                <div>
                  <Label className="text-[#808080] font-medium mb-1">Address</Label>
                  <Textarea
                    {...register("address")}
                    className="border-[#000] p-2 text-[#000] rounded-xl"
                    placeholder="Not Provided"
                  />
                </div>

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
                disabled={createLoading}
              >
                {createLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Adding User...
                  </>
                ) : (
                  "Add User"
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default AddUser