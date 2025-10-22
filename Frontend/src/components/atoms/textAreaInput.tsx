import { ChangeEvent } from "react";
import "./textAreaInput.css";

interface textAreaFieldParams {
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
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  icon?: React.ReactNode;
  width?: string | number;
  borderRound?: string;
}
const TextAreaInput = ({
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
  borderRound = "0px",
}: textAreaFieldParams) => {
  return (
    <div className="textarea-wrapper">
      <label htmlFor={label}>{label}</label>
      <div>
        <textarea
          // type={type}
          id={id}
          value={value}
          name={name}
          autoComplete={autocomplete}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className={`${error ? "input-error" : ""}`}
          style={{ width: width ?? undefined, borderRadius: borderRound ?? undefined }}
        />
      </div>
      {error && <p className={`${"error"}`}>{errorMsg}</p>}
    </div>
  );
};
export default TextAreaInput;
