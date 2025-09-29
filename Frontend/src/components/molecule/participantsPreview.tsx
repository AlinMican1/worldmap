import { useEffect, useState } from "react";
import { AddClientInfoProps, ClientInfoProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import { GetTimeFromDifferentCountry } from "@/REST/GET";

interface ClientWithTime extends ClientInfoProps {
  meetingTime?: string;
  error?: string;
}

const ParticipantsPreview = ({ clients, parentWidth }: AddClientInfoProps) => {
  const [clientsWithTime, setClientsWithTime] = useState<ClientWithTime[]>([]);

  useEffect(() => {
    const fetchTimes = async () => {
      const updated = await Promise.all(
        clients
          .filter((p) => p.selected)
          .map(async (client) => {
            try {
              const data = await GetTimeFromDifferentCountry(client.timezone, client.location);
              return { ...client, meetingTime: data.time };
            } catch (err) {
              return { ...client, error: "Could not fetch time" };
            }
          })
      );
      setClientsWithTime(updated);
    };

    fetchTimes();
  }, [clients]);

  return (
    <div className="wrapper">
      {clientsWithTime.map((client, key) => (
        <BoxDesign
          key={key}
          variant="seventh-DesignBox"
          centeredX="leftX"
          centeredY="leftY"
          style={{ width: `${parentWidth}px` }}
        >
          {client.error ? <p>{client.error}</p> : <p>Local time: {client.meetingTime}</p>}
          <h1>
            {client.first_name} {client.surname}
          </h1>
          <p>{client.timezone}</p>
        </BoxDesign>
      ))}
    </div>
  );
};

export default ParticipantsPreview;
