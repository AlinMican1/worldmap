import { useState } from "react";
/*
This custom hook is to always add to an array.
*/
const useArray = <T>(initialArray: T[] = []) => {
  const [array, setArray] = useState<T[]>(initialArray);

  const push = (item: T) => {
    setArray((prev) => [...prev, item]);
  };

  const remove = (index: number) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  };

  const clear = () => setArray([]);

  return {
    array,
    setArray,
    push,
    remove,
    clear,
  };
};

export default useArray;
