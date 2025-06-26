"use client";
import axios from "axios";
import { useState } from "react";
import InputLocation from "@/components/atoms/inputLocation";
export default function Home() {
  let apiURL = process.env.NEXT_PUBLIC_DEV_URL + "api/hello";
  if (process.env.NODE_ENV === "production") {
    apiURL = process.env.NEXT_PUBLIC_DEV_URL + "api/hello";
  }
  console.log(Date.now());
  console.log(apiURL);
  const [msg, setMsg] = useState<string>("");

  const test = async () => {
    try {
      const res = await axios.get(apiURL);
      setMsg(res.data.statuscode);
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <div>Hello World</div>
      <h1>BANG BANG</h1>
      <button onClick={test}>BANG BNAG</button>
      <h1>{msg}</h1>
      <InputLocation></InputLocation>
    </div>
  );
}
