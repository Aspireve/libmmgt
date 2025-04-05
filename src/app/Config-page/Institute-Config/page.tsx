"use client";
import { useState } from "react";
import { useForm, Path } from "react-hook-form";
import Image from "next/image";
import { InputField } from "@/components/custom/inputfield";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ThakurTrustLogo from "@/images/ThakurTrustLogo.png";
import Header from "@/components/custom/header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { toggleDarkMode } from "@/redux/darkModeSlice";
import { toggleDashboardCards } from "@/redux/dashboardSlice";
import AllUsers from "../Users/page";
import { useOne } from "@refinedev/core";
import { toast } from "sonner";
import { dataProvider } from "@/providers/data";

const HARD_CODED_ID = "TCA2025"; // Hardcoded ID

type FormFields = {
  instituteName: string;
  email: string;
  phoneNumber: string;
  author: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const [showReportCards, setShowReportCards] = useState(true);

  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  const showDashboardCards = useSelector(
    (state: RootState) => state.dashboard.showDashboardCards
  );

  // Fetch institute details
  const { data, isLoading } = useOne({
    id: `institute_id=${HARD_CODED_ID}`,
    resource: `config/get-institutebyid`,
    queryOptions: {
      enabled: true,
      // In your onSuccess handler, change the field names to match:
      onSuccess: (response) => {
        if (response?.data?.length > 0) {
          const institute = response.data[0];
          reset({
            instituteName: institute.institute_name || "",
            email: institute.institute_email || "", // This is correct
            phoneNumber: institute.mobile || "", // This is correct
            author: institute.author || "",
          });
        }
      },
      onError: () => {
        toast.error("Failed to fetch institute details.");
      },
    },
  });

  // Handle update
  const handleSaveChanges = async (formData: Partial<FormFields>) => {
    try {
      const apiData = {
        institute_id: HARD_CODED_ID,
        institute_name: formData.instituteName,
        institute_email: formData.email, // Convert to API field name
        mobile: formData.phoneNumber, // Convert to API field name
        author: formData.author,
      };

      const response = await dataProvider.patchUpdate({
        resource: "config/update-institute",
        value: apiData,
      });

      toast.success("Institute Data updated successfully!");
    } catch (error: any) {
      console.error("Update API Error:", error);
      toast.error(error.message || "Failed to update data.");
    }
  };

  return (
    <>
      <Header heading="Institute Configuration" subheading="Tanvir Chavan" />
      <div className="p-8">
        <h1 className="text-xl font-semibold mb-6">Institute Info</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src={ThakurTrustLogo}
                alt="Thakur Trust Logo"
                className="w-44 h-32 object-contain"
              />
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-white mr-4 mt-1"
                onClick={() => setIsEditable(!isEditable)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-grow">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <form onSubmit={handleSubmit(handleSaveChanges)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {(
                    Object.entries({
                      instituteName: "Institute Name",
                      email: "Email",
                      phoneNumber: "Phone Number",
                      author: "Author",
                    }) as Array<[keyof FormFields, string]>
                  ).map(([key, label]) => (
                    <div key={key} className="space-y-2 w-full">
                      <InputField
                        label={label}
                        type="text"
                        register={register}
                        name={key as Path<FormFields>}
                        readonly={!isEditable}
                        errors={errors}
                      />
                    </div>
                  ))}
                </div>

                {isEditable && (
                  <Button type="submit" className="mt-4">
                    Save Changes
                  </Button>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Visualization Section */}
          <div className="border border-[#cdcdd5] rounded-[12px] p-4 bg-white">
            <h2 className="font-medium mb-4">Visualization</h2>
            <div className="flex flex-col space-y-4">
              <div className="border border-[#cdcdd5] rounded-[12px] p-3 bg-white flex items-center justify-between w-full">
                <Label htmlFor="dashboardCard" className="w-full">
                  Dashboard Card
                </Label>
                <button
                  id="dashboardCard"
                  onClick={() => dispatch(toggleDashboardCards())}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    showDashboardCards ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      showDashboardCards ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="border border-[#cdcdd5] rounded-[12px] p-3 bg-white flex items-center justify-between w-full">
                <Label htmlFor="reportCards" className="w-full">
                  Report Cards
                </Label>
                <button
                  id="reportCards"
                  onClick={() => setShowReportCards((prev) => !prev)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    showReportCards ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      showReportCards ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Interface Section */}
          <div className="border border-[#cdcdd5] rounded-[12px] p-4 bg-white">
            <h2 className="font-medium mb-4">Interface</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-[#cdcdd5] rounded-[12px] p-3 w-full">
                <Label htmlFor="darkMode" className="w-full">
                  Dark Mode
                </Label>
                <button
                  id="darkMode"
                  onClick={() => dispatch(toggleDarkMode())}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isDarkMode ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      isDarkMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <AllUsers />
      </div>
    </>
  );
};

export default Page;
