import { useCallback, useState } from "react";

type UseBooleanOutput = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

export const useBoolean = (defaultValue?: boolean): UseBooleanOutput => {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, setTrue, setFalse };
};
