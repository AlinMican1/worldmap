import useClientForm from "@/hooks/useClientForm";
import { InputField } from "../atoms/inputField";
import "../../app/globals.css";
import { MeetingDetailsProps } from "@/types/interfaces";
import TextAreaInput from "../atoms/textAreaInput";
import SelectField from "../atoms/selectField";
import SelectDate from "../molecule/selectDate";
import TimePicker from "../atoms/timePicker";
import useErrors from "@/hooks/useErrors";

interface MeetingDetailsComponentProps {
  meetingForm: ReturnType<typeof useClientForm<MeetingDetailsProps>>;
}

const MeetingDetails = ({ meetingForm }: MeetingDetailsComponentProps) => {
  const errorsHook = useErrors();

  const meeting_durations = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1.5 hours",
    "2 hours",
    "3 hours",
    "4 hours",
    "5 hours",
  ];

  return (
    <div>
      <div className="row-input-elem">
        <InputField
          autocomplete="off"
          type="text"
          name="meeting_title"
          label="Meeting Title"
          //   value={meetingForm.formData.}
          id="meeting_title"
          onChange={meetingForm.handleChange}
          placeholder="Weekly Team Sync"
          borderRound="5px"
          width={"20vw"}
          error={errorsHook.getErrorBoolean("meeting_title")}
          errorMsg={errorsHook.getErrorMsg("meeting_title")}
        />
        <InputField
          autocomplete="off"
          type="text"
          name="meeting_link"
          label="Meeting Link"
          //   value={form.formData.surname}
          id="meeting_link"
          onChange={meetingForm.handleChange}
          placeholder="https://zoom..."
          width={"20vw"}
          borderRound="5px"
          error={errorsHook.getErrorBoolean("surname")}
          errorMsg={errorsHook.getErrorMsg("surname")}
        />
      </div>
      <div>
        <TextAreaInput
          label="Meeting Description (Optional)"
          placeholder="Meeting agenda and objectives..."
          id="meeting_desc"
          name="meeting_desc"
          borderRound="5px"
          width={"100%"}
          value={meetingForm.formData.meeting_desc}
          onChange={meetingForm.handleChange}
          error={errorsHook.getErrorBoolean("meeting_desc")}
          errorMsg={errorsHook.getErrorMsg("meeting_desc")}
        />
      </div>
      <div className="row-input-elem">
        {/* <InputField
          autocomplete="off"
          type="text"
          name="meeting_date"
          label="Meeting Date"
          //   value={form.formData.surname}
          id="meeting_date"
          onChange={meetingForm.handleChange}
          placeholder="https://zoom..."
          width={"20vw"}
          borderRound="5px"
          //   error={errorsHook.getErrorBoolean("surname")}
          //   errorMsg={errorsHook.getErrorMsg("surname")}
        /> */}
        <SelectDate
          label="Meeting Date"
          width="20vw"
          selectedDate={meetingForm.formData.meeting_date}
          setSelectedDate={(value) =>
            meetingForm.setFormData((prev) => ({
              ...prev,
              meeting_date: value.toString(),
            }))
          }
        />

        <TimePicker
          label="Time"
          selectedTime={meetingForm.formData.meeting_time}
          setSelectedTime={(value) =>
            meetingForm.setFormData((prev) => ({
              ...prev,
              meeting_time: value.toString(),
            }))
          }
        />
        <SelectField
          label="Duration"
          options={meeting_durations}
          default_value="1 hour"
          setSelectedValue={(value) =>
            meetingForm.setFormData((prev) => ({
              ...prev,
              meeting_duration: value.toString(),
            }))
          }
          selectedValue={meetingForm.formData.meeting_duration}
          width="150px"
        />
      </div>
    </div>
  );
};

export default MeetingDetails;
