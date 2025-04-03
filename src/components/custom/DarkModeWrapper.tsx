"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export default function DarkModeWrapper({ children }: { children: React.ReactNode }) {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-black text-black dark:text-white h-full">
        {children}
      </div>
    </div>
  );
}
