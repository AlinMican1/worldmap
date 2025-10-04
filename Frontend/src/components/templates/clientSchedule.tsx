"use client";
import AddClientInfo from "../organism/addClientInfo";
import ClientList from "../molecule/clientList";
import "../../app/globals.css";
import { ClientInfoProps } from "@/types/interfaces";
import { useState } from "react";

const ClientSchedule = () => {
  const [clients, setClients] = useState<ClientInfoProps[]>([]);

  return (
    <div>
      <AddClientInfo clients={clients} setClients={setClients} />
      {/* <ClientList clients={clients} /> */}
    </div>
  );
};
export default ClientSchedule;
