import { UseArrayProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import SelectBox from "../atoms/selectBox";
import { MONTHMAP } from "../../../helper/GenerateCalendar";
import { getDayMonthYear } from "../../../helper/Formatter";
import "./chooseTime.css";
interface ChooseTimeProps {
  dates: UseArrayProps<String>;
}
const ChooseTime = ({ dates }: ChooseTimeProps) => {
  return (
    <BoxDesign>
      {dates.array && dates.array.length > 0 ? (
        dates.array.map((date, i) => {
          const { day, month, year } = getDayMonthYear(date);
          return (
            <div>
              <div key={i}>
                <p className="dates">
                  {day} - {MONTHMAP.get(month)}
                </p>
              </div>
              <SelectBox name="9:30" />
            </div>
          );
        })
      ) : (
        <p className="dates">
          Specify the <span className="test">dates and times</span> <br />
          you'd like your meetings to begin.
        </p>
      )}
    </BoxDesign>
  );
};

export default ChooseTime;
