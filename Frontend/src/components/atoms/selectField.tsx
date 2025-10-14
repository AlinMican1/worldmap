import { useEffect, useRef, useState } from "react";
import "./selectField.css";

interface SelectFieldParams {
  label?: string;
  name?: string;
  id?: string;
  options: string[];
  default_value?: string;
  multiple?: boolean;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | number>>;
  selectedValue: string | number;
  width?: string;
}

const SelectField = ({
  label,
  name,
  id,
  options,
  width = "25vw",
  setSelectedValue,
  selectedValue,
  default_value = "SELECT A VALUE",
}: SelectFieldParams) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleSelect = (option: string) => {
    setDropDown(false);
    setSelectedValue(option);
  };

  const handleDropDown = () => {
    if (options.length > 0) setDropDown(!dropDown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropDown(false);
      }
    };

    if (dropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup when unmounting or when dropDown changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDown]);

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <div className="select-wrapper" ref={wrapperRef}>
        <button
          className="button-dropdown-wrapper"
          style={{
            width,
            border: dropDown ? "1px solid var(--color-primary-lighter)" : "0px solid transparent",
          }}
          type="button"
          onClick={handleDropDown}
        >
          {selectedValue || default_value}
        </button>

        {dropDown && (
          <div className="select-option-wrapper" style={{ width }}>
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                className="option-button"
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
