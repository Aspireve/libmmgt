import { MenuItem } from "@/types/menu";
import Images from "@/images";

export const menuItems: MenuItem[] = [
  { id: "dashboard", title: "Dashboard", icon: Images.DashLogo, route: "/" },
  {
    id: "all-books",
    title: "All Books",
    icon: Images.PenIcon,
    route: "/book-pages/all-books",
  },
  {
    id: "student-page",
    title: "Student Directory",
    icon: Images.IssuedBooks,
    route: "/student-page",
  },
  {
    id: "fees-penalties-page",
    title: "Fees & Penalties",
    icon: Images.FeesPenalties,
    route: "/fees-penalties-page",
  },
  {
    id: "visitlog-page",
    title: "Visit Log",
    icon: Images.VisitLogo,
    route: "/visitlog-page",
  },
  { id: "Reports", title: "Reports", icon: Images.Reports, route: "/Reports" },
  {
    id: "Config-page",
    title: "Configuration",
    icon: Images.config,
    route: "/Config-page",
  },
  {
    id: "add-user",
    title: "ADD User",
    icon: Images.Reports,
    route: "/add-user",
  },
];
