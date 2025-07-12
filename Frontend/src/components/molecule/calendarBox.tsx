import BoxDesign from "../atoms/boxDesign";
import SelectBox from "../atoms/selectBox";
import "./calendarBox.css";
import "../../app/globals.css";
import { Calendar } from "../../../helper/Calendar";

const CalendarBox = () => {
  const calendarData = Calendar();
  return (
    <div>
      <BoxDesign>
        <div className="calendar-grid">
          <p className="item-string">Mon</p>
          <p className="item-string">Tue</p>
          <p className="item-string">Wed</p>
          <p className="item-string">Thu</p>
          <p className="item-string">Fri</p>
          <p className="item-string">Sat</p>
          <p className="item-string">Sun</p>

          <SelectBox name="1" />
          <SelectBox name="2" />
          <SelectBox name="1" />
          <SelectBox name="2" />
          <SelectBox name="1" />
          <SelectBox name="2" />
          <SelectBox name="1" />
          <SelectBox name="2" />
          <SelectBox name="1" />
          <SelectBox name="2" />
        </div>
      </BoxDesign>
    </div>
  );
};

export default CalendarBox;
