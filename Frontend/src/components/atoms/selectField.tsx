import { useEffect, useState } from "react";
import "./selectField.css";

interface SelectFieldParams {
  label: string;
  name: string;
  id: string;
  options: string[];
  value: string | string[]; // single or multiple
  // onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  default_value?: string;
  multiple?: boolean; // <— this controls single vs multiple
  setSelectedValue: React.Dispatch<React.SetStateAction<string | number>>;
  selectedValue: string | number;
}

const SelectField = ({
  label,
  name,
  id,
  options,
  value,
  setSelectedValue,
  selectedValue,
  // onChange,
  default_value = "SELECT A VALUE",
  multiple = false,
}: SelectFieldParams) => {
  const [dropDown, setDropDown] = useState<boolean>(false);

  const handleSelect = (option: string) => {
    setDropDown(false);
    setSelectedValue(option);
  };

  const handleDropDown = () => {
    if (options.length > 0) {
      setDropDown(!dropDown);
    }
  };

  useEffect(() => {
    if (options.length === 0) {
      setDropDown(false);
      setSelectedValue("");
    } else {
      setSelectedValue(options[0]);
    }
  }, [options]);
  return (
    // <div>
    //   <label htmlFor={id}>{label}</label>
    //   <div className="select-wrapper">
    //     <select
    //       className="select-timezone-bar"
    //       id={id}
    //       name={name}
    //       value={value}
    //       multiple={multiple}
    //       onChange={onChange}
    //     >
    //       <option value="" disabled hidden>
    //         {default_value}
    //       </option>

    //       {options.map((option, idx) => (
    //         <option key={idx} value={option}>
    //           {option}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
    // </div>
    <div>
      <label htmlFor={id}>{label}</label>

      <div className="select-wrapper">
        <button className="button-dropdown-wrapper" onClick={handleDropDown}>
          {!selectedValue ? default_value : selectedValue}
        </button>

        {dropDown ? (
          <div className="select-option-wrapper">
            {options.map((option, idx) => (
              <button onClick={() => handleSelect(option)} className="option-button" key={idx}>
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectField;
