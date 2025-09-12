import { ClientInfoProps } from "@/types/interfaces";
import "../../app/globals.css";
import "./selectedParticipant.css";
import Button from "../atoms/button";
import UserPfp from "../atoms/userPfp";
import BoxDesign from "../atoms/boxDesign";
import RemoveIcon from "../icons/remove";
interface SelectedParticipantsProps {
  participants: ClientInfoProps[];
}

const SelectedParticipants = ({ participants }: SelectedParticipantsProps) => {
  return (
    <div>
      <h3>Selected ({participants.length})</h3>

      <BoxDesign variant="eight-DesignBox" centered="left">
        {/* <div className="participants-box"> */}
        {participants.map((participant: ClientInfoProps, index: number) => (
          <div key={index} className="participant-wrapper">
            <div className="elements-row">
              <UserPfp name={participant.first_name} size="userPfp-small" />
              <p>{participant.first_name}</p>
              <p>{participant.surname}</p>
              <div className="remove-btn-pos">
                <Button variant="fifth-btn">
                  {" "}
                  <RemoveIcon className={"exit-icon"} />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {/* </div> */}
      </BoxDesign>
    </div>
  );
};

export default SelectedParticipants;
