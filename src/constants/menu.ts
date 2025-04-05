import { MenuItem } from "@/types/menu";



import {
  AnalyticsUpIcon,
  BookOpen02Icon,
  Configuration01Icon,
  DashboardCircleEditFreeIcons,
  LayersLogoIcon,
  MoneyBag02Icon,
  SearchList02Icon,
} from "@hugeicons/core-free-icons";

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: DashboardCircleEditFreeIcons,
    route: "/",
  },
  {
    id: "all-books",
    title: "All Books",
    icon: BookOpen02Icon,
    route: "/book-pages/all-books",
  },
  {
    id: "student-page",
    title: "Student Directory",
    icon: SearchList02Icon,
    route: "/student-page",
  },
  {
    id: "fees-penalties-page",
    title: "Fees & Penalties",
    icon: MoneyBag02Icon,
    route: "/fees-penalties-page",
  },
  {
    id: "visitlog-page",
    title: "Visit Log",
    icon: LayersLogoIcon,
    route: "/visitlog-page",
  },
  { id: "Reports", title: "Reports", icon: AnalyticsUpIcon, route: "/Reports" },
  {
    id: "Config-page",
    title: "Configuration",
    icon: Configuration01Icon,
    route: "/Config-page",
  },
];
