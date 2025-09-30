import { AddClientInfoProps, ClientInfoProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import { GetTimeFromDifferentCountry } from "@/REST/GET";
import { useEffect, useState } from "react";
import useArray from "@/hooks/useArray";
import "./participantsPreview.css";

interface ParticipantPreviewProps extends ClientInfoProps {
  localTime: string;
  canMeet: boolean;
}

const PariticipantsPreview = ({ clients, setClients, parentWidth }: AddClientInfoProps) => {
  const participants = useArray<ParticipantPreviewProps>();
  const checkTimeZone = async (client: ClientInfoProps): Promise<boolean> => {
    const now = new Date();
    const timeMeeting = new Date("22:10:23");
    const clientTime = await GetTimeFromDifferentCountry(client.timezone, client.location);
    const [clientHr, clientMin] = clientTime.time.split(":");
    const [userHr, userMin] = now.toLocaleTimeString().split(":");
    const [hourDiff, minDiff] = [
      Number(clientHr) - Number(userHr),
      Number(clientMin) - Number(userMin),
    ];

    console.log(hourDiff, minDiff);
    // console.log(typeof clientTime.time);
    // console.log(Number(userHr), Number(userMin));
    // console.log(typeof now.toLocaleTimeString());
    // const getTimeDifference = clientTime.time - now.toLocaleTimeString()

    return true;
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
              canMeet,
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
      {participants.array.map((participant, key) => (
        <BoxDesign
          key={key}
          variant="seventh-DesignBox"
          centeredX="leftX"
          centeredY="leftY"
          style={{ width: `${parentWidth}px` }}
        >
          {/* {(await checkTimeZone(client)) ? <p>TIME WORKS</p> : <p>EEEEHHHHH BAD BAD</p>} */}
          <h1>
            {participant.first_name} {participant.surname}
          </h1>
          <div className={`canMeet-wrapper ${participant.canMeet ? "active" : "not-active"}`}>
            <p className={`canMeet-text ${participant.canMeet ? "active" : "not-active"}`}>
              {participant.canMeet ? "TIME WORKS" : "BAD BAD"}
            </p>
          </div>
          <p>timezone</p>
        </BoxDesign>
      ))}
    </div>
  );
};
export default PariticipantsPreview;
