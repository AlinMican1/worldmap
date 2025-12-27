"use client";
import useArray from "@/hooks/useArray";
import { ClientInfoProps } from "@/types/interfaces";

interface PainScoreDataProps {
  first_name: string;
  surname: string;
  email: string;
  timezone: string;
  time: string;
  pain_score: number;
}

let GG: ClientProp[] = [];

export const WeightedPainScoreData = (clients: ClientProp[]) => {
  const Cli = useArray<ClientProp>([]);
  const clientData: PainScoreDataProps[] = [];
  for (let client of clients) {
    Cli.setArray((oldArray) => [
      ...oldArray,
      {
        email: client.email,
        first_name: client.first_name,
        surname: client.surname,
        timezone: client.timezone,
        utc_offset: client.utc_offset,
        time: client.time,
      },
    ]);
  }
  console.log(Cli.array);
};

export const ScheduleSystem = () => {};
