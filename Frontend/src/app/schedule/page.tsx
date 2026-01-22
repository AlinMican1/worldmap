import ClientSchedule from "@/components/templates/clientSchedule";
import { isAuthenticated } from "../../../helper/Authenticated";

export default async function Schedule() {
  //Check for authentication first
  await isAuthenticated();

  return (
    <div>
      <ClientSchedule />
    </div>
  );
}
