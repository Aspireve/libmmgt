// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import Images from "@/images";
// import { useTabs } from "../context/TabContext";
// import { useRouter } from "next/navigation";
// import type { Tab } from "@/types/menu";


// const Navbar: React.FC = () => {
//   const { tabs, activeTab, setActiveTab, closeTab } = useTabs();
//   const router = useRouter();

//   const handleCloseTab = (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     tab: Tab
//   ) => {
//     e.stopPropagation();
//     const currentIndex = tabs.findIndex((t) => t.id === tab.id);
//     closeTab(tab.id);
//     if (activeTab === tab.id) {
//       let nextActiveTab;

//       if (tabs.length > 1) {
//         if (currentIndex === tabs.length - 1) {
//           nextActiveTab = tabs[currentIndex - 1];
//         } else {
//           nextActiveTab = tabs[currentIndex + 1];
//         }
//       }
//       if (nextActiveTab) {
//         setActiveTab(nextActiveTab.id);
//         router.push(nextActiveTab.route);
//       } else {
//         router.push("/");
//       }
//     }
//   };

//   return (
//     <div className="w-full shadow-[0_0_2px_0_#00000040] h-16 flex border-b border-b-[#d9d9d9] px-6 bg-white font-josefin">
//       <Link href={"/"}>
//         <Image
//           src={Images.HomeIcon}
//           alt="Home Icon"
//           className="w-5 h-5 mt-[20px] cursor-pointer"
//         />
//       </Link>
//       <div className="flex items-center px-3 h-10 mt-[10px] gap-4">
//         {tabs.map((tab) => (
//           <div
//             key={tab.id}
//             className={`px-4 py-2 flex items-center rounded-3xl cursor-pointer
//                ${activeTab === tab.id ? "bg-blue-300" : "hover:bg-blue-200"}`}
//             onClick={() => setActiveTab(tab.id)}
//           >
//             <Link href={tab.route}>{tab.title}</Link>

//             <button
//               className=" ml-2 border-none"
//               onClick={(e) => handleCloseTab(e, tab)}
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
