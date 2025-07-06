import axios from "axios"
import { COUNTRIES } from "../../helper/SuggestLocation"
interface SubmitLocationFormProps{
    email: string,
    location: string,
    name: string
}
// const preventDeefault = e: React.FormEvent<HTMLFormElement>, 
export const SubmitLocationForm = async (e: React.FormEvent<HTMLFormElement>,{location, email, name}:SubmitLocationFormProps) =>{
    e.preventDefault();
    const errorArray: {id:string, errorMsg: string, error:boolean}[] = [
        {"id": "name", "errorMsg": "No name", "error": false},
        {"id": "name", "errorMsg": "Name too long", "error": false},
        {"id": "email", "errorMsg": "No email", "error": false},
        {"id": "email", "errorMsg": "Email does not exist", "error": false},
        {"id": "location", "errorMsg": "No location", "error": false},
        {"id": "location", "errorMsg": "Location does not exist", "error": false}
    ]
    if (name.trim() === "") errorArray[0].error = true;
    if (name.length > 50) errorArray[1].error = true;
    if (email.trim() === "") errorArray[2].error = true;
    if (location.trim() === "") errorArray[4].error = true;
    if (!COUNTRIES.includes(location)) errorArray[5].error = true;
    
    if(errorArray.some((err) => err.error)){
        return {success: false, errors:errorArray}
    }
    
    const apiURL = process.env.NEXT_PUBLIC_DEV_URL + "form";

    try {
      const res = await axios.post(apiURL,{
        location,
        email,
        name
      });
      return {success: true, message: res.data.message, errors: [] };
    } catch (error) {
      return {success: false, message: "Server Error", error: error, errors: [] };
    }

}

