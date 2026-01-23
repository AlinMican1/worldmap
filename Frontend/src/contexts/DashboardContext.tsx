"use client";

import { createContext, useContext } from "react";
import { UserDetails } from "@/types/interfaces";

export const DashboardContext = createContext<UserDetails | null>(null);

export const useDashboardContext = () => {
  const user = useContext(DashboardContext);

  if (!user) {
    throw new Error("useDashboardContext must be used within LoggedInUserProvider");
  }

  return user;
};
