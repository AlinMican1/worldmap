"use client";
import axios from "axios";
import { useState } from "react";
export default function Home() {
  const apiURL = "http://127.0.0.1:5328/api/hello";
  const [msg, setMsg] = useState<string>("");

  const test = async () => {
    try {
      const res = await axios.get(apiURL);
      setMsg(res.data);
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
    </div>
  );
}
