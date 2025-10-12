import { useEffect } from "react";

interface SelectFieldParams {
  label?: string;
  name?: string;
  id?: string;
  values: string[];
  value?: string;
  default_value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = ({ label, name, id, values, onChange, default_value }: SelectFieldParams) => {
  console.log("HHHH", values);

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div>
        <select id={id} value={values} name={name} onChange={onChange} />
        {values.length === 0 && (
          <option value="" disabled hidden>
            {default_value} || SELECT A VALUE
          </option>
        )}

        {values.map((value, idx) => (
          <option key={idx} value={value}>
            {value}
          </option>
        ))}
      </div>
    </div>
  );
};

export default SelectField;
{
  /* <div>
  <label htmlFor="timezone">Choose a timezone:</label>
  <select
    className="select-timezone-bar"
    name="timezone"
    id="timezone"
    value={form.formData.timezone || timezonesArr.array[0] || ""}
    onChange={(e) =>
      form.setFormData((prev) => ({
        ...prev,
        timezone: e.target.value,
      }))
    }
  >
    <option value="" disabled hidden>
      Select a timezone
    </option>
    {timezonesArr.array.map((timezone, idx) => (
      <option key={idx} value={timezone}>
        {timezone}
      </option>
    ))}
  </select>
</div>; */
}
