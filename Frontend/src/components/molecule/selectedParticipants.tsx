import { ClientInfoProps } from "@/types/interfaces";
import "../../app/globals.css";
import "./selectedParticipant.css";
import Button from "../atoms/button";
interface SelectedParticipantsProps {
  participants: ClientInfoProps[];
}

const SelectedParticipants = ({ participants }: SelectedParticipantsProps) => {
  return (
    <div>
      <h3>Selected ({participants.length})</h3>
      <div className="participants-box">
        {participants.map((participant: ClientInfoProps, index: number) => (
          <div key={index} className="participant-wrapper">
            <div className="elements-row">
              <p className="elements-row">
                {participant.first_name} {participant.surname}
              </p>
              <Button variant="primary-btn">X</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedParticipants;
