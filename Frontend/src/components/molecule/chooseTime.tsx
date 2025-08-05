import { useCallback, useEffect, useRef, useState } from "react";
import { CLOCKMAP } from "../../../helper/Constants";
import "../../app/globals.css";
import SelectBox from "../atoms/selectBox";
import { useDateAndTimeContext } from "@/contexts";
import "./chooseTime.css";
import Modal from "../atoms/modal";
import { getDayMonthYear, getISODate } from "../../../helper/Formatter";
import Button from "../atoms/button";

const ChooseTime = () => {
  const { dateArray, setTime, time, setDateAndTimeMap } = useDateAndTimeContext();
  const [changeClockto24HR, setChangeClockto24HR] = useState<boolean>(false);
  const scrollTop = useRef<HTMLDivElement | null>(null);

  const addDateToArrays = useCallback((dates: string[]): string[] => {
    return dates.sort((a, b) => getISODate(a).getTime() - getISODate(b).getTime());
  }, []);

  useEffect(() => {
    if (scrollTop.current) {
      console.log("RAN");
      scrollTop.current.scrollTo(0, 0);
    }
  }, [changeClockto24HR]);

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
              <h3 className="chooseTime-header">Popular Times</h3>
              <div className="buttons-row">
                <SelectBox
                  name="12hrs"
                  onClick={() => setChangeClockto24HR(false)}
                  className={`button-clock ${changeClockto24HR === false ? "active" : ""}`}
                />
                <SelectBox
                  name="24hrs"
                  onClick={() => setChangeClockto24HR(true)}
                  className={`button-clock ${changeClockto24HR === true ? "active" : ""}`}
                />
                {/* <button
                  className="button-clock"
                  onClick={() => setChangeClockto24HR(!changeClockto24HR)}
                >
                  24Hrs
                 
                </button>
                <button
                  className="button-clock"
                  onClick={() => setChangeClockto24HR(!changeClockto24HR)}
                >
                  12Hrs
                  
                </button> */}
              </div>
              {/* Change to {changeClockto24HR ? "12Hr" : "24Hr"} clock */}
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
            <div className="modalTime-container">
              <h1 className="modalTime-heading">Confirm your choice</h1>
              <div className="elements-row">
                <div className="modalDates-container">
                  {dateArray.array.map((date, index) => {
                    const month = getISODate(date).toLocaleString("default", { month: "short" });
                    const { day, year } = getDayMonthYear(date);
                    return (
                      <div className="modalDate-box">
                        <p className="modalDate-text" key={index}>
                          {day} - {month} - {year}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="modalTime-box">
                  <p>{time}</p>
                </div>
              </div>
              <div className="elements-row">
                <Button variant="outline" onClick={() => close()}>
                  Close
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    (AddDateAndTimeToMap(), close(), dateArray.clear());
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
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
