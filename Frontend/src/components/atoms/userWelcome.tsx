"use client";

import { useDashboardContext } from "@/contexts/DashboardContext";
import { useEffect, useState } from "react";
import "./userWelcome.css";
const UserWelcome = () => {
  const user = useDashboardContext();
  const [greeting, setGreeting] = useState<string>("Good morning");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour < 12) {
        setGreeting("Good morning");
      } else if (hour < 17) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateGreeting();
  }, []);
  return (
    <div>
      <h1 className="welcome-header">
        {greeting}, <span className="user-name-highlight">{user.name}</span>
      </h1>
      <p className="welcome-message">Here is what's happening with your workspace today.</p>
    </div>
  );
};

export default UserWelcome;
