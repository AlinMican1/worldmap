"use client";
import { useState } from "react";
import "./switchUI.css";

interface SwitchProps {
  setSelectedValue: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: boolean;
}
const SwitchUI = ({ selectedValue, setSelectedValue }: SwitchProps) => {
  return (
    <div>
      <button
        type="button"
        className={`switch-wrapper ${selectedValue ? "active" : ""}`}
        onClick={() => setSelectedValue(!selectedValue)}
      >
        <div className={`move-circle ${selectedValue ? "active" : ""}`}></div>
      </button>
      <p>{selectedValue.toString()}</p>
    </div>
  );
};
export default SwitchUI;
