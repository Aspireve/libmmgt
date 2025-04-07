"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Phone, LogOut } from "lucide-react";
import type { MenuItem } from "@/types/menu";
import { menuItems } from "@/constants/menu";
import Images from "@/images";
import { useDispatch } from "react-redux";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { clearUser } from "@/redux/authSlice";

// Custom hook to detect screen size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const SidebarLink = ({
  item,
  collapsed,
}: {
  item: MenuItem;
  collapsed: boolean;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const isActive =
    item.id === "dashboard"
      ? pathname === item.route
      : pathname.startsWith(item.route);

  const handleClick = () => {
    try {
      const { addTab, setActiveTab } = require("@/redux/tabSlice");
      dispatch(addTab({ title: item.title, route: item.route }));
      dispatch(setActiveTab(item.route));
    } catch (error) {
      console.log("Redux actions not available");
    }
    router.push(item.route);
  };

  return (
    <Link
      key={item.id}
      href={item.route}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className={`flex items-center gap-3 cursor-pointer rounded-[8px] p-2 text-[#1E40AF] group relative transition-all duration-300
      ${isActive ? "bg-blue-300" : "hover:bg-[#EDF1FF]"}
      ${collapsed ? "justify-center" : ""}`}
      title={collapsed ? item.title : ""}
    >
      <HugeiconsIcon
        icon={item.icon}
        size={24}
        color="#1E40AF"
        strokeWidth={1.5}
        className="shrink-0"
      />
      {!collapsed && <span className="text-nowrap">{item.title}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const { width } = useWindowSize();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  // adjust if needed
  const showReportCards = useSelector(
    (state: RootState) => state.reportCard.showReportCards
  );

  useEffect(() => {
    if (width < 1024) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [width]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/LoginPage")
  };

  return (
    <div
      className={`shadow-md border-r border-[#d9d9d9] flex flex-col justify-between font-josefin h-screen transition-all duration-300 relative
      ${collapsed ? "w-[70px]" : "w-[15rem]"}`}
    >
      {/* Logo Section */}
      <div className={`p-4 ${collapsed ? "flex justify-center" : ""}`}>
        <Link href="/">
          {collapsed ? (
            <div className="w-8 h-8 flex items-center justify-center">
              <Image
                src={Images.VighnoLogo}
                alt="VighnoTech Logo"
                className="w-full h-auto"
                width={32}
                height={32}
                quality={100}
                priority
              />
            </div>
          ) : (
            <Image
              src={Images.Logo}
              alt="VighnoTech Logo"
              className="w-full h-auto"
              priority
            />
          )}
        </Link>
      </div>

      {/* Menu Items */}
      <div
        className={`flex-1 space-y-2 ${collapsed ? "px-3.5" : "p-4"
          } transition-all duration-300`}
      >
        {menuItems
          .filter((item) => item.id !== "Reports" || showReportCards)
          .map((item) => (
            <SidebarLink key={item.id} item={item} collapsed={collapsed} />
          ))}
      </div>

      {/* Footer Section */}
      <div className={`p-2 ${collapsed ? "px-1" : "p-4"}`}>
        {/* <div
          className={`flex ${
            collapsed ? "justify-center" : "justify-between"
          } mb-3 cursor-pointer p-2 rounded-md text-[#333333] group relative`}
          title={collapsed ? "Contact" : ""}
        >
          {!collapsed && <span>Contact</span>}
          <Phone size={20} />
        </div> */}
        <div
          className={`flex ${collapsed ? "justify-center" : "justify-between"
            } cursor-pointer p-2 rounded-md text-[#333333] group relative duration-150`}
          title={collapsed ? "Sign out" : ""}
          onClick={handleLogout}
        >
          {!collapsed && <span>Sign out</span>}
          <LogOut size={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
