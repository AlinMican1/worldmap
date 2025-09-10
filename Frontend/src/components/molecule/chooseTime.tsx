import { useCallback, useEffect, useRef, useState } from "react";
import { CLOCKMAP } from "../../../helper/Constants";
import "../../app/globals.css";
import SelectBox from "../atoms/selectBox";
import { useDateAndTimeContext } from "@/contexts";
import "./chooseTime.css";
import Modal from "../atoms/modal";
import { getDayMonthYear, getISODate } from "../../../helper/Formatter";
import Button from "../atoms/button";
import BoxDesign from "../atoms/boxDesign";
import ExitIcon from "../icons/exit";
import ClockIcon from "../icons/clock";

const ChooseTime = () => {
  const { dateArray, setTime, time, setDateAndTimeMap } = useDateAndTimeContext();
  const [changeClockto24HR, setChangeClockto24HR] = useState<boolean>(false);
  const scrollTop = useRef<HTMLDivElement | null>(null);

  const addDateToArrays = useCallback((dates: string[]): string[] => {
    return dates.sort((a, b) => getISODate(a).getTime() - getISODate(b).getTime());
  }, []);

  // useEffect(() => {
  //   if (scrollTop.current) {
  //     scrollTop.current.scrollTo(0, 0);
  //   }
  // }, [changeClockto24HR]);

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
            <BoxDesign variant="secondary-DesignBox" padding="none">
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
              </div>

              <div className="time-dropdown">
                <div>
                  {Array.from(CLOCKMAP.entries()).map(([key, value]) => {
                    // Calculate the time format here, before the return
                    const timeValue = changeClockto24HR ? value : key;

                    return (
                      <div key={key}>
                        <Button
                          variant="primary-btn"
                          onClick={() => {
                            (setTime(timeValue), open());
                          }}
                        >
                          {timeValue}
                        </Button>
                        {/* <SelectBox
                          name={timeValue}
                          className="choose-time-slot"
                         
                        /> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            </BoxDesign>
          )}
        >
          {(close) => (
            <BoxDesign
              padding="medium"
              orientation="column"
              centered="left"
              variant="third-DesignBox"
            >
              <h1 className="modalTime-heading">Confirm your choice</h1>

              <BoxDesign padding="none">
                <span className="modalTime-Text">
                  {time}
                  <ClockIcon className="" />
                </span>
              </BoxDesign>

              <BoxDesign padding="none" orientation="row">
                <div className="grid-display-time">
                  {dateArray.array.map((date, index) => {
                    const month = getISODate(date).toLocaleString("default", { month: "short" });
                    const dayName = getISODate(date).toLocaleString("default", {
                      weekday: "short",
                    });
                    const { day, year } = getDayMonthYear(date);
                    return (
                      <BoxDesign
                        orientation="column"
                        centered="left"
                        variant="primary-DesignBox"
                        padding="small"
                        key={index}
                      >
                        <span>{dayName}</span>
                        <div className="elements-row">
                          {day} {month}
                        </div>
                      </BoxDesign>
                    );
                  })}
                </div>
              </BoxDesign>

              <div className="close-btn-pos">
                <button className="close-btn" onClick={() => close()}>
                  <ExitIcon className={"exit-icon"} />
                </button>
              </div>
              <Button
                variant="secondary-btn"
                onClick={() => {
                  (AddDateAndTimeToMap(), close(), dateArray.clear());
                }}
              >
                Confirm
              </Button>
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
