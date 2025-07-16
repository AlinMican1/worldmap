import { UseArrayProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import SelectBox from "../atoms/selectBox";
import { CLOCKMAP, MONTHMAP } from "../../../helper/Constants";
import { getDayMonthYear } from "../../../helper/Formatter";
import "../../app/globals.css"

import { useState } from "react";
interface ChooseTimeProps {
  dates: UseArrayProps<string>;
}
const ChooseDate = ({ dates }: ChooseTimeProps) => {
  const [changeClockto24HR, setChangeClockto24HR] = useState<boolean>(false)
  
  return (
    <div className="">
    <BoxDesign>
      {dates.array && dates.array.length > 0 ? (
        dates.array.map((date, i) => {
          const { day, month, year } = getDayMonthYear(date);
          return (
            <div key={i}>
              <div >
                <p className="paragraph-xs">
                  {day} - {MONTHMAP.get(month)} - {year}
                </p>
              </div>
              
            </div>
          );
        })
        
      ) : (
        
        <p className="paragraph-xs">
          Specify the <span className="test">dates and times</span> <br />
          you would like your meetings to begin.
        </p>
      )}
    </BoxDesign>
  </div>

  );
};

export default ChooseDate;
