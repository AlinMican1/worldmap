import { useState } from "react";
import BoxDesign from "../atoms/boxDesign";
import { CLOCKMAP } from "../../../helper/Constants";
import "../../app/globals.css";
import SelectBox from "../atoms/selectBox";
import { useDateAndTimeContext } from "@/contexts";
import Modal from "../atoms/modal";

const ChooseTime = () => {
  const { dateArray, setTime, time } = useDateAndTimeContext();
  const [changeClockto24HR, setChangeClockto24HR] = useState<boolean>(false);

  const handleSelectTime = (time: string) => {
    setTime(time);
  };

  return (
    <BoxDesign>
      {dateArray.array && dateArray.array.length > 0 ? (
        <div>
          <button onClick={() => setChangeClockto24HR(!changeClockto24HR)}>
            Change to {changeClockto24HR ? "12Hr" : "24Hr"} clock
          </button>
          <Modal
            trigger={(open) => (
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
                          (handleSelectTime(timeValue), open());
                        }}
                      />
                    </div>
                  );
                })}
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
                  <button onClick={() => console.log("CONFIRMED")}>Confirm</button>
                </div>
              </BoxDesign>
            )}
          </Modal>
        </div>
      ) : null}
    </BoxDesign>
  );
};
export default ChooseTime;
