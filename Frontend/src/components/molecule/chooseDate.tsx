import { ChooseDateAndTimeProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import { MONTHMAP } from "../../../helper/Constants";
import { getDayMonthYear } from "../../../helper/Formatter";
import "../../app/globals.css";
import { useContext } from "react";
import { useDateAndTimeContext } from "@/contexts";

const ChooseDate = () => {
  const { dateArray } = useDateAndTimeContext();
  return (
    <div>
      <BoxDesign>
        {dateArray.array.length > 0 ? <span>Dates To Set Meet</span> : null}
        {dateArray.array && dateArray.array.length > 0 ? (
          dateArray.array.map((date, i) => {
            const { day, month, year } = getDayMonthYear(date);
            return (
              <div key={i}>
                <div>
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
