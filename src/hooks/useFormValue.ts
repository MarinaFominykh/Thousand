import { useState, useCallback, ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

export interface FormValues {
  [key: string]: string;
}

export const useFormValue = () => {
  const [values, setValues] = useState<FormValues>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );

  return { values, handleChange, handleSelectChange, resetForm };
};
