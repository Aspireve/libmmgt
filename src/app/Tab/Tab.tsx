// "use client"


// import React, { useState } from "react";
// import { Button } from "@/components/ui/button"; 
// import path from "path";

// const routes = [
//   { key: "dashboard", label: "Dashboard", path: },
//   { key: "all-books", label: "All Books" },
//   { key: "issued-books", label: "Issued Books" },
// ];

// const Tabbing: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   return (
//     <div
//       className=" mt-8
//         flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px]
//         m-5 ml-[45px] p-[8px] flex-wrap gap-[6px] max-w-[80%] 
//         sm:p-[10px] sm:gap-[8px] sm:max-w-[70%]
//         lg:max-w-[28%] lg:flex-nowrap 
//       "
//     >
//       {routes.map(({ key, label }) => {
//         const isActive = activeTab === key;

//         const paddingClasses =
//           "py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";

//         const activeClasses = "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-#1E40AF tex-white";
//         const inactiveClasses =
//           "bg-white text-black border-0";

//         return (
//           <Button
//             key={key}
//             onClick={() => setActiveTab(key)}
//             className={`rounded-[6px] transition-colors  ${paddingClasses} ${
//               isActive ? activeClasses : inactiveClasses
//             }`}
//           >
//             {label}
//           </Button>
//         );
//       })}
//     </div>
//   );
// };

// export default Tabbing;

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"; 

const routes = [
  { key: "all-books", label: "All Books", path: "/all-books" },
  { key: "ava-books", label: "Available Books", path: "/dashboard" },
  { key: "issued-books", label: "Issued Books", path: "/issued-books" },
];

const Tabbing: React.FC = () => {
  const pathname = usePathname(); // Get current route

  return (
    <div
      className="mt-8 flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px] gap-[6px] ml-[10px] w-[30%] p-[10px]"
    >
      {routes.map(({ key, label, path }) => {
        const isActive = pathname === path;

        const paddingClasses =
          "py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";

        const activeClasses = "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]";
        const inactiveClasses = "bg-white text-black border-0";

        return (
          <Link key={key} href={path} passHref>
            <Button
              className={`rounded-[6px] transition-colors shadow-none ${paddingClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Tabbing;

