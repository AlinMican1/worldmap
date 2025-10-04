import { AddClientInfoProps, ClientInfoProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import { GetTimeFromDifferentCountry } from "@/REST/GET";
import { useEffect, useState } from "react";
import useArray from "@/hooks/useArray";
import "./participantsPreview.css";
import { getDayMonthYear, getMonthName } from "../../../helper/Formatter";
import ErrorIcon from "../icons/errorIcon";

interface ParticipantPreviewProps extends ClientInfoProps {
  localTime: string;
  actualTime: string;
  canMeet: boolean;
}

const PariticipantsPreview = ({ clients, setClients, parentWidth }: AddClientInfoProps) => {
  const participants = useArray<ParticipantPreviewProps>();
  const checkTimeZone = async (client: ClientInfoProps) => {
    const now = new Date(); // user’s current local time
    const clientTime = await GetTimeFromDifferentCountry(client.timezone, client.location);

    const [clientHr, clientMin] = clientTime.time.split(":").map(Number);

    const meetingDate = new Date(now);
    meetingDate.setHours(clientHr, clientMin, 0, 0);

    if (meetingDate < now) {
      meetingDate.setDate(meetingDate.getDate() + 1);
    }

    const actualTime = meetingDate.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const canMeet = clientHr >= 8 && clientHr <= 17;

    return {
      actualTime,
      canMeet,
    };
  };

  useEffect(() => {
    const fetchUserData = async () => {
      participants.clear();
      const selectedClients = clients.filter((p) => p.selected);

      for (const client of selectedClients) {
        try {
          const response = await GetTimeFromDifferentCountry(client.location, client.timezone);
          const canMeet = await checkTimeZone(client);

          participants.setArray((oldArray) => [
            ...oldArray,
            {
              ...client,
              localTime: response.time,
              ...canMeet,
            },
          ]);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, [clients]);

  return (
    <div className="wrapper">
      {participants.array.some((participant) => participant.canMeet === false) && (
        <BoxDesign
          variant="errorPreview-DesignBox"
          centeredX="leftX"
          centeredY="leftY"
          style={{ width: `${parentWidth}px` }}
        >
          <h3 className="preview-TitleError">
            {" "}
            <ErrorIcon size="24" className="error-icon" />
            Consider adjusting time
          </h3>
          <p className="preview-subTitleError">Some participants will join very late or early.</p>
        </BoxDesign>
      )}
      {participants.array.map((participant, key) => (
        <BoxDesign
          key={key}
          variant="previewTime-DesignBox"
          centeredX="leftX"
          centeredY="leftY"
          style={{ width: `${parentWidth}px` }}
        >
          <h3 className="participant-name">
            {participant.first_name} {participant.surname}
          </h3>
          <div className={`canMeet-wrapper ${participant.canMeet ? "active" : "not-active"}`}>
            <p className={`canMeet-text ${participant.canMeet ? "active" : "not-active"}`}>
              {participant.canMeet ? "Good Time" : "Very late/early"}
            </p>
          </div>
          <div>
            <p className="participant-actualtime">
              Meeting Start: {participant.actualTime.split(",")[0].split("/")[0]}{" "}
              {getMonthName(participant.actualTime.split(",")[0])} at{" "}
              {participant.actualTime.split(",")[1]}
            </p>
          </div>
          <div className="elements-row">
            <p>{participant.location}</p>
            <p>{participant.timezone}</p>
          </div>
        </BoxDesign>
      ))}
    </div>
  );
};
export default PariticipantsPreview;
