"use client";

import { useState, useEffect } from "react";
import Header from "@/components/custom/header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { dataProvider } from "@/providers/data";
import { CustomBreadcrumb } from "@/components/breadcrumb";
import { useOne } from "@refinedev/core";
import { RootState } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";

// Define proper types for the form data
interface LibraryFormData {
  maxBooks: number;
  borrowDays: number;
  late_fees_per_day: number;

  openingTime: string;
  closingTime: string;
}

// Define type for email notification rules
type NotificationRule =
  | "bookBorrowingRules"
  | "returnBooks"
  | "checkin"
  | "checkout"
  | "penalties";
type UserType = "admin" | "student";

interface EmailRules {
  [key: string]: {
    admin: boolean;
    student: boolean;
  };
}

interface LibraryRuleResponse {
  library_rule_id: string;
  max_books: string;
  borrow_days: string;
  late_fees_fees_per_day: string;
  operating_hours: {
    starting_time: string;
    closing_time: string;
  };
  notification_rules?: {
    bookBorrowingRules?: { admin: boolean; student: boolean };
    returnBooks?: { admin: boolean; student: boolean };
    checkin?: { admin: boolean; student: boolean };
    checkout?: { admin: boolean; student: boolean };
    penalties?: { admin: boolean; student: boolean };
  };
}

const Page = () => {
  const breadcrumbItems = [
    { label: "Configuration", href: "/Config-page" },
    { label: "Library Configuration", href: "/Config-page/Library-Config" },
  ];

  const institute = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );

  const { data, isLoading, refetch } = useOne<LibraryRuleResponse>({
    resource: "config/get-rule-by-institute_uuid",
    id: `institute_uuid=${institute.institute_uuid}`,
  });

  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState<LibraryFormData>({
    maxBooks: 2,
    borrowDays: 7,
    late_fees_per_day: 2,
    openingTime: "08:00",
    closingTime: "20:00",
  });
  const [libraryRuleId, setLibraryRuleId] = useState<string>("");

  // Track initial form data to detect changes
  const [initialFormData, setInitialFormData] = useState<LibraryFormData>({
    ...formData,
  });

  // Email notification rules - only penalties enabled by default
  const [emailRules, setEmailRules] = useState<EmailRules>({
    bookBorrowingRules: { admin: false, student: false },
    returnBooks: { admin: false, student: false },
    checkin: { admin: false, student: false },
    checkout: { admin: false, student: false },
    penalties: { admin: true, student: true }, // Enabled by default
  });

  // Parse time from "8:00 am" format to "08:00" format
  const parseTime = (timeStr: string): string => {
    if (!timeStr) return "";

    const [timePart, period] = timeStr.split(" ");
    const [hourStr, minute] = timePart.split(":");
    let hour = parseInt(hourStr, 10);

    // Convert to 24-hour format
    if (period && period.toLowerCase() === "pm" && hour < 12) {
      hour += 12;
    } else if (period && period.toLowerCase() === "am" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minute}`;
  };

  // Load data from API response
  useEffect(() => {
    if (data?.data) {
      const libraryData = data.data;
      setLibraryRuleId(libraryData.library_rule_id);

      // Parse times from API format
      const openingTime = parseTime(
        libraryData.operating_hours?.starting_time || ""
      );
      const closingTime = parseTime(
        libraryData.operating_hours?.closing_time || ""
      );

      const newFormData = {
        maxBooks: parseInt(libraryData.max_books || "2", 10),
        borrowDays: parseInt(libraryData.borrow_days || "7", 10),
        late_fees_per_day: parseInt(
          libraryData.late_fees_fees_per_day || "2",
          10
        ),
        openingTime: openingTime || "08:00",
        closingTime: closingTime || "20:00",
      };

      setFormData(newFormData);
      setInitialFormData(newFormData);

      // Load notification rules if available
      if (libraryData.notification_rules) {
        setEmailRules({
          bookBorrowingRules: libraryData.notification_rules
            .bookBorrowingRules || { admin: false, student: false },
          returnBooks: libraryData.notification_rules.returnBooks || {
            admin: false,
            student: false,
          },
          checkin: libraryData.notification_rules.checkin || {
            admin: false,
            student: false,
          },
          checkout: libraryData.notification_rules.checkout || {
            admin: false,
            student: false,
          },
          penalties: libraryData.notification_rules.penalties || {
            admin: true,
            student: true,
          },
        });
      }
    }
  }, [data]);

  const form = useForm();

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

  function formatTo12Hour(time: string): string {
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  async function handleUpdateClick() {
    if (isEditable) {
      const changedFields: Partial<
        Record<keyof LibraryFormData, string | number>
      > = {};

      (Object.keys(formData) as Array<keyof LibraryFormData>).forEach((key) => {
        if (formData[key] !== initialFormData[key]) {
          changedFields[key] = formData[key] as string | number;
        }
      });

      // Check if any changes were made to form data or notification rules
      const hasChanges = Object.keys(changedFields).length > 0;

      if (hasChanges) {
        // Transform time into formatted string if needed
        const payload = {
          ...(changedFields.maxBooks && { max_books: changedFields.maxBooks }),
          ...(changedFields.borrowDays && {
            borrow_days: changedFields.borrowDays,
          }),
          ...(changedFields.late_fees_per_day && {
            late_fees_per_day: changedFields.late_fees_per_day,
          }),
          ...(changedFields.openingTime || changedFields.closingTime
            ? {
                operating_hours: {
                  ...(changedFields.openingTime && {
                    starting_time: formatTo12Hour(
                      String(changedFields.openingTime)
                    ),
                  }),
                  ...(changedFields.closingTime && {
                    closing_time: formatTo12Hour(
                      String(changedFields.closingTime)
                    ),
                  }),
                },
              }
            : {}),
          notification_rules: emailRules,
        };

        try {
          const response = await dataProvider.patchUpdate({
            resource: "config/update-rule",
            value: {
              // library_rule_id: libraryRuleId,
              institute_uuid: institute.institute_uuid,
              ...payload,
            },
          });

          toast.success("Library rules updated successfully!");
          setInitialFormData({ ...formData }); // update baseline
          refetch(); // Refresh data from server
        } catch (error: any) {
          console.error("Update error:", error);
          toast.error(error?.message || "Failed to update rules.");
        }
      } else {
        toast.info("No changes detected.");
      }
    }

    setIsEditable((prev) => !prev);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    // List of number fields
    const numericFields: (keyof LibraryFormData)[] = [
      "maxBooks",
      "borrowDays",
      "late_fees_per_day",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name as keyof LibraryFormData)
        ? Number(value)
        : value,
    }));
  }

  function handleTimeChange(
    timeType: "openingTime" | "closingTime",
    value: string
  ) {
    setFormData((prev) => ({ ...prev, [timeType]: value }));
  }

  // Toggle handler for email notifications
  function toggleNotification(rule: NotificationRule, userType: UserType) {
    setEmailRules((prev) => ({
      ...prev,
      [rule]: {
        ...prev[rule],
        [userType]: !prev[rule][userType],
      },
    }));
  }

  // Helper component for notification toggle
  const NotificationToggle = ({
    rule,
    label,
  }: {
    rule: NotificationRule;
    label: string;
  }) => (
    <div className="relative w-full flex items-center mb-3 ">
      <Input type="text" value={label} readOnly className="pr-32 border-0" />
      <div className="absolute right-2 flex space-x-10">
        {(["admin", "student"] as UserType[]).map((userType) => (
          <button
            key={userType}
            type="button"
            onClick={() => toggleNotification(rule, userType)}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
              emailRules[rule][userType] ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
                emailRules[rule][userType] ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  // Format times for display
  const formatLibraryHours = () => {
    // Find display values from our time options
    const openingDisplay =
      timeOptions.find((t) => t.value === formData.openingTime)?.display ||
      formData.openingTime;
    const closingDisplay =
      timeOptions.find((t) => t.value === formData.closingTime)?.display ||
      formData.closingTime;
    return `${openingDisplay} - ${closingDisplay}`;
  };

  if (isLoading) {
    return <div className="p-6">Loading library configuration...</div>;
  }

  return (
    <div className="p-6">
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
                name: "maxBooks",
                label: "Maximum number of books a student can borrow",
              },
              {
                name: "borrowDays",
                label: "No. of days a student can borrow books",
              },
              { name: "late_fees_per_day", label: "Late Fees per day" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1 text-black">
                  {field.label}
                </label>
                <Input
                  type="text"
                  name={field.name}
                  value={formData[field.name as keyof LibraryFormData]}
                  onChange={handleChange}
                  readOnly={!isEditable}
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
                value={formData.openingTime}
                onValueChange={(value) =>
                  handleTimeChange("openingTime", value)
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
                value={formData.closingTime}
                onValueChange={(value) =>
                  handleTimeChange("closingTime", value)
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
              <div>
                <FormLabel className="text-sm font-medium text-black mb-3 block ml-2">
                  Email Rules
                </FormLabel>

                {/* Header Row */}
                <div className="flex items-center mb-2 pl-2 justify-between">
                  <div className="w-full" /> {/* Space for labels */}
                  <div className="flex space-x-10">
                    <span className="text-[14px] font-semibold text-gray-600">
                      Admin
                    </span>
                    <span className="text-[14px] font-semibold text-gray-600">
                      Student
                    </span>
                  </div>
                </div>

                {/* Notification Toggles */}
                <NotificationToggle
                  rule="bookBorrowingRules"
                  label="Book Borrowing Rules Notification"
                />
                <NotificationToggle rule="returnBooks" label="Return Books" />
                <NotificationToggle rule="checkin" label="Checkin" />
                <NotificationToggle rule="checkout" label="Checkout" />
                <NotificationToggle rule="penalties" label="Penalties" />
              </div>
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
