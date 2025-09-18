"use client";
import { usePathname } from "next/navigation";
import "./navbar.css";
import BoxDesign from "../atoms/boxDesign";
import Button from "../atoms/button";
import { useEffect, useState } from "react";
import CalendarIcon from "../icons/calendar";
import DashboardIcon from "../icons/dashboard";
import Link from "next/link";
import LogoutIcon from "../icons/logout";
import SettingsIcon from "../icons/settings";
const Navbar = () => {
  const pathname = usePathname();

  const [activePage, setActivePage] = useState<string>("");

  return (
    <>
      {/* {pathname !== "/something" && ( */}
      <div className="navbar-container">
        <h1>GLOBAL MEET</h1>
        <BoxDesign variant="secondary-DesignBox" centered="left" orientation="column">
          <p className="navbar-subTitle">NAVIGATION</p>
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

          <div className="bottom-buttons">
            <Link href="/" passHref>
              <Button variant="log-out-btn" className={pathname === "/" ? "active" : ""}>
                <div className="btn-items">
                  <LogoutIcon className="logout-symbol" />
                  Sign Out
                </div>
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button variant="fifth-btn" className={pathname === "/" ? "active" : ""}>
                <div className="btn-items">
                  <SettingsIcon />
                </div>
              </Button>
            </Link>
          </div>
        </BoxDesign>
      </div>
      {/* )} */}
    </>
  );
};
export default Navbar;
