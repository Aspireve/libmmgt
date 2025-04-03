"use client";

import Header from "@/components/custom/header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      emailNotifications: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted:", data);
  }

  return (
    <div className="p-6">
      <Header heading="Library Configuration" subheading="Tanvir Chavan" />

      {/* Library Rules Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 ml-9 text-[#8E8E93]">
          Library Rules
        </h2>
        <Card className="p-4 space-y-4 ml-7">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Maximum number of books a student can borrow
              </label>
              <Input type="text" value="05" readOnly className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                No. of days a student can borrow books
              </label>
              <Input type="text" value="100" readOnly className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">
                Late Fees per day
              </label>
              <Input type="text" value="100" readOnly className="w-full" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Library Operating Hours
            </label>
            <Input
              type="text"
              value="09:00 am - 04:00 pm"
              readOnly
              className="w-1/3"
            />
          </div>
        </Card>
      </div>

      {/* Email Rules Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 ml-6 text-[#8E8E93]">
          Setup Email
        </h2>
        <Card className="p-4 ml-6 w-full min-w-[400px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-3">
                    <div className="flex-1 mr-4">
                      <FormLabel className="text-sm font-medium text-black">
                        Email Rules
                      </FormLabel>
                      <div className="flex items-center mt-1">
                        <Input
                          type="text"
                          value="Book Borrowing Rules Notification"
                          readOnly
                          className="w-full mr-3"
                        />
                        <FormControl>
                          <Switch checked={field.value}></Switch>
                        </FormControl>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button className="flex items-center gap-2 bg-[#1E40AF] text-white rounded-[8px] hover:bg-blue-900 mt-5 ml-5">
          Update
        </Button>
      </div>
    </div>
  );
};

export default Page;
