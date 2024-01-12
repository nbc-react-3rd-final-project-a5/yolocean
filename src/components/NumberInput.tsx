import React from "react";
import { UseFormRegister, FieldValues, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { TiMinus, TiPlus } from "react-icons/ti";
interface Props {
  name: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

const NumberInput = ({ register, name, setValue, getValues }: Props) => {
  return (
    <>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          onClick={() => setValue(name, Number(getValues(name)) - 1)}
          type="button"
          className="bg-neutral-100 hover:bg-gray-100 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <TiMinus />
        </button>
        <input
          className="bg-neutral-100 border border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5  "
          placeholder="0"
          type="number"
          max={3}
          maxLength={3}
          {...register(name, {
            required: "수량을 선택해주세요"
          })}
        />
        <button
          type="button"
          onClick={() => setValue(name, Number(getValues(name)) + 1)}
          className="bg-neutral-100  hover:bg-gray-100 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <TiPlus />
        </button>
      </div>
    </>
  );
};

export default NumberInput;
