"use client"

import React from 'react'
import Header from "@/components/custom/header";
import { Card } from "@/components/ui/card";
import { InputField } from '@/components/custom/inputfield';
import { useForm } from '@refinedev/react-hook-form'

const page = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm();
    return (
        <div className="p-6">
            <Header heading="Library Configuration" subheading="" />
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2 ml-9 text-[#0f0f0f]">
                    Library Rules
                </h2>

                <Card className="p-4 space-y-4 ml-7 border border-gray-300">
                <form onSubmit={handleSubmit(() => {})} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <InputField
                                label="Maximum number of books a student can borrow"
                                name="maxBooks"
                                register={register}
                                errors={errors}
                                type="text"
                                validation={{
                                    required: "Number of books is required",
                                }}
                                placeholder="Enter Number of books"
                            />
                        </div>
                        <div>
                            <InputField
                                label="No. of days a student can borrow books"
                                name="borrowDays"
                                register={register}
                                errors={errors}
                                type="text"
                                validation={{
                                    required: "No. of days",
                                }}
                                placeholder="Enter No. of days"
                            />
                        </div>
                        <div>
                           
                            <InputField
                                label="Late Fees per day"
                                name="lateFees"
                                register={register}
                                errors={errors}
                                type="text"
                                validation={{
                                    required: "Late Fees per day",
                                }}
                                placeholder="Enter Late Fees per day"
                            />
                        </div>
                        <div>
                        <InputField
                                label="Library Operating Hours"
                                name="libraryHours"
                                register={register}
                                errors={errors}
                                type="text"
                                validation={{
                                    required: "Library Operating Hours required",
                                }}
                                placeholder="Enter Library Operating Hours"
                            />
                    </div>
                    </div>
                    </form>
                    
                </Card>
            </div>
        </div>
    )
}

export default page