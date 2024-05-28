import { useCallback, useState } from "react";

type useBooleanOutput = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
};

export const useBoolean = (defaultValue?: boolean): useBooleanOutput => {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, setTrue, setFalse };
};
