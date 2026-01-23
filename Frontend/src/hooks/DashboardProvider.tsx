"use client";

import { DashboardContext } from "@/contexts/DashboardContext";
import { UserDetails } from "@/types/interfaces";

export default function DashboardProvider({
  user,
  children,
}: {
  user: UserDetails;
  children: React.ReactNode;
}) {
  return <DashboardContext.Provider value={user}>{children}</DashboardContext.Provider>;
}
