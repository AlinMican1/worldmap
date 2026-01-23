import Dashboard from "@/components/templates/dashboard";
import { isAuthenticated } from "../../../helper/Authenticated";
import DashboardProvider from "@/hooks/DashboardProvider";

export default async function DashboardPage() {
  const user = await isAuthenticated();

  return (
    <DashboardProvider user={user}>
      <Dashboard />
    </DashboardProvider>
  );
}
