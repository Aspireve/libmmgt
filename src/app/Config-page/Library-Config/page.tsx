"use client";

import { useState } from "react";
import Header from "@/components/custom/header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const FormSchema = z.object({
  emailNotifications: z.boolean().default(true),
});

const Page = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    maxBooks: "05",
    borrowDays: "100",
    lateFees: "100",
    libraryHours: "09:00 am - 04:00 pm",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      emailNotifications: true,
    },
  });

  function handleUpdateClick() {
    setIsEditable(!isEditable);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div className="p-6">
      <Header heading="Library Configuration" subheading="" />

      {/* Library Rules Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 ml-9 text-[#0f0f0f]">
          Library Rules
        </h2>
        <Card className="p-4 space-y-4 ml-7 border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Maximum number of books a student can borrow
              </label>
              <Input
                type="text"
                name="maxBooks"
                value={formData.maxBooks}
                onChange={handleChange}
                readOnly={!isEditable}
                className="w-full border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                No. of days a student can borrow books
              </label>
              <Input
                type="text"
                name="borrowDays"
                value={formData.borrowDays}
                onChange={handleChange}
                readOnly={!isEditable}
                className="w-full border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Late Fees per day
              </label>
              <Input
                type="text"
                name="lateFees"
                value={formData.lateFees}
                onChange={handleChange}
                readOnly={!isEditable}
                className="w-full border border-gray-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Library Operating Hours
            </label>
            <Input
              type="text"
              name="libraryHours"
              value={formData.libraryHours}
              onChange={handleChange}
              readOnly={!isEditable}
              className="w-1/3 border border-gray-300"
            />
          </div>
        </Card>
      </div>

      {/* Email Rules Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 ml-6 text-[#8E8E93]">
          Setup Email
        </h2>
        <Card className="p-4 ml-6 w-full min-w-[400px] border border-gray-300">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel className="text-sm font-medium text-black">
                      Email Rules
                    </FormLabel>
                    <div className="relative w-full">
                      <Input
                        type="text"
                        value="Book Borrowing Rules Notification"
                        readOnly
                        className="pr-16 border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => field.onChange(!field.value)}
                        className={`absolute top-1/2 right-2 transform -translate-y-1/2 w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          field.value ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                            field.value ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          className="flex items-center gap-2 bg-[#1E40AF] text-white rounded-[8px] hover:bg-blue-900 mt-5 ml-5"
          onClick={handleUpdateClick}
        >
          {isEditable ? "Save" : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default Page;
