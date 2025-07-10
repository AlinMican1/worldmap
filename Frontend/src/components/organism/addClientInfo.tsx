"use client";
import BoxDesign from "../atoms/boxDesign";
import "../../app/globals.css";
import { InputField } from "../atoms/inputField";
import { useState } from "react";
import { ErrorMessageProps, ClientInfoProps } from "@/types/forms";
import { SubmitLocationForm } from "@/REST/POST";
import EnterLocation from "../molecule/enterLocation";
import { GetFormErrors } from "../../../helper/GetErrors";

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

  const [error, setError] = useState<Array<ErrorMessageProps>>([]);

  const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getErrors = await SubmitLocationForm(true, formData);
    console.log(getErrors);
    if (getErrors && getErrors.errors) {
      const filteredErrors = getErrors.errors.filter(
        (err: ErrorMessageProps) => err.error === true
      );
      setError(filteredErrors);
    }
  };

  const AddClients = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const getErrors = await GetFormErrors(true, formData);
    const filteredErrors = getErrors.filter((err: ErrorMessageProps) => err.error === true);
    if (filteredErrors.length > 0) {
      setError(filteredErrors);
    } else {
      setFormData({
        name: "",
        email: "",
        location: "",
      });
      setError([]);
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
              error={error.some((err: ErrorMessageProps) => err.id === "name" && err.error)}
              errorMsg={error.find((err: ErrorMessageProps) => err.id === "name")?.errorMsg || ""}
            />

            <InputField
              autocomplete="off"
              type="text"
              label="Person's Email"
              value={formData.email}
              id="email"
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              placeholder="Enter Client Email"
              error={error.some((err: ErrorMessageProps) => err.id === "email" && err.error)}
              errorMsg={error.find((err: ErrorMessageProps) => err.id === "email")?.errorMsg || ""}
            />
          </div>

          <EnterLocation
            location={formData.location}
            setLocation={(newLocation) =>
              setFormData((prev) => ({ ...prev, location: newLocation }))
            }
            errorMsg={error.find((err: ErrorMessageProps) => err.id === "location")?.errorMsg || ""}
            error={error.some((err: ErrorMessageProps) => err.id === "location")}
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
