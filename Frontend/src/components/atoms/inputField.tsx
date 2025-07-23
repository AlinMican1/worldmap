import { ChangeEvent } from "react";
import "./inputField.css";

interface inputFieldParams {
  type?: "text" | "number" | "email" | "password";
  label?: string;
  id?: string;
  value?: string | number;
  name?: string;
  placeholder?: string;
  error?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  autocomplete?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  width?: string | number;
}

export const InputField = ({
  type,
  label,
  id,
  value,
  name,
  placeholder,
  error,
  disabled,
  errorMsg,
  autocomplete,
  onChange,
  icon,
  width = "25vw",
}: inputFieldParams) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <div className="input-with-icon">
        {icon && <span className="input-icon">{icon}</span>} {/* Render the icon if provided */}
        <input
          type={type}
          id={id}
          value={value}
          name={name}
          autoComplete={autocomplete}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className={`${error ? "input-error" : ""}`}
          style={{ width: width ?? undefined }}
        />
      </div>
      {error && <p className={`${"error"}`}>{errorMsg}</p>}
    </div>
  );
};
