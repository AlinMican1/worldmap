import { ClientInfoProps } from "@/types/interfaces";
import UserPfp from "../atoms/userPfp";
import "./timezoneParticipantChip.css";

interface ParticipantChipProps {
  participant: ClientInfoProps;
}

const TimezoneParticipantChip = ({ participant }: ParticipantChipProps) => {
  return (
    <div className="participant-chip-timezone-wrapper">
      <UserPfp surname={participant.surname} name={participant.first_name} size="userPfp-small" />
      <span className="participant-chip-timezone-name">
        {participant.first_name} {participant.surname}
      </span>
    </div>
  );
};

export default TimezoneParticipantChip;
