import { useDropdown } from "@/hooks/useDropdown";
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
  const { open, toggle, close, ref } = useDropdown();

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    close();
  };

  const handleDropDown = () => {
    if (options.length > 0) toggle();
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="select-label">
          {label}
        </label>
      )}

      <div className="select-wrapper" ref={ref}>
        <button
          className="button-dropdown-wrapper"
          style={{
            width,
            border: open ? "1px solid var(--color-primary-lighter)" : "0px solid transparent",
          }}
          type="button"
          onClick={handleDropDown}
        >
          <div className="arrow-down"></div>
          {selectedValue || default_value}
        </button>

        {open && (
          <div className="select-option-wrapper">
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
