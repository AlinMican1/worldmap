"use client";
import BoxDesign from "../atoms/boxDesign";
import "./clientList.css";
import "../../app/globals.css";
import { AddClientInfoProps, ClientInfoProps, ClientListProps } from "@/types/interfaces";
import UserPfp from "../atoms/userPfp";
import Button from "../atoms/button";
import SelectedParticipants from "./selectedParticipants";
import useArray from "@/hooks/useArray";
import PlusIcon from "../icons/plus";

const ClientList = ({ clients, setClients }: AddClientInfoProps) => {
  const selectedParticipants = useArray<ClientInfoProps>([]);
  const handleSelectedParticipants = (participant: ClientInfoProps) => {
    selectedParticipants.push(participant);
    setClients(clients.filter((client) => client !== participant));
    console.log(selectedParticipants.array);
  };

  return (
    <div className="wrapper">
      <SelectedParticipants participants={selectedParticipants.array} />
      {clients.map((client, key) => (
        <div key={key + 1}>
          <BoxDesign variant="seventh-DesignBox" centered="left">
            <div className="elements-row">
              <UserPfp name={client.first_name} size="userPfp-big" />
              <div className="elements-column-no-gap">
                <div className="elements-row">
                  <h3 className="client-name">
                    {client.first_name.slice(0, 15)} {client.surname}{" "}
                  </h3>
                  <p className="email-title"> • {client.email}</p>
                </div>

                <p className="location-title">{client.location}</p>
              </div>
              <div className="button-position">
                <Button variant="fourth-btn" onClick={() => handleSelectedParticipants(client)}>
                  <PlusIcon className="" />
                </Button>
              </div>
            </div>
          </BoxDesign>
        </div>
      ))}
    </div>
  );
};
export default ClientList;
