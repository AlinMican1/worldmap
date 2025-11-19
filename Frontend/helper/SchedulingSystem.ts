import { ClientInfoProps } from "@/types/interfaces";

interface PainScoreDataProps {
  first_name: string;
  surname: string;
  email: string;
  timezone: string;
  time: string;
  pain_score: number;
}

interface ClientProp {
  first_name: string;
  surname: string;
  email: string;
  timezone: string;
  time: string;
}

export const WeightedPainScoreData = (clients: ClientProp[]) => {
  const clientData: PainScoreDataProps[] = [];
  for (let client of clients) {
    console.log(client);
  }
  console.log(clientData);
};

export const ScheduleSystem = () => {};
