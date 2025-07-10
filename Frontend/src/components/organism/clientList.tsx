"use client";
import BoxDesign from "../atoms/boxDesign";
import "./clientList.css";
import "../../app/globals.css";
import { ClientListProps } from "@/types/forms";

const ClientList = ({ clients }: ClientListProps) => {
  return (
    <div className="wrapper">
      {clients.map((client, key) => (
        <BoxDesign key={key + 1}>
          <div className="elements-row">
            <div className="user-pfp"></div>
            <div className="elements-columns">
              <h3 className="client-name">{client.name}</h3>
              <p>{client.email}</p>
            </div>
          </div>
          <p>time</p>
        </BoxDesign>
      ))}
    </div>
  );
};
export default ClientList;
