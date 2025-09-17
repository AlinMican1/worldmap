"use client";
import { usePathname } from "next/navigation";
import "./navbar.css";
import BoxDesign from "../atoms/boxDesign";
import Button from "../atoms/button";
import { useEffect, useState } from "react";
import CalendarIcon from "../icons/calendar";
import DashboardIcon from "../icons/dashboard";
import Link from "next/link";
const Navbar = () => {
  const pathname = usePathname();

  const [activePage, setActivePage] = useState<string>("");

  return (
    <>
      {/* {pathname !== "/something" && ( */}
      <div className="navbar-container">
        <h1>GLOBAL MEET</h1>
        <BoxDesign variant="secondary-DesignBox" centered="left" orientation="column">
          <p>NAVIGATION</p>
          <Link href="/" passHref>
            <Button variant="nav-btn" className={pathname === "/" ? "active" : ""}>
              <div className="btn-items">
                <DashboardIcon />
                Dashboard
              </div>
            </Button>
          </Link>

          <Link href="/schedule" passHref>
            <Button variant="nav-btn" className={pathname === "/schedule" ? "active" : ""}>
              <div className="btn-items">
                <CalendarIcon />
                Schedule Meeting
              </div>
            </Button>
          </Link>
        </BoxDesign>
      </div>
      {/* )} */}
    </>
  );
};
export default Navbar;
