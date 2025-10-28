import { AddClientInfoProps, ClientInfoProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import { GetTimeFromDifferentCountry } from "@/REST/GET";
import { useEffect, useState } from "react";
import useArray from "@/hooks/useArray";
import "./participantsPreview.css";
import { getDayMonthYear, getMonthName } from "../../../helper/Formatter";
import "../../app/globals.css";
import ErrorIcon from "../icons/errorIcon";
import ClockIcon from "../icons/clock";

//SOME THINGS TO CONSIDER IF DATE IS SAME E.G 26/10./25 and time is 20:47 then time should be 20:47
// Changing te time or date should change teh timepreview
interface ParticipantPreviewProps extends ClientInfoProps {
  localTime: string;
  actualTime: string;
  canMeet: boolean;
}

interface ParticipantMeetingTimeProps extends AddClientInfoProps {
  meetingTime: string;
  meetingDate: string;
}

const PariticipantsPreview = ({
  clients,
  setClients,
  parentWidth,
  meetingTime,
  meetingDate,
}: ParticipantMeetingTimeProps) => {
  const participants = useArray<ParticipantPreviewProps>();
  //Get timeDifference from user location to client location
  const timeDiff = (startTime: string, endTime: string): string => {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    // Convert both to total minutes
    const startTotalMin = startH * 60 + startM;
    const endTotalMin = endH * 60 + endM;

    const diffMinutes = (endTotalMin - startTotalMin + 1440) % 1440;

    // Convert back to hours and minutes
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const addTimeDiffToDate = (
    meetingDateStr: string,
    meetingTimeStr: string,
    timeDiff: string
  ): Date => {
    const [day, month, year] = meetingDateStr.split("-").map(Number); // assuming format "DD-MM-YYYY"
    const [meetingH, meetingM] = meetingTimeStr.split(":").map(Number);

    const date = new Date(year, month - 1, day, meetingH, meetingM);

    // Parse timeDiff "Xh Ym"
    const match = timeDiff.match(/(\d+)h (\d+)m/);
    if (!match) throw new Error("Invalid timeDiff format");

    const diffH = Number(match[1]);
    const diffM = Number(match[2]);

    date.setHours(date.getHours() + diffH);
    date.setMinutes(date.getMinutes() + diffM);

    return date;
  };

  const checkTimeZone = async (client: ClientInfoProps) => {
    const now = new Date(); // user’s current local time
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const userTime = `${hours}:${minutes}`;
    const clientTime = await GetTimeFromDifferentCountry(client.timezone, client.location);
    // console.log(clientHr + ":" + clientMin);
    const timeDifference = timeDiff(userTime, clientTime.time);
    const meetingDateObj = addTimeDiffToDate(meetingDate, meetingTime, timeDifference);

    // meetingDate.setHours(clientHr, clientMin, 0, 0);

    const actualTime = meetingDateObj.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const actualHour = meetingDateObj.getHours();

    const canMeet = actualHour >= 8 && actualHour <= 17;

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
  }, [clients, meetingDate, meetingTime]);

  return (
    <div>
      {participants.array.length === 0 && (
        <div className="no-participants-wrapper">
          <ClockIcon className="no-participant-ClockIcon" size="64" />
          <h3 className="no-participants-header">Select date/time and participants</h3>
          <p>to see time zone preview</p>
        </div>
      )}
      {participants.array.some((participant) => participant.canMeet === false) && (
        // <BoxDesign
        //   variant="errorPreview-DesignBox"
        //   centeredX="leftX"
        //   centeredY="leftY"

        //   // style={{ width: `${500}px` }}
        // >
        //   <h3 className="preview-TitleError">
        //     {" "}
        //     <ErrorIcon size="24" className="error-icon" />
        //     Consider adjusting time
        //   </h3>
        //   <p className="preview-subTitleError">Some participants will join very late or early.</p>
        // </BoxDesign>
        <div className="preview-error-wrapper">
          <h3 className="preview-TitleError">
            {" "}
            <ErrorIcon size="24" className="error-icon" />
            Consider adjusting time
          </h3>
          <p className="preview-subTitleError">Some participants will join very late or early.</p>
        </div>
      )}
      <div className="previewTimezone-wrapper">
        {participants.array.map((participant, key) => (
          <BoxDesign
            key={key}
            variant="previewTime-DesignBox"
            centeredX="leftX"
            centeredY="leftY"

            // style={{ width: `${500}px` }}
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
            {/* <div className="elements-row"> */}
            <p className="participant-location">
              {participant.location} • {participant.timezone}
            </p>
            {/* <p>{participant.timezone}</p> */}
            {/* </div> */}
          </BoxDesign>
        ))}
      </div>
    </div>
  );
};
export default PariticipantsPreview;
