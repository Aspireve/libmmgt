"use client";
import { useState, useRef } from "react";
import { useForm, Path } from "react-hook-form";
import Image from "next/image";
import { InputField } from "@/components/custom/inputfield";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, Upload } from "lucide-react";
import ThakurTrustLogo from "@/images/ThakurTrustLogo.png";
import Header from "@/components/custom/header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { toggleDarkMode, setDarkMode } from "@/redux/darkModeSlice";
import {
  toggleDashboardCards,
  setDashboardCards,
} from "@/redux/dashboardSlice";
import AllUsers from "../Users/page";
import { useOne } from "@refinedev/core";
import { toast } from "sonner";
import { dataProvider } from "@/providers/data";
import { toggleTabsVisibility, setTabsVisibility } from "@/redux/tabSlice";
import { CustomBreadcrumb } from "@/components/breadcrumb";
import { toggleReportCards, setReportCards } from "@/redux/reportCardSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { ReloadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import UploaderFactory from "@/utilities/file-upload/upload-factory";

type FormFields = {
  instituteName: string;
  email: string;
  phoneNumber: string;
  author: string;
  city: string;
  institute_abbr: string;
  institute_contact_person: string;
  institute_email: string;
  landline: string;
  mobile: string;
  pincode: string;
  state: string;
  website_url: string;
  institute_logo: string;
  institute_header: string;
  // Add new fields for toggle states
  dark_mode: boolean;
  enable_tabs: boolean;
  dashboard_card: boolean;
  report_cards: boolean;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: async (data) => {
      const errors: any = {};

      if (!data.instituteName)
        errors.instituteName = { message: "Institute Name is required" };
      if (!data.institute_abbr)
        errors.institute_abbr = { message: "Abbreviation is required" };

      return {
        values: Object.keys(errors).length === 0 ? data : {},
        errors,
      };
    },
  });

  const [isEditable, setIsEditable] = useState(false);
  const [patchLoading, setPatchLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [headerUploading, setHeaderUploading] = useState(false);
  const [isSavingToggles, setIsSavingToggles] = useState(false);
  const dispatch = useDispatch();
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const headerFileInputRef = useRef<HTMLInputElement>(null);

  const logoImage = watch("institute_logo");
  const headerImage = watch("institute_header");
  const darkMode = watch("dark_mode");
  const enableTabs = watch("enable_tabs");
  const dashboardCard = watch("dashboard_card");
  const reportCards = watch("report_cards");

  const showReportCards = useSelector(
    (state: RootState) => state.reportCard.showReportCards
  );
  const showTabs = useSelector((state: RootState) => state.tabs.tabsVisible);
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  const showDashboardCards = useSelector(
    (state: RootState) => state.dashboard.showDashboardCards
  );

  const institute = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );

  const breadcrumbItems = [
    { label: "Configuration", href: "/Config-page" },
    { label: "Institute Configuration", href: "/Config-page/Institute-Config" },
  ];

  const { data, isLoading, refetch } = useOne({
    id: `institute_id=${institute.institute_id}`,
    resource: `config/get-institutebyid`,
    queryOptions: {
      enabled: true,
      onSuccess: (response) => {
        if (response?.data?.length > 0) {
          const institute = response.data[0];

          // Update form with institute data
          reset({
            instituteName: institute.institute_name || "",
            email: institute.institute_email || "",
            phoneNumber: institute.mobile || "",
            author: institute.author || "",
            city: institute.city || "",
            institute_abbr: institute.institute_abbr || "",
            institute_contact_person: institute.institute_contact_person || "",
            institute_email: institute.institute_email || "",
            landline: institute.landline || "",
            mobile: institute.mobile || "",
            pincode: institute.pincode || "",
            state: institute.state || "",
            website_url: institute.website_url || "",
            institute_logo: institute.institute_logo || "",
            institute_header: institute.institute_header || "",
            // Set toggle states from API
            dark_mode: institute.dark_mode === true,
            enable_tabs: institute.enable_tabs === true,
            dashboard_card: institute.visualization?.dashboard_card === true,
            report_cards: institute.visualization?.report_cards === true,
          });

          // Also update Redux state to match API values
          dispatch(setDarkMode(institute.dark_mode === true));
          dispatch(setTabsVisibility(institute.enable_tabs === true));
          dispatch(
            setDashboardCards(institute.visualization?.dashboard_card === true)
          );
          dispatch(
            setReportCards(institute.visualization?.report_cards === true)
          );
        }
      },
      onError: () => {
        toast.error("Failed to fetch institute details.");
      },
    },
  });

  // Helper function to convert base64 to file
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          // Set the base64 image for preview
          setValue("institute_logo", e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Add function for handling header upload
  const handleHeaderUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          // Set the base64 image for preview
          setValue("institute_header", e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Function to update a single toggle setting
  const updateToggleSetting = async (settingName: string, value: boolean) => {
    setIsSavingToggles(true);
    try {
      const apiData: any = {
        institute_id: institute.institute_id,
      };

      // Handle visualization nested structure
      if (settingName === "dashboard_card" || settingName === "report_cards") {
        apiData.visualization = {
          [settingName]: value,
        };
      } else {
        apiData[settingName] = value;
      }

      await dataProvider.patchUpdate({
        resource: "config/update-institute",
        value: apiData,
      });

      // Update form state
      if (settingName === "dashboard_card") {
        setValue("dashboard_card", value);
        dispatch(setDashboardCards(value));
      } else if (settingName === "report_cards") {
        setValue("report_cards", value);
        dispatch(setReportCards(value));
      } else if (settingName === "dark_mode") {
        setValue("dark_mode", value);
        dispatch(setDarkMode(value));
      } else if (settingName === "enable_tabs") {
        setValue("enable_tabs", value);
        dispatch(setTabsVisibility(value));
      }

      toast.success(
        `${settingName.replace("_", " ")} setting updated successfully!`
      );
    } catch (error: any) {
      console.error("Toggle update error:", error);
      toast.error(error.message || "Failed to update setting.");

      // Revert Redux state on failure
      if (settingName === "dashboard_card") {
        dispatch(setDashboardCards(!value));
      } else if (settingName === "report_cards") {
        dispatch(setReportCards(!value));
      } else if (settingName === "dark_mode") {
        dispatch(setDarkMode(!value));
      } else if (settingName === "enable_tabs") {
        dispatch(setTabsVisibility(!value));
      }
    } finally {
      setIsSavingToggles(false);
    }
  };

  // Handle toggle button clicks
  const handleDashboardCardsToggle = () => {
    const newValue = !showDashboardCards;
    dispatch(toggleDashboardCards());

    updateToggleSetting("dashboard_card", newValue);
  };

  const handleReportCardsToggle = () => {
    const newValue = !showReportCards;
    dispatch(toggleReportCards());

    updateToggleSetting("report_cards", newValue);
  };

  const handleTabsToggle = () => {
    const newValue = !showTabs;
    dispatch(toggleTabsVisibility());

    updateToggleSetting("enable_tabs", newValue);
  };

  const handleDarkModeToggle = () => {
    const newValue = !isDarkMode;
    dispatch(toggleDarkMode());

    updateToggleSetting("dark_mode", newValue);
  };

  const handleSaveChanges = async (formData: Partial<FormFields>) => {
    setPatchLoading(true);
    try {
      let logoUrl = formData.institute_logo;
      let headerUrl = formData.institute_header;
      const uploader = UploaderFactory.createUploader("cloudinary");

      // Upload logo to Cloudinary if it's a base64 string (newly uploaded)
      if (
        formData.institute_logo &&
        formData.institute_logo.startsWith("data:image")
      ) {
        setLogoUploading(true);
        const file = base64ToFile(formData.institute_logo, "logo.png");
        logoUrl = await uploader.uploadFile(file);
        setLogoUploading(false);
      }

      // Upload header to Cloudinary if it's a base64 string (newly uploaded)
      if (
        formData.institute_header &&
        formData.institute_header.startsWith("data:image")
      ) {
        setHeaderUploading(true);
        const file = base64ToFile(formData.institute_header, "header.png");
        headerUrl = await uploader.uploadFile(file);
        setHeaderUploading(false);
      }

      const apiData = {
        institute_id: institute.institute_id,
        institute_name: formData.instituteName,
        institute_email: formData.email,
        mobile: formData.phoneNumber,
        author: formData.author,
        city: formData.city,
        institute_abbr: formData.institute_abbr,
        institute_contact_person: formData.institute_contact_person,
        landline: formData.landline,
        pincode: formData.pincode,
        state: formData.state,
        website_url: formData.website_url,
        institute_logo: logoUrl,
        institute_header: headerUrl,
        // Include toggle states in the API request
        dark_mode: formData.dark_mode,
        enable_tabs: formData.enable_tabs,
        visualization: {
          dashboard_card: formData.dashboard_card,
          report_cards: formData.report_cards,
        },
      };

      const response = await dataProvider.patchUpdate({
        resource: "config/update-institute",
        value: apiData,
      });

      setIsEditable(false);
      setPatchLoading(false);

      toast.success("Institute Data updated successfully!");

      // Refresh data
      refetch();
    } catch (error: any) {
      console.error("Update API Error:", error);
      toast.error(error.message || "Failed to update data.");
      setPatchLoading(false);
      setLogoUploading(false);
      setHeaderUploading(false);
    }
  };

  return (
    <>
      <Header heading="Institute Configuration" subheading="Tanvir Chavan" />
      <CustomBreadcrumb items={breadcrumbItems} />
      <div className="p-8">
        <div className="flex items-center gap-6 mb-6">
          <h1 className="text-xl font-semibold">Institute Info</h1>
          <Button
            size="icon"
            className="h-8 w-8 rounded-full bg-[#93c5fd] border border-gray-200 shadow-sm hover:bg-white mr-4 mt-1"
            onClick={() => setIsEditable(!isEditable)}
          >
            <Pencil className="h-4 w-4 text-[#4740af]" />
          </Button>
        </div>
        <div className="flex items-center justify-between mb-6 gap-6">
          <div className="flex-shrink-0 bg-[#edf1ff] rounded-xl border border-[#93c5fd] relative w-44 h-32 flex items-center justify-center">
            {logoUploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
                <HugeiconsIcon
                  icon={ReloadIcon}
                  className="h-8 w-8 text-white animate-spin"
                  strokeWidth={2}
                />
              </div>
            ) : logoImage ? (
              <Image
                src={logoImage}
                alt="Institute Logo"
                className="w-44 h-32 object-contain"
                width={176}
                height={128}
              />
            ) : (
              <Image
                src={ThakurTrustLogo}
                alt="Thakur Trust Logo"
                className="w-44 h-32 object-contain"
              />
            )}
            {isEditable && (
              <>
                <input
                  ref={logoFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-100 text-gray-700"
                  onClick={() => logoFileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Logo
                </Button>
              </>
            )}
          </div>
          <div className="flex-1">
            <div className="relative bg-[#edf1ff] rounded-xl border border-[#93c5fd] h-32 flex items-center justify-center">
              {headerUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
                  <HugeiconsIcon
                    icon={ReloadIcon}
                    className="h-8 w-8 text-white animate-spin"
                    strokeWidth={2}
                  />
                </div>
              ) : headerImage ? (
                <Image
                  src={headerImage}
                  alt="Institute Header"
                  className="w-full h-32 object-contain"
                  width={800}
                  height={128}
                />
              ) : (
                <Image
                  src={ThakurTrustLogo}
                  alt="Thakur Trust Logo"
                  className="w-full h-32 object-contain"
                />
              )}
              {isEditable && (
                <>
                  <input
                    ref={headerFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleHeaderUpload}
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-100 text-gray-700"
                    onClick={() => headerFileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Header
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {Array.from({ length: 13 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="h-10 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleSaveChanges)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {(
                    Object.entries({
                      instituteName: "Institute Name",
                      institute_abbr: "Institute Abbreviation",
                      institute_email: "Institute Email",
                      phoneNumber: "Phone Number",
                      mobile: "Mobile",
                      author: "Author",
                      city: "City",
                      institute_contact_person: "Contact Person",
                      landline: "Landline",
                      pincode: "Pincode",
                      state: "State",
                      website_url: "Website URL",
                    }) as Array<[keyof FormFields, string]>
                  ).map(([key, label]) => (
                    <div key={key} className="space-y-2 w-full">
                      <InputField
                        label={label}
                        type="text"
                        register={register}
                        name={key as Path<FormFields>}
                        readonly={!isEditable}
                        required={["instituteName", "institute_abbr"].includes(
                          key as keyof FormFields
                        )}
                        errors={errors}
                      />
                    </div>
                  ))}
                </div>

                {isEditable && (
                  <Button
                    disabled={patchLoading || logoUploading || headerUploading}
                    type="submit"
                    className="mt-4"
                  >
                    {patchLoading || logoUploading || headerUploading ? (
                      <>
                        Saving...
                        <HugeiconsIcon
                          icon={ReloadIcon}
                          className="h-5 w-5 animate-spin ml-2"
                          strokeWidth={2}
                        />
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Toggles Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Visualization Section */}
          <div className="border border-[#cdcdd5] rounded-[12px] p-4 bg-white">
            <h2 className="font-medium mb-4">Visualization</h2>
            <div className="flex flex-col space-y-4">
              {/* Dashboard Cards */}
              <div className="border border-[#cdcdd5] rounded-[12px] p-3 bg-white flex items-center justify-between w-full">
                <Label htmlFor="dashboardCard" className="w-full">
                  Dashboard Card
                </Label>
                <button
                  id="dashboardCard"
                  disabled={isSavingToggles}
                  onClick={handleDashboardCardsToggle}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    showDashboardCards ? "bg-blue-600" : "bg-gray-300"
                  } ${isSavingToggles ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      showDashboardCards ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Report Cards */}
              <div className="border border-[#cdcdd5] rounded-[12px] p-3 bg-white flex items-center justify-between w-full">
                <Label htmlFor="reportCards" className="w-full">
                  Report Cards
                </Label>
                <button
                  id="reportCards"
                  disabled={isSavingToggles}
                  onClick={handleReportCardsToggle}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    showReportCards ? "bg-blue-600" : "bg-gray-300"
                  } ${isSavingToggles ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      showReportCards ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Tabs */}
              <div className="border border-[#cdcdd5] rounded-[12px] p-3 bg-white flex items-center justify-between w-full">
                <Label htmlFor="tabsToggle" className="w-full">
                  Tabs
                </Label>
                <button
                  id="tabsToggle"
                  disabled={isSavingToggles}
                  onClick={handleTabsToggle}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    showTabs ? "bg-blue-600" : "bg-gray-300"
                  } ${isSavingToggles ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      showTabs ? "translate-x-5" : "translate-x-0"
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
                  disabled={isSavingToggles}
                  onClick={handleDarkModeToggle}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isDarkMode ? "bg-blue-600" : "bg-gray-300"
                  } ${isSavingToggles ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      isDarkMode ? "translate-x-5" : "translate-x-0"
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
