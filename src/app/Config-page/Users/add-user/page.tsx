'use client'

import React, { useState } from 'react'
import { useCreate } from '@refinedev/core'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/custom/inputfield'
import { useForm } from '@refinedev/react-hook-form'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import { AddUserType } from '@/types/user'
import PhoneNumber from '@/components/phone-number.tsx/PhoneNumber'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

const AddUser = () => {

  const { mutate, isLoading: createLoading } = useCreate()
  const [designation, setDesignation] = useState<string>("")

  const { institute_uuid, institute_name, logo , header } = useSelector((state: RootState) => state.auth.currentInstitute);
  const institute_details = [
    {
      institute_uuid,
      institute_name,
      institute_logo:logo,
      institute_header:header,
    } 
  ]
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm();


  const onSubmit = (data: any) => {
    const formattedData: AddUserType = {
      ...data,
      institute_details,  
      address:"Hello world"
    };
    mutate(
      { resource: "user/create", values: formattedData },
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
      <section>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div>
              <div className="grid grid-cols-3 gap-4 p-4">
                <InputField
                  label="Name of User"
                  name="name"
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
                </div>
                <div className='grid grid-cols-2 gap-4 p-4'>
                <div className='text-[#717680]'>
                  <Label>Designation</Label>
                  <Select
                    onValueChange={(value) => {
                      setDesignation(value);
                      setValue("designation", value);
                    }}
                    value={designation}
                    required
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
                <div>
                  <Label>
                    Phone Number <span className="text-red-500"> *</span>
                  </Label>
                  <PhoneNumber
                    i_name="phone_no"
                    readOnly={false}
                    register={register}
                    setValue={(name, value) => {
                      setValue(name, value);
                      if (isPossiblePhoneNumber(value as string)) {
                        clearErrors("phone_no");
                      }
                    }}
                  />
                </div>
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