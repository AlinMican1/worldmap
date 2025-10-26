"use client";
import BoxDesign from "../atoms/boxDesign";
import "./clientList.css";
import "../../app/globals.css";
import { AddClientInfoProps, ClientInfoProps } from "@/types/interfaces";
import UserPfp from "../atoms/userPfp";
import Button from "../atoms/button";
import PlusIcon from "../icons/plus";
import { memo, useState } from "react";
import { InputField } from "../atoms/inputField";
import SearchIcon from "../icons/search";
import ErrorIcon from "../icons/errorIcon";

const ClientList = ({ clients, setClients }: AddClientInfoProps) => {
  console.log("CLIENTS LIST RENDERED");
  const [search, setSearch] = useState<string>("");
  const handleSelectedParticipants = (participant: ClientInfoProps) => {
    setClients((old) => old.map((c) => (c === participant ? { ...c, selected: !c.selected } : c)));
  };

  return (
    <>
      <div className="search-client-wrapper">
        <InputField
          autocomplete="off"
          type="text"
          value={search}
          id="first_name"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Participants..."
          width={"100%"}
          borderRound="6px"
          icon={<SearchIcon size="18" className="search-icon" />}
          errorSpace={false}
        />
      </div>
      <div className="clientList-wrapper">
        {clients.filter((c) => !c.selected).length === 0 && (
          <div className="no-participants-wrapper">
            <ErrorIcon size="48" className="error-Icon" />
            <p>No participants found.</p>
          </div>
        )}
        {clients
          .filter((c) => !c.selected)
          .map(
            (client, key) =>
              client.first_name.toLowerCase().includes(search.toLowerCase()) && (
                <BoxDesign
                  key={key}
                  variant="seventh-DesignBox"
                  centeredX="leftX"
                  centeredY="leftY"
                >
                  <div className="elements-row">
                    <UserPfp name={client.first_name} surname={client.surname} size="userPfp-big" />
                    <div className="elements-column-no-gap">
                      <div className="elements-row">
                        <h3 className="client-name">
                          {client.first_name} {client.surname}
                        </h3>
                        <p className="email-title"> • {client.email}</p>
                      </div>
                      <p className="location-title">
                        {client.location} {client.timezone}
                      </p>
                    </div>
                    <div className="button-position">
                      <Button
                        variant="fourth-btn"
                        onClick={() => handleSelectedParticipants(client)}
                        type="button"
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>
                </BoxDesign>
              )
          )}
      </div>
    </>
  );
};
export default memo(ClientList);
