import { AddClientInfoProps, ClientInfoProps } from "@/types/interfaces";
import "../../app/globals.css";
import "./selectedParticipant.css";
import Button from "../atoms/button";
import UserPfp from "../atoms/userPfp";
import BoxDesign from "../atoms/boxDesign";
import RemoveIcon from "../icons/remove";
import { memo } from "react";

const SelectedParticipants = ({ clients, setClients, parentWidth }: AddClientInfoProps) => {
  const handleRemoveParticipant = (participant: ClientInfoProps) => {
    setClients((old) => old.map((c) => (c === participant ? { ...c, selected: false } : c)));
  };

  return (
    <div>
      {clients.some((p) => p.selected) && (
        <div>
          <h3>Selected ({clients.filter((p) => p.selected).length})</h3>
          <BoxDesign
            variant="eight-DesignBox"
            centeredX="leftX"
            centeredY="leftY"
            style={{ width: `${parentWidth}px` }}
          >
            {clients
              .filter((p) => p.selected)
              .map((participant, key) => (
                <div key={key} className="participant-wrapper">
                  <UserPfp
                    surname={participant.surname}
                    name={participant.first_name}
                    size="userPfp-small"
                  />
                  <p>{participant.first_name}</p>
                  <p>{participant.surname}</p>

                  <div className="remove-btn-pos">
                    <Button
                      variant="fifth-btn"
                      onClick={() => handleRemoveParticipant(participant)}
                    >
                      <RemoveIcon className="exit-icon" />
                    </Button>
                  </div>
                </div>
              ))}
          </BoxDesign>
        </div>
      )}
    </div>
  );
};
export default memo(SelectedParticipants);
