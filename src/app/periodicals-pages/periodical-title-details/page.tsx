import { InputField } from '@/components/custom/inputfield'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JournalData } from '../types/data';
import { useForm } from '@refinedev/react-hook-form';
import { useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { useOne } from '@refinedev/core';



const PeriodicalTitleDetails = () => {

    const searchParams = useSearchParams();
    const journal_title_id = searchParams.get("journal_title_id")
    const [isLoadingInput, setIsLoadingInput] = useState(true)

    const frequencyArr = [
        "DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY", "BIMONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", "BIENNIAL"
    ]

    const { data: journalData } = useOne<JournalData>({
        resource: "journals/search-periodicals",
        id: `_journal_title_id=${journal_title_id}` || ""
    });

    const {
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm<JournalData>();

    useEffect(() => {
        if (!journalData) return;
        if (journalData?.data?.error) {
            window.history.back();
        } else {
            if (Array.isArray(journalData?.data) && journalData.data.length > 0) {
                const journal = journalData.data[0];

                Object.keys(journal).forEach((key) => {
                    let value = journal[key as keyof JournalData];

                    if (key === "subscription_start_date" || key === "subscription_end_date") {
                        value = value ? new Date(value).toISOString().split("T")[0] : "";
                    }
                    setValue(key as keyof JournalData, value as never); // Set form values
                });
                setIsLoadingInput(false);
            }
        }
    }, [journalData, setValue]);
    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> */}


            <h2> General Information</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
                <InputField
                    label="Name of Publisher"
                    name="name_of_publisher"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                        required: "Name of Publisher is required",
                    }}
                    placeholder="Enter Name of Publisher"
                    loading={isLoadingInput}
                />
                <InputField
                    label="Place of Publication"
                    name="place_of_publication"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                        required: "Place of Publication is required",
                    }}
                    placeholder="Enter Place of Publication"
                    loading={isLoadingInput}
                />

            </div>
            <h2>Subscription Details</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
                <InputField
                    label="Subscription Price"
                    name="subscription_price"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                        required: "Subscription Price is required",
                    }}
                    placeholder="Enter Subscription Price"
                    loading={isLoadingInput}
                />

                <InputField
                    label="Subscription Start Date"
                    name="subscription_start_date"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                        required: "Subscription Start Date is required",
                    }}
                    placeholder="Enter Subscription Start Date"
                    loading={isLoadingInput}
                    disablePast={true}
                />
                <InputField
                    label="Subscription End Date"
                    name="subscription_end_date"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                        required: "Subscription End Date is required",
                    }}
                    placeholder="Enter Subscription End Date"
                    loading={isLoadingInput}
                    disablePast={true}
                />
            </div>
            <h2>Volume & Issue Details</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
                <InputField
                    label="Volume Number"
                    name="volume_no"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                        required: "Volume Number is required",
                    }}
                    placeholder="Enter Volume Number"
                    loading={isLoadingInput}
                />

                <InputField
                    label="Issue Number"
                    name="issue_number"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                        required: "Issue Number is required",
                    }}
                    placeholder="Enter Issue Number"
                    loading={isLoadingInput}
                />
            </div>
            <h2>Publication & Classification</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className='text-[#000000]'>
                    <Label>Frequency</Label>
                    <Select
                        onValueChange={(value) =>
                            register("frequency").onChange({
                                target: { name: "frequency", value },
                            })
                        }
                        value={watch("frequency") || ""}
                        required
                    >
                        <SelectTrigger className="w-full p-2 border border-[#717680] rounded">
                            <SelectValue placeholder="Select Frequency" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {frequencyArr.map((freq) => (
                                <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <InputField
                    label="Classification Number"
                    name="classification_number"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                        required: "Classification Number is required",
                    }}
                    placeholder="Enter Classification Number"
                    loading={isLoadingInput}
                />
            </div>

            {/* </form> */}
        </>
    )
}

export default PeriodicalTitleDetails