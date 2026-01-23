"use client";

import { useDashboardContext } from "@/contexts/DashboardContext";

const UserWelcome = () => {
  const user = useDashboardContext();

  return <div>Welcome {user.name}</div>;
};

export default UserWelcome;
