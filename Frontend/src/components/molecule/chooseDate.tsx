import { ChooseTimeProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import { MONTHMAP } from "../../../helper/Constants";
import { getDayMonthYear } from "../../../helper/Formatter";
import "../../app/globals.css";
import { useState } from "react";

const ChooseDate = ({ dateArray }: ChooseTimeProps) => {
  return (
    <div>
      <BoxDesign>
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
