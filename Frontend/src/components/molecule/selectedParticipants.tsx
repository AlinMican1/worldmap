import { ClientInfoProps } from "@/types/interfaces";
import "../../app/globals.css";
import "./selectedParticipant.css";
import Button from "../atoms/button";
import UserPfp from "../atoms/userPfp";
import BoxDesign from "../atoms/boxDesign";
interface SelectedParticipantsProps {
  participants: ClientInfoProps[];
}

const SelectedParticipants = ({ participants }: SelectedParticipantsProps) => {
  return (
    <div style={{ width: "100%" }}>
      <h3>Selected ({participants.length})</h3>

      <BoxDesign variant="eight-DesignBox" centered="left">
        {/* <div className="participants-box"> */}
        {participants.map((participant: ClientInfoProps, index: number) => (
          <div key={index} className="participant-wrapper">
            <div className="elements-row">
              <UserPfp name={participant.first_name} />
              <p>{participant.first_name}</p>
              <p>{participant.surname}</p>

              <Button variant="secondary-btn">X</Button>
            </div>
          </div>
        ))}
        {/* </div> */}
      </BoxDesign>
    </div>
  );
};

export default SelectedParticipants;
