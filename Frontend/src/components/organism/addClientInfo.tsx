"use client";
import BoxDesign from "../atoms/boxDesign";
import "../../app/globals.css";
import { InputField } from "../atoms/inputField";
import { useState } from "react";
import { ErrorMessageProps, ClientInfoProps } from "@/types/forms";
import { SubmitClientSchedule, SubmitLocationForm } from "@/REST/POST";
import EnterLocation from "../molecule/enterLocation";
import { GetFormErrors } from "../../../helper/GetErrors";
import useErrors from "@/hooks/useErrors";

interface AddClientInfoProps {
  clients: ClientInfoProps[];
  setClients: React.Dispatch<React.SetStateAction<ClientInfoProps[]>>;
}
const AddClientInfo = ({ clients, setClients }: AddClientInfoProps) => {
  const [formData, setFormData] = useState<ClientInfoProps>({
    name: "",
    email: "",
    location: "",
  });

  const errorsHook = useErrors();

  const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(clients.length);
    const getErrors = await SubmitClientSchedule(clients);
    if (getErrors && getErrors.error) {
      const filteredErrors = getErrors.errors.filter(
        (err: ErrorMessageProps) => err.error === true
      );
      errorsHook.setErrors(filteredErrors);
    } else if (clients.length !== 0) {
      errorsHook.clearErrors();
      setClients([]);
      setFormData({
        name: "",
        email: "",
        location: "",
      });
    }
  };

  const AddClients = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const getErrors = await GetFormErrors(true, formData);
    const filteredErrors = getErrors.filter((err: ErrorMessageProps) => err.error === true);
    if (filteredErrors.length > 0) {
      errorsHook.setErrors(filteredErrors);
    } else {
      setFormData({
        name: "",
        email: "",
        location: "",
      });
      errorsHook.clearErrors();
      setClients((oldArray) => [...oldArray, formData]);
    }
  };

  return (
    <div>
      <BoxDesign>
        <h1>Add Schedule</h1>
        <form id="client-form" onSubmit={SubmitForm}>
          <div className="elements-row">
            <InputField
              autocomplete="off"
              type="text"
              label="Person's Name"
              value={formData.name}
              id="name"
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              placeholder="Enter Client Name"
              error={errorsHook.getErrorBoolean("name")}
              errorMsg={errorsHook.getErrorMsg("name")}
            />

            <InputField
              autocomplete="off"
              type="text"
              label="Person's Email"
              value={formData.email}
              id="email"
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              placeholder="Enter Client Email"
              error={errorsHook.getErrorBoolean("email")}
              errorMsg={errorsHook.getErrorMsg("email")}
            />
          </div>

          <EnterLocation
            location={formData.location}
            setLocation={(newLocation) =>
              setFormData((prev) => ({ ...prev, location: newLocation }))
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
