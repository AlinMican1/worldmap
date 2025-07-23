"use client";
import BoxDesign from "../atoms/boxDesign";
import "../../app/globals.css";
import { InputField } from "../atoms/inputField";
import { ErrorMessageProps, ClientInfoProps } from "@/types/interfaces";
import { SubmitClientSchedule } from "@/REST/POST";
import EnterLocation from "../molecule/enterLocation";
import { GetFormErrors } from "../../../helper/GetErrors";
import useErrors from "@/hooks/useErrors";
import useClientForm from "@/hooks/useClientForm";
import CalendarBox from "../molecule/calendarBox";
import ChooseDate from "../molecule/chooseDate";
import useArray from "@/hooks/useArray";
import ChooseTime from "../molecule/chooseTime";
import { useCallback, useMemo, useState } from "react";
import { DateAndTimeContext } from "@/contexts";
import DateAndTimeDisplay from "../molecule/dateAndTimeDisplay";

interface AddClientInfoProps {
  clients: ClientInfoProps[];
  setClients: React.Dispatch<React.SetStateAction<ClientInfoProps[]>>;
}
const AddClientInfo = ({ clients, setClients }: AddClientInfoProps) => {
  //Custom hooks
  const form = useClientForm({
    name: "",
    email: "",
    location: "",
    dates: new Map<string, string>(),
  });
  const errorsHook = useErrors();
  const dateArray = useArray<string>([]);
  const [time, setTime] = useState<string>("");

  const dateAndTime = useMemo(
    () => ({
      dateArray,
      time,
      setTime,
    }),
    [dateArray, time]
  );

  //Memoization
  const setLocation = useCallback(
    (newLocation: string) => form.setFormData((prev) => ({ ...prev, location: newLocation })),
    [form.setFormData]
  );
  const CalendarBoxMemo = useMemo(() => <CalendarBox />, [dateArray.array]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getErrors = await SubmitClientSchedule(clients);
    if (getErrors && getErrors.error) {
      const filteredErrors = getErrors.errors.filter(
        (err: ErrorMessageProps) => err.error === true
      );
      errorsHook.setErrors(filteredErrors);
    } else if (clients.length !== 0) {
      errorsHook.clearErrors();
      setClients([]);
      form.resetFormData();
    }
  };

  const handleAddClients = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add the dates into the clientForm so that we can get errors.
    const readyFormData = {
      ...form.formData,
      dates: dateArray,
    };
    const getErrors = await GetFormErrors(true, readyFormData);
    const filteredErrors = getErrors.filter((err: ErrorMessageProps) => err.error === true);
    if (filteredErrors.length > 0) {
      errorsHook.setErrors(filteredErrors);
    } else {
      form.resetFormData();
      errorsHook.clearErrors();
      setClients((oldArray) => [...oldArray, readyFormData]);
    }
  };

  return (
    <div>
      <BoxDesign>
        <h1>Add Schedule</h1>
        <form id="client-form" onSubmit={handleSubmit}>
          <div className="elements-row">
            <InputField
              autocomplete="off"
              type="text"
              name="name"
              label="Person's Name"
              value={form.formData.name}
              id="name"
              onChange={form.handleChange}
              placeholder="Enter Client Name"
              error={errorsHook.getErrorBoolean("name")}
              errorMsg={errorsHook.getErrorMsg("name")}
            />

            <InputField
              autocomplete="off"
              type="text"
              name="email"
              label="Person's Email"
              value={form.formData.email}
              id="email"
              onChange={form.handleChange}
              placeholder="Enter Client Email"
              error={errorsHook.getErrorBoolean("email")}
              errorMsg={errorsHook.getErrorMsg("email")}
            />
          </div>

          <EnterLocation
            location={form.formData.location}
            setLocation={setLocation}
            errorMsg={errorsHook.getErrorMsg("location")}
            error={errorsHook.getErrorBoolean("location")}
          />
          <DateAndTimeContext.Provider value={dateAndTime}>
            <div className="elements-row">
              <ChooseDate />
              {CalendarBoxMemo}
              <ChooseTime />
            </div>
            <DateAndTimeDisplay />
          </DateAndTimeContext.Provider>
          {errorsHook.getErrorBoolean("date") ? errorsHook.getErrorMsg("date") : ""}
          <button type="button" onClick={handleAddClients}>
            Add Client
          </button>
        </form>
      </BoxDesign>
      <button type="submit" form="client-form">
        Submit
      </button>
    </div>
  );
};
export default AddClientInfo;
