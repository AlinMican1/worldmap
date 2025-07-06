'use client'
import BoxDesign from "../atoms/boxDesign";
import "../../app/globals.css"
import { InputField } from "../atoms/inputField";
import { useState } from "react";
import { SubmitLocationForm, ErrorMessageProps } from "@/REST/POST";

interface ClientInfoProps{
    name: string,
    location: string,
    email: string
}

const AddClientInfo = () =>{
    const [formData,setFormData] = useState<ClientInfoProps>({
    name:"",
    email:"",
    location:""})
    
    const [error,setError] = useState<Array<ErrorMessageProps>>([])

    const SubmitForm = async(e: React.FormEvent<HTMLFormElement>) =>{
        const getErrors = await SubmitLocationForm(e,false,formData)
        if (getErrors && getErrors.errors) {
        const filteredErrors = getErrors.errors.filter((err: ErrorMessageProps) => err.error === true)
        setError(filteredErrors)
        }
    }
    
    return(
        <div className="positional-center">
            
                <BoxDesign>
                    <h1>Add Schedule</h1>
                    <form onSubmit={SubmitForm}>
                    
                    <div className="elements-row">
                    
                    <InputField autocomplete="off" type="text" label="Person's Name" value={formData.name} id="name" onChange={(event) => setFormData({...formData, name:event.target.value})}
                    placeholder="Enter Client Name" error={error.some((err:ErrorMessageProps) => err.id === "name" && err.error)} 
                    errorMsg={error.find((err:ErrorMessageProps) => err.id === "name")?.errorMsg || ""} />
                    
                    <InputField label="Person's Email (Optional)"/>
                    </div>
                    <button>Submit</button>
                    </form>
                    
                </BoxDesign>

                <BoxDesign>
                    <div>Hi there</div>
                    <InputField />
                </BoxDesign>
            
        </div>
    )
}   
export default AddClientInfo