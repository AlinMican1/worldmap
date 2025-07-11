import { ChangeEvent, useState } from "react";
const useClientForm = <T extends Record<string, any>>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFormData = () => setFormData(initialValues);

  return {
    resetFormData,
    handleChange,
    formData,
    setFormData,
  };
};

export default useClientForm;
