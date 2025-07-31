import { useCallback, useState } from "react";
import BoxDesign from "../atoms/boxDesign";
import { CLOCKMAP } from "../../../helper/Constants";
import "../../app/globals.css";
import SelectBox from "../atoms/selectBox";
import { useDateAndTimeContext } from "@/contexts";
import "./chooseTime.css";
import Modal from "../atoms/modal";
import { getISODate } from "../../../helper/Formatter";

const ChooseTime = () => {
  const { dateArray, setTime, time, setDateAndTimeMap } = useDateAndTimeContext();

  const [changeClockto24HR, setChangeClockto24HR] = useState<boolean>(false);

  const addDateToArrays = useCallback((dates: string[]): string[] => {
    return dates.sort((a, b) => getISODate(a).getTime() - getISODate(b).getTime());
  }, []);

  const AddDateAndTimeToMap = () => {
    setDateAndTimeMap((prevMap) => {
      const updatedMap = new Map(prevMap);
      if (time) {
        if (updatedMap.has(time)) {
          //Check if there are duplicates
          const existingDates = updatedMap.get(time) || [];
          const newDates = dateArray.array.filter((date) => !existingDates.includes(date));
          const concatArray = existingDates.concat(newDates);
          updatedMap.set(time, addDateToArrays(concatArray || []));
          // updatedMap.get(time)?.push(...newDates);
        } else {
          updatedMap.set(time, dateArray.array);
          //updatedMap.set(time, dateArray.array);
        }
      }

      return updatedMap;
    });
  };

  return (
    <main className="time-container">
      {dateArray.array.length ? (
        <Modal
          trigger={(open) => (
            <div>
              <p className="chooseTime-header">Popular Times</p>
              <button onClick={() => setChangeClockto24HR(!changeClockto24HR)}>
                Change to {changeClockto24HR ? "12Hr" : "24Hr"} clock
              </button>
              <div className="time-dropdown">
                <div>
                  {Array.from(CLOCKMAP.entries()).map(([key, value]) => {
                    // Calculate the time format here, before the return
                    const timeValue = changeClockto24HR ? value : key;

                    return (
                      <div key={key}>
                        <SelectBox
                          name={timeValue}
                          className="choose-time-slot"
                          onClick={() => {
                            (setTime(timeValue), open());
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        >
          {(close) => (
            <BoxDesign>
              <h1>Confirm your choice</h1>
              {dateArray.array.map((date, index) => (
                <p key={index}>{date}</p>
              ))}

              <p>{time}</p>
              <div className="elements-row">
                <button onClick={() => close()}>CLOSE</button>
                <button
                  onClick={() => {
                    (AddDateAndTimeToMap(), close(), dateArray.clear());
                  }}
                >
                  Confirm
                </button>
              </div>
            </BoxDesign>
          )}
        </Modal>
      ) : (
        <p className="paragraph-xs">
          Specify the <span>dates and times </span> <br />
          you would like your meetings to begin.
        </p>
      )}
    </main>
  );
};
export default ChooseTime;
