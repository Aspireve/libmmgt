"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUpdate } from "@refinedev/core";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CustomBreadcrumb } from "@/components/breadcrumb";
import Header from "@/components/custom/header";
import { RootState } from "@/redux/store/store";
import type { EmailNotification } from "@/types/auth";
import { updateInstituteDetails } from "@/redux/authSlice";

interface LibraryConfig {
  maxBooksStudent: number | undefined;
  maxBooksStaff: number | undefined;
  maxDaysStudent: number | undefined;
  lateFeesPerDay: number | undefined;
  openingHour: string | undefined;
  closingHour: string | undefined;
  emailNotificationStudent: EmailNotification | undefined;
  emailNotificationAdmin: EmailNotification | undefined;
}

const Page = () => {
  const dispatch = useDispatch();
  const { mutate, isLoading } = useUpdate();
  const libraryDetails = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );

  const breadcrumbItems = [
    { label: "Configuration", href: "/Config-page" },
    { label: "Library Configuration", href: "/Config-page/Library-Config" },
  ];
  const notificationTypes = [
    { id: "bookBorrowing", label: "Book Borrowing Rules Notification" },
    { id: "bookReturning", label: "Return Books" },
    { id: "checkIn", label: "Checkin" },
    { id: "checkOut", label: "Checkout" },
    { id: "penalties", label: "Penalties" },
  ];

  const [libraryConfig, setLibraryConfig] = useState<LibraryConfig>({
    maxBooksStudent: libraryDetails?.maxBooksStudent,
    maxBooksStaff: libraryDetails?.maxBooksStaff,
    maxDaysStudent: libraryDetails?.maxDaysStudent,
    lateFeesPerDay: libraryDetails?.lateFeesPerDay,
    openingHour: libraryDetails?.openingHour,
    closingHour: libraryDetails?.closingHour,
    emailNotificationStudent: libraryDetails?.emailNotificationStudent,
    emailNotificationAdmin: libraryDetails?.emailNotificationAdmin,
  });
  const [initialLibraryConfig] = useState(libraryConfig);

  const [isEditable, setIsEditable] = useState(false);

  // Generate time options every 30 minutes
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const hourStr = hour.toString().padStart(2, "0");
        const minStr = minute.toString().padStart(2, "0");
        const timeValue = `${hourStr}:${minStr}`;

        // Format for display (12-hour clock)
        let displayHour = hour % 12;
        if (displayHour === 0) displayHour = 12;
        const ampm = hour < 12 ? "am" : "pm";
        const timeDisplay = `${displayHour}:${minStr} ${ampm}`;

        options.push({ value: timeValue, display: timeDisplay });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    const numericFields: (keyof LibraryConfig)[] = [
      "maxBooksStudent",
      "maxBooksStaff",
      "maxDaysStudent",
      "lateFeesPerDay",
    ];

    setLibraryConfig((prev) => ({
      ...prev,
      [name]: numericFields.includes(name as keyof LibraryConfig)
        ? Number(value)
        : value,
    }));
  }

  function handleTimeChange(
    timeType: "openingHour" | "closingHour",
    value: string
  ) {
    setLibraryConfig((prev) => ({ ...prev, [timeType]: value }));
  }

  // Format times for display
  const formatLibraryHours = () => {
    // Find display values from our time options
    const openingDisplay =
      timeOptions.find((t) => t.value === libraryConfig.openingHour)?.display ||
      libraryConfig.openingHour;
    const closingDisplay =
      timeOptions.find((t) => t.value === libraryConfig.closingHour)?.display ||
      libraryConfig.closingHour;
    return `${openingDisplay?.slice(0, 5)} - ${closingDisplay?.slice(0, 5)}`;
  };

  const handleToggle = (
    userType: "emailNotificationStudent" | "emailNotificationAdmin",
    field: keyof EmailNotification,
    value: boolean
  ) => {
    setLibraryConfig((prev) => ({
      ...prev,
      [userType]: {
        ...prev[userType],
        [field]: value,
      },
    }));
  };

  const handleLibraryConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditable((prev) => !prev);
    if (!isEditable) return;

    const hasChanges = Object.keys(libraryConfig).some((key) => {
      return (
        libraryConfig[key as keyof LibraryConfig] !==
        initialLibraryConfig[key as keyof LibraryConfig]
      );
    });

    if (hasChanges) {
      mutate(
        {
          resource: "/config",
          id: libraryDetails?.libraryRuleId,
          values: libraryConfig,
          meta: { method: "PATCH" },
        },
        {
          onSuccess: () => {
            toast.success("Library configuration updated successfully!");
            dispatch(
              updateInstituteDetails({
                instituteUuid: libraryDetails!.instituteUuid,
                updatedValues: libraryConfig,
              })
            );
          },
          onError: (error) => {
            toast.error(
              "Error updating library configuration: " + error.message
            );
          },
        }
      );
    } else {
      toast.info("No changes made to library configuration.");
    }
  };

  return (
    <form className="p-6">
      <Header heading="Library Configuration" subheading="" />
      <CustomBreadcrumb items={breadcrumbItems} />

      {/* Library Rules Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 ml-9 text-[#0f0f0f]">
          Library Rules
        </h2>
        <Card className="p-4 space-y-4 ml-7 border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "maxBooksStudent",
                label: "Maximum number of books a student can borrow",
              },
              {
                name: "maxBooksStaff", // Added new field
                label: "Maximum number of books a staff can borrow",
              },
              {
                name: "maxDaysStudent",
                label: "No. of days a student can borrow books",
              },
              { name: "lateFeesPerDay", label: "Late Fees per day" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1 text-black">
                  {field.label}
                </label>
                <Input
                  type="text"
                  name={field.name}
                  value={
                    libraryConfig[
                      field.name as keyof Pick<
                        LibraryConfig,
                        | "maxBooksStudent"
                        | "maxBooksStaff"
                        | "maxDaysStudent"
                        | "lateFeesPerDay"
                      >
                    ]
                  }
                  onChange={handleChange}
                  disabled={!isEditable}
                  className="w-full border border-gray-300"
                />
              </div>
            ))}
          </div>

          {/* Time picker for library hours */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Library Operating Hours
            </label>
            <div className="flex items-center space-x-2">
              <Select
                disabled={!isEditable}
                value={libraryConfig?.openingHour?.slice(0, 5)}
                onValueChange={(value) =>
                  handleTimeChange("openingHour", value)
                }
              >
                <SelectTrigger className="w-32 border border-gray-300">
                  <SelectValue placeholder="Opening" />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-white">
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-gray-500">to</span>

              <Select
                disabled={!isEditable}
                value={libraryConfig?.closingHour?.slice(0, 5)}
                onValueChange={(value) =>
                  handleTimeChange("closingHour", value)
                }
              >
                <SelectTrigger className="w-32 border border-gray-300">
                  <SelectValue placeholder="Closing" />
                </SelectTrigger>
                <SelectContent className="max-h-60 bg-white">
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.display}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!isEditable && (
                <div className="ml-2 py-2 px-3 bg-gray-50 border border-gray-300 rounded text-gray-700">
                  {formatLibraryHours()}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Email Rules Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 ml-6 text-[#8E8E93]">
          Setup Email
        </h2>

        <Card className="p-4 ml-6 w-[98%] border border-gray-300">
          <div>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-black mb-3 block ml-2">
                  Email Rules
                </label>

                <div className="border-t">
                  <div className="grid grid-cols-[1fr_100px_100px] items-center">
                    <div className="p-4 font-medium text-sm text-gray-500">
                      {/* Empty header cell */}
                    </div>
                    <div className="p-4 text-center font-medium text-sm text-gray-500">
                      Admin
                    </div>
                    <div className="p-4 text-center font-medium text-sm text-gray-500">
                      Student
                    </div>
                  </div>

                  {notificationTypes.map((type) => (
                    <div
                      key={type.id}
                      className="grid grid-cols-[1fr_100px_100px] items-center border-t"
                    >
                      <div className="p-4 text-sm text-gray-500">
                        {type.label}
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          id={`admin-${type.id}`}
                          checked={
                            libraryConfig?.emailNotificationAdmin !==
                              undefined &&
                            libraryConfig.emailNotificationAdmin[
                              type.id as keyof EmailNotification
                            ]
                          }
                          onCheckedChange={(checked) =>
                            handleToggle(
                              "emailNotificationAdmin",
                              type.id as keyof EmailNotification,
                              checked
                            )
                          }
                          disabled={!isEditable}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          id={`student-${type.id}`}
                          checked={
                            libraryConfig?.emailNotificationStudent &&
                            libraryConfig.emailNotificationStudent[
                              type.id as keyof EmailNotification
                            ]
                          }
                          onCheckedChange={(checked) =>
                            handleToggle(
                              "emailNotificationStudent",
                              type.id as keyof EmailNotification,
                              checked
                            )
                          }
                          disabled={!isEditable}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          type={isEditable ? "submit" : "button"}
          className="flex items-center gap-2 bg-[#1E40AF] text-white rounded-[8px] hover:bg-blue-900 mt-5 ml-5"
          onClick={handleLibraryConfigSubmit}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditable ? "Save" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default Page;
