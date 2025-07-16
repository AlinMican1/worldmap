import { useState } from "react";
import BoxDesign from "../atoms/boxDesign";
import { CLOCKMAP } from "../../../helper/Constants";
import { ChooseTimeProps } from "@/types/interfaces";
import SelectBox from "../atoms/selectBox";

const ChooseTime = ({ dateArray }: ChooseTimeProps) => {
  const [changeClockto24HR, setChangeClockto24HR] = useState<boolean>(false);

  return (
    <BoxDesign>
      {dateArray.array && dateArray.array.length > 0 ? (
        <div>
          <button onClick={() => setChangeClockto24HR(!changeClockto24HR)}>
            Change to {changeClockto24HR ? "12Hr" : "24Hr"} clock
          </button>

          {Array.from(CLOCKMAP.entries()).map(([key, value]) => (
            <div key={key}>
              <SelectBox name={changeClockto24HR ? value : key} classname="choose-time-slot" />
            </div>
          ))}
        </div>
      ) : null}
    </BoxDesign>
  );
};
export default ChooseTime;
