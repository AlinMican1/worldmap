"use client";
import BoxDesign from "../atoms/boxDesign";
import "./clientList.css";
import "../../app/globals.css";
import { AddClientInfoProps, ClientInfoProps, ClientListProps } from "@/types/interfaces";
import UserPfp from "../atoms/userPfp";
import Button from "../atoms/button";
import SelectedParticipants from "./selectedParticipants";
import PlusIcon from "../icons/plus";

const ClientList = ({ clients, setClients }: AddClientInfoProps) => {
  const handleSelectedParticipants = (participant: ClientInfoProps) => {
    setClients((old) => old.map((c) => (c === participant ? { ...c, selected: !c.selected } : c)));
  };

  return (
    <div className="wrapper">
      {clients
        .filter((c) => !c.selected)
        .map((client, key) => (
          <BoxDesign key={key} variant="seventh-DesignBox" centered="left">
            <div className="elements-row">
              <UserPfp name={client.first_name} size="userPfp-big" />
              <div className="elements-column-no-gap">
                <div className="elements-row">
                  <h3 className="client-name">
                    {client.first_name.slice(0, 15)} {client.surname}
                  </h3>
                  <p className="email-title"> • {client.email}</p>
                </div>
                <p className="location-title">{client.location}</p>
              </div>
              <div className="button-position">
                <Button variant="fourth-btn" onClick={() => handleSelectedParticipants(client)}>
                  <PlusIcon />
                </Button>
              </div>
            </div>
          </BoxDesign>
        ))}
    </div>
  );
};
export default ClientList;
