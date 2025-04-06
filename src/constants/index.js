import { FaBook, FaUser, FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
export const navLinks = [
  { id: 1, title: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { id: 2, title: "Add Books", path: "/addbook", icon: <FaBook /> },
  { id: 3, title: "My Books", path: "/mybooks", icon: <FaUser /> },
  { id: 3, title: "Log out", path: "/", icon: <MdLogout /> },
];
