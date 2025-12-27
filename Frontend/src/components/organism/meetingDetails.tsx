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
import { useEffect } from "react";
import SwitchUI from "../atoms/switchUI";
import Modal from "../atoms/modal";
import Button from "../atoms/button";
import BoxDesign from "../atoms/boxDesign";
import ExitIcon from "../icons/exit";

interface MeetingDetailsComponentProps {
  meetingForm: ReturnType<typeof useClientForm<MeetingDetailsProps>>;
  errorsHook: ReturnType<typeof useErrors>;
}

const MeetingDetails = ({ meetingForm, errorsHook }: MeetingDetailsComponentProps) => {
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

  /**
   * Rotation is enabled ONLY if:
   * - meeting is NOT "Once"
   * - rotational_freq is not null
   */
  const rotationEnabled =
    meetingForm.formData.meeting_frequency !== "Once" &&
    meetingForm.formData.rotational_freq !== null;

  /**
   * If frequency switches to "Once",
   * force rotation OFF
   */
  useEffect(() => {
    if (meetingForm.formData.meeting_frequency === "Once") {
      meetingForm.setFormData((prev) => ({
        ...prev,
        rotational_freq: null,
      }));
    }
  }, [meetingForm.formData.meeting_frequency]);

  return (
    <div>
      {/* Title + Link */}
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
          width="20vw"
          error={errorsHook.getErrorBoolean("meetingTitle")}
          errorMsg={errorsHook.getErrorMsg("meetingTitle")}
        />

        <InputField
          autocomplete="off"
          type="text"
          name="meeting_link"
          label="Meeting Link"
          id="meeting_link"
          onChange={meetingForm.handleChange}
          placeholder="https://zoom..."
          width="20vw"
          borderRound="5px"
          error={errorsHook.getErrorBoolean("meetingLink")}
          errorMsg={errorsHook.getErrorMsg("meetingLink")}
        />
      </div>

      {/* Description */}
      <TextAreaInput
        label="Meeting Description (Optional)"
        placeholder="Meeting agenda and objectives..."
        id="meeting_desc"
        name="meeting_desc"
        borderRound="5px"
        width="100%"
        value={meetingForm.formData.meeting_desc}
        onChange={meetingForm.handleChange}
        error={errorsHook.getErrorBoolean("meeting_desc")}
        errorMsg={errorsHook.getErrorMsg("meeting_desc")}
      />

      {/* Date / Frequency / Duration / Time */}
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

      {/* Rotational Settings */}
      {meetingForm.formData.meeting_frequency !== "Once" && (
        <div>
          <div className="row-input-elem">
            <p>Enable Rotational Meeting</p>

            <Modal
              trigger={(open) => (
                <Button onClick={open} type="button" variant="more-info-btn">
                  More info
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
                  <h1>What is this?</h1>
                  <p>
                    Rotational meetings automatically rotate participants fairly across timezones or
                    schedules.
                  </p>

                  <div className="close-btn-pos">
                    <button className="close-btn" onClick={close}>
                      <ExitIcon />
                    </button>
                  </div>
                </BoxDesign>
              )}
            </Modal>

            <SwitchUI
              selectedValue={rotationEnabled}
              setSelectedValue={(enabled) =>
                meetingForm.setFormData((prev) => ({
                  ...prev,
                  rotational_freq: enabled ? "monthly" : null,
                }))
              }
            />
          </div>

          {rotationEnabled && (
            <div className="row-input-elem">
              <SelectField
                label="Rotational Interval"
                options={meeting_rotation_intervals}
                default_value="monthly"
                setSelectedValue={(value) =>
                  meetingForm.setFormData((prev) => ({
                    ...prev,
                    rotational_freq: value.toString(),
                  }))
                }
                selectedValue={meetingForm.formData.rotational_freq as string}
                width="150px"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeetingDetails;
