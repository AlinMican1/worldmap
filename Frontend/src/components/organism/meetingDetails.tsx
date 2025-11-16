"use client";
import useClientForm from "@/hooks/useClientForm";
import { InputField } from "../atoms/inputField";
import "../../app/globals.css";
import "./meetingDetails.css";
import { MeetingDetailsProps } from "@/types/interfaces";
import TextAreaInput from "../atoms/textAreaInput";
import SelectField from "../atoms/selectField";
import SelectDate from "../molecule/selectDate";
import TimePicker from "../atoms/timePicker";
import useErrors from "@/hooks/useErrors";
import { useState } from "react";
import SwitchUI from "../atoms/switchUI";
import Modal from "../atoms/modal";
import Button from "../atoms/button";
import BoxDesign from "../atoms/boxDesign";
import ExitIcon from "../icons/exit";
import ErrorIcon from "../icons/errorIcon";

interface MeetingDetailsComponentProps {
  meetingForm: ReturnType<typeof useClientForm<MeetingDetailsProps>>;
  errorsHook: ReturnType<typeof useErrors>;
}

const MeetingDetails = ({ meetingForm, errorsHook }: MeetingDetailsComponentProps) => {
  const [selectedValue, setSelectedValue] = useState<boolean>(false);
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
  const meeting_rotation_intervals = [
    "weekly",
    "biweekly",
    "monthly",
    "every 6 weeks",
    "every 2 months",
  ];

  const meeting_frequency = [
    "Once",
    "Daily",
    "Every 2 days",
    "Every 3 days",
    "Weekly",
    "Every 2 weeks",
    "Monthly",
  ];

  return (
    <div>
      <div className="row-input-elem">
        <InputField
          autocomplete="off"
          type="text"
          name="meeting_title"
          label="Meeting Title"
          value={meetingForm.formData.meeting_title}
          id="meeting_title"
          onChange={meetingForm.handleChange}
          placeholder="Weekly Team Sync"
          borderRound="5px"
          width={"20vw"}
          error={errorsHook.getErrorBoolean("meetingTitle")}
          errorMsg={errorsHook.getErrorMsg("meetingTitle")}
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
          error={errorsHook.getErrorBoolean("meetingLink")}
          errorMsg={errorsHook.getErrorMsg("meetingLink")}
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
        <SelectDate
          label="Meeting Date"
          width="150px"
          selectedDate={meetingForm.formData.meeting_date}
          setSelectedDate={(value) =>
            meetingForm.setFormData((prev) => ({
              ...prev,
              meeting_date: value.toString(),
            }))
          }
        />
        <SelectField
          label="Meeting Frequency"
          options={meeting_frequency}
          default_value="Once"
          setSelectedValue={(value) =>
            meetingForm.setFormData((prev) => ({
              ...prev,
              meeting_frequency: value.toString(),
            }))
          }
          selectedValue={meetingForm.formData.meeting_frequency}
          width="150px"
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
      </div>
      <div className="row-input-elem"></div>
      <div className="row-input-elem">
        <p>Enable Rotational Meeting</p>
        <Modal
          trigger={(open) => (
            <Button onClick={open} type="button" variant="more-info-btn">
              More info
              {/* <ErrorIcon className="err-icon" size="24px" /> */}
            </Button>
          )}
        >
          {(close) => (
            <BoxDesign
              variant="third-DesignBox"
              centeredX="leftX"
              centeredY="leftY"
              padding="large"
            >
              <BoxDesign variant="transparent-DesignBox" centeredX="leftX">
                <h1> What is this?</h1>
                <p> It's simple its a way to arrange meetings on a set interval selected by you!</p>
                <p> Then we will simple rotate these participants based on your selection. </p>
                <p>
                  {" "}
                  If today we have a participant starting at 9 am and another at 20pm, then we will
                  rotate it
                </p>
              </BoxDesign>
              <div className="close-btn-pos">
                <button className="close-btn" onClick={() => close()}>
                  <ExitIcon className={"exit-icon"} />
                </button>
              </div>
            </BoxDesign>
          )}
        </Modal>
        <SwitchUI selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      </div>
      {selectedValue && (
        <div className="row-input-elem">
          <SelectField
            label="Rotational Interval"
            options={meeting_rotation_intervals}
            default_value="monthly"
            setSelectedValue={(value) =>
              meetingForm.setFormData((prev) => ({
                ...prev,
                meeting_interval: value.toString(),
              }))
            }
            selectedValue={meetingForm.formData.meeting_interval}
            width="150px"
          />
        </div>
      )}
    </div>
  );
};

export default MeetingDetails;
