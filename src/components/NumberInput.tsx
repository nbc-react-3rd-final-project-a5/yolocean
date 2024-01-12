import React from "react";
import { UseFormRegister, FieldValues, UseFormSetValue, UseFormGetValues } from "react-hook-form";

interface Props {
  name: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const NumberInput = ({ register, name, setValue, getValues }: Props) => {
  return (
    <>
      <button onClick={() => setValue(name, Number(getValues(name)) - 1)}>-</button>
      <input type="number" {...register(name, {})} />
      <button onClick={() => setValue(name, Number(getValues(name)) + 1)}>+</button>
    </>
  );
};

export default NumberInput;
