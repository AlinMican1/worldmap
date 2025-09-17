"use client";
import { usePathname } from "next/navigation";
import "./navbar.css";
import BoxDesign from "../atoms/boxDesign";
import Button from "../atoms/button";
import { useEffect, useState } from "react";
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
            <button className={pathname === "/" ? "active" : ""}>Home</button>
          </Link>

          <Link href="/schedule" passHref>
            <Button variant={pathname === "/schedule" ? "nav-btn" : "nav-btn"}>
              <div className="elements-column">
                Schedule Meeting <p>Create a schedule</p>
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
