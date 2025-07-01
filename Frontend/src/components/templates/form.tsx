'use client'
import { useState } from "react";
import EnterLocation from "../molecule/enterLocation";
import { InputField } from "../atoms/inputField";


const Form = () => {
  const [location, setLocation] = useState<string>("");
  
  function SubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(location)
  }

  return (
    <main>
      <h1>Choose A timeslot</h1>
      <p>
        Please complete the following below to allow us to choose the best possible time for your
        meeting
      </p>
      <form onSubmit={SubmitForm}>
        <EnterLocation location={location} setLocation={setLocation}/>
        
        
        
        <InputField autocomplete="off" id="Email" name="Email" type="text" placeholder="Enter Email" label="Email" />
        <InputField autocomplete="off" id="name" name="name" type="text" placeholder="Enter Name" label="Name" />
        <button>Submit</button>
      </form>
      
    </main>
  );
};
export default Form;
