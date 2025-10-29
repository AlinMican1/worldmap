import { ErrorMessageProps } from "@/types/interfaces";
import { useState } from "react";

/* 
Reusable error state custom hook. Any errors should be passed here and called from here, centralising all errors.
*/

const useErrors = () => {
  const [errors, setErrors] = useState<ErrorMessageProps[]>([]);

  const getErrorMsg = (id: string): string =>
    errors.find((err: ErrorMessageProps) => err.id === id)?.errorMsg || "";

  const getErrorBoolean = (id: string): boolean =>
    errors.some((err: ErrorMessageProps) => err.id === id && err.error);

  const clearErrors = () => setErrors([]);

  return {
    clearErrors,
    getErrorBoolean,
    getErrorMsg,
    errors,
    setErrors,
  };
};
export default useErrors;
