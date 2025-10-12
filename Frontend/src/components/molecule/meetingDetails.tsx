import useClientForm from "@/hooks/useClientForm";
import { InputField } from "../atoms/inputField";
import "../../app/globals.css";
import { MeetingDetails } from "@/types/interfaces";
import TextAreaInput from "../atoms/textAreaInput";

const MeetingDetails = () => {
  const meetingForm = useClientForm<MeetingDetails>({
    meeting_date: "",
    meeting_link: "",
    meeting_time: "",
    meeting_duration: "",
    meeting_desc: "",
    meeting_title: "",
  });

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
          //   error={errorsHook.getErrorBoolean("name")}
          //   errorMsg={errorsHook.getErrorMsg("name")}
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
          //   error={errorsHook.getErrorBoolean("surname")}
          //   errorMsg={errorsHook.getErrorMsg("surname")}
        />
      </div>
      <div>
        <TextAreaInput
          label="Meeting Description (Optional)"
          placeholder="Meeting agenda and objectives..."
          borderRound="5px"
          width={"100%"}
        />
      </div>
      <div className="row-input-elem">
        <InputField
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
        />
      </div>
    </div>
  );
};

export default MeetingDetails;
