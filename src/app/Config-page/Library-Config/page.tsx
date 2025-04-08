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
  maxBooksStaff: number;
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
  max_days: string; // Note: Changed from borrow_days to match API
  late_fees_per_day: string;
  max_books_staff?: string; // Added this property
  operating_hours: {
    starting_time: string;
    closing_time: string;
  };
  email_notifications?: { // Updated structure matching first document
    borrow_books_admin?: boolean;
    borrow_books_student?: boolean;
    return_books_admin?: boolean;
    return_books_student?: boolean;
    checkin_admin?: boolean;
    checkin_student?: boolean;
    checkout_admin?: boolean;
    checkout_student?: boolean;
    penalties_admin?: boolean;
    penalties_student?: boolean;
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

  // Updated to handle array response
  const { data, isLoading, refetch } = useOne<LibraryRuleResponse[]>({
    resource: "config/get-rule-by-institute_uuid",
    id: `institute_uuid=${institute.institute_uuid}`,
  });

  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState<LibraryFormData>({
    maxBooks: 2,
    borrowDays: 7,
    late_fees_per_day: 2,
    maxBooksStaff: 2,
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

  // Helper function to convert time format
  function convertTo24HourFormat(timeStr: string): string {
    if (!timeStr) return "";
    
    const [time, period] = timeStr.toLowerCase().split(" ");
    if (!time || !period) {
      throw new Error("Invalid time format");
    }
    const timeParts = time.split(":");
    if (timeParts.length !== 2) {
      throw new Error("Invalid time format");
    }
    if (timeParts.length !== 2) {
      throw new Error("Invalid time format");
    }
    const [hourStr, minute] = timeParts;
    let hour: number = parseInt(hourStr, 10);
    
    if (period === "pm" && hour < 12) {
      hour += 12;
    } else if (period === "am" && hour === 12) {
      hour = 0;
    }
    
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  }

  // Load data from API response - updated to handle array response
  useEffect(() => {
    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      console.log("API Data:", data.data);
      // Take the first library rule (or implement logic to choose which one)
      const libraryData = data.data[0];
      setLibraryRuleId(libraryData.library_rule_id);

      // Parse times from API format - using the converted function
      const openingTime = convertTo24HourFormat(libraryData.operating_hours?.starting_time || "8:00 am");
      const closingTime = convertTo24HourFormat(libraryData.operating_hours?.closing_time || "8:00 pm");

      const newFormData = {
        maxBooks: parseInt(libraryData.max_books || "2", 10),
        borrowDays: parseInt(libraryData.max_days || "7", 10), // Note this is max_days in API response
        late_fees_per_day: parseInt(libraryData.late_fees_per_day || "2", 10),
        maxBooksStaff: parseInt(libraryData.max_books_staff || "2", 10),
        openingTime: openingTime || "08:00",
        closingTime: closingTime || "20:00",
      };

      setFormData(newFormData);
      setInitialFormData(newFormData);

      // Load notification rules if available - updated to handle new structure
      if (libraryData.email_notifications) {
        setEmailRules({
          bookBorrowingRules: {
            admin: libraryData.email_notifications.borrow_books_admin || false,
            student: libraryData.email_notifications.borrow_books_student || false,
          },
          returnBooks: {
            admin: libraryData.email_notifications.return_books_admin || false,
            student: libraryData.email_notifications.return_books_student || false,
          },
          checkin: {
            admin: libraryData.email_notifications.checkin_admin || false,
            student: libraryData.email_notifications.checkin_student || false,
          },
          checkout: {
            admin: libraryData.email_notifications.checkout_admin || false,
            student: libraryData.email_notifications.checkout_student || false,
          },
          penalties: {
            admin: libraryData.email_notifications.penalties_admin || true,
            student: libraryData.email_notifications.penalties_student || true,
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
      const changedFields: Partial<Record<keyof LibraryFormData, string | number>> = {};
      
      // Compare current form data to initial form data
      (Object.keys(formData) as Array<keyof LibraryFormData>).forEach((key) => {
        if (formData[key] !== initialFormData[key]) {
          changedFields[key] = formData[key];
        }
      });

      // Check if any changes were made to form data or notification rules
      const hasChanges = Object.keys(changedFields).length > 0;

      if (hasChanges) {
        // Transform the notification rules to match API format
        const transformedEmailRules = {
          borrow_books_admin: emailRules.bookBorrowingRules.admin,
          borrow_books_student: emailRules.bookBorrowingRules.student,
          return_books_admin: emailRules.returnBooks.admin,
          return_books_student: emailRules.returnBooks.student,
          checkin_admin: emailRules.checkin.admin,
          checkin_student: emailRules.checkin.student,
          checkout_admin: emailRules.checkout.admin,
          checkout_student: emailRules.checkout.student,
          penalties_admin: emailRules.penalties.admin,
          penalties_student: emailRules.penalties.student,
        };

        const payload = {
          ...(changedFields.maxBooks && { max_books: changedFields.maxBooks }),
          ...(changedFields.borrowDays && { max_days: changedFields.borrowDays }), // Note correct field name
          ...(changedFields.late_fees_per_day && { late_fees_per_day: changedFields.late_fees_per_day }),
          ...(changedFields.maxBooksStaff && { max_books_staff: changedFields.maxBooksStaff }), // Added max_books_staff
          ...(changedFields.openingTime || changedFields.closingTime
            ? {
                operating_hours: {
                  ...(changedFields.openingTime && {
                    starting_time: formatTo12Hour(String(changedFields.openingTime)),
                  }),
                  ...(changedFields.closingTime && {
                    closing_time: formatTo12Hour(String(changedFields.closingTime)),
                  }),
                },
              }
            : {}),
          email_notifications: transformedEmailRules, // Using correctly formatted email rules
        };

        try {
          const response = await dataProvider.patchUpdate({
            resource: "config/update-rule",
            value: {
              library_rule_id: libraryRuleId, // Include the rule ID for the update
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
      "maxBooksStaff", // Added maxBooksStaff to numeric fields
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
            disabled={!isEditable}
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
                name: "maxBooksStaff", // Added new field
                label: "Maximum number of books a staff can borrow",
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