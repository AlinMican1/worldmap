import { useState } from "react";

/* 
Reusable error state custom hook. Any errors should be passed here and called from here, centralising all errors.
*/

type ErrorType = {
  id: string;
  error: boolean;
  errorMsg: string;
};

export const useErrors = <TInput, TError extends ErrorType = ErrorType>(
  validator: (input: TInput) => Promise<TError[]> | TError[]
) => {
  const [errors, setErrors] = useState<TError[]>([]);

  const validate = async (input: TInput): Promise<TError[]> => {
    const allErrors = await Promise.resolve(validator(input));
    const filtered = allErrors.filter((err) => err.error);
    setErrors(filtered);
    return filtered;
  };

  const clear = () => setErrors([]);

  const getErrorById = (id: string): string => errors.find((e) => e.id === id)?.errorMsg || "";

  const hasError = (id: string): boolean => errors.some((e) => e.id === id && e.error);

  return {
    errors,
    validate,
    clear,
    getErrorById,
    hasError,
  };
};
