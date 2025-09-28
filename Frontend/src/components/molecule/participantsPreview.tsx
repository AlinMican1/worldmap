import { AddClientInfoProps, ClientInfoProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";

const PariticipantsPreview = ({ clients, setClients, parentWidth }: AddClientInfoProps) => {
  const checkTimeZone = (country: string, client?: ClientInfoProps): boolean => {
    // const getCountryTime =
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = -5; // UTC of USA Eastern Time Zone is -05.00
    const usa = utc + 3600000 * offset;
    const usaTimeNow = new Date(usa).toLocaleString();
    console.log(usaTimeNow);
    return true;
  };
  return (
    <div className="wrapper">
      {clients
        .filter((p) => p.selected)
        .map((client, key) => (
          <BoxDesign
            variant="seventh-DesignBox"
            centeredX="leftX"
            centeredY="leftY"
            style={{ width: `${parentWidth}px` }}
          >
            <h1>
              {client.first_name} {client.surname}
            </h1>
            <p>timezone</p>
          </BoxDesign>
        ))}
    </div>
  );
};
export default PariticipantsPreview;
