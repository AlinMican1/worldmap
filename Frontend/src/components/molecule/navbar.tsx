"use client";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return <>{pathname !== "/" && <div>NAVBAR</div>}</>;
};
export default Navbar;
