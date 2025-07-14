"use client";
import BoxDesign from "../atoms/boxDesign";
import "../../app/globals.css";
import { InputField } from "../atoms/inputField";

import { ErrorMessageProps, ClientInfoProps } from "@/types/forms";
import { SubmitClientSchedule } from "@/REST/POST";
import EnterLocation from "../molecule/enterLocation";
import { GetFormErrors } from "../../../helper/GetErrors";
import useErrors from "@/hooks/useErrors";
import useClientForm from "@/hooks/useClientForm";
import CalendarBox from "../molecule/calendarBox";

interface AddClientInfoProps {
  clients: ClientInfoProps[];
  setClients: React.Dispatch<React.SetStateAction<ClientInfoProps[]>>;
}
const AddClientInfo = ({ clients, setClients }: AddClientInfoProps) => {
  const form = useClientForm({
    name: "",
    email: "",
    location: "",
  });

  const errorsHook = useErrors();

  const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const AddClients = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const getErrors = await GetFormErrors(true, form.formData);
    const filteredErrors = getErrors.filter((err: ErrorMessageProps) => err.error === true);
    if (filteredErrors.length > 0) {
      errorsHook.setErrors(filteredErrors);
    } else {
      form.resetFormData();
      errorsHook.clearErrors();
      setClients((oldArray) => [...oldArray, form.formData]);
    }
  };

  return (
    <div>
      <BoxDesign>
        <h1>Add Schedule</h1>
        <CalendarBox />
        <form id="client-form" onSubmit={SubmitForm}>
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
            setLocation={(newLocation) =>
              form.setFormData((prev) => ({ ...prev, location: newLocation }))
            }
            errorMsg={errorsHook.getErrorMsg("location")}
            error={errorsHook.getErrorBoolean("location")}
          />
          <button type="button" onClick={AddClients}>
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
