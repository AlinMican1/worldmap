'use client'
import { useState } from "react";
import EnterLocation from "../molecule/enterLocation";
import { InputField } from "../atoms/inputField";
import { SubmitLocationForm } from "@/REST/POST";

interface FormDataProps{
  name:string,
  email:string,
  location:string
}

interface ErrorMessageProps{
  id: string,
  errorMsg: string,
  error: boolean,
}

const Form = () => {
  // const [location, setLocation] = useState<string>("");
  const [formData,setFormData] = useState<FormDataProps>({
    name:"",
    email:"",
    location:"",
  })
  useState<Array<string>>([])
  const [error,setError] = useState<Array<ErrorMessageProps>>([])
  
  // function SubmitForm(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   console.log(location)
  // }

  return (
    <main>
      <h1>Choose A timeslot</h1>
      <p>
        Please complete the following below to allow us to choose the best possible time for your
        meeting
      </p>
      <form
        onSubmit={async (e) => {
          const getErrors = await SubmitLocationForm(e, formData);
          if (getErrors && getErrors.errors) {
            const filteredErrors = getErrors.errors.filter((err: ErrorMessageProps) => err.error === true);
            setError(filteredErrors);
          }
        }}
      >
        <EnterLocation location={formData.location} setLocation={(newLocation) =>
        setFormData((prev) => ({ ...prev, location: newLocation }))} error={error.some((err:ErrorMessageProps) => err.id === "location" && err.error)} 
        errorMsg={error.find((err:ErrorMessageProps) => err.id === "location")?.errorMsg || ""}/>

        <InputField autocomplete="off" id="Email" name="Email" type="text" placeholder="Enter Email" label="Email" value={formData.email}
        onChange={(event) => setFormData({...formData, email:event.target.value})} error={error.some((err:ErrorMessageProps) => err.id === "email" && err.error)} 
        errorMsg={error.find((err:ErrorMessageProps) => err.id === "email")?.errorMsg || ""}/>

        <InputField autocomplete="off" id="name" name="name" type="text" placeholder="Enter Name" label="Name" value={formData.name}  
        onChange={(event) => setFormData({...formData, name:event.target.value})} error={error.some((err:ErrorMessageProps) => err.id === "name" && err.error)} 
        errorMsg={error.find((err:ErrorMessageProps) => err.id === "name")?.errorMsg || ""}/>

        <button>Submit</button>
         <>
        {error.map((val) =>{
          <p>{val.errorMsg}</p>
        })}
        </> 
      </form>
      
    </main>
  );
};
export default Form;
