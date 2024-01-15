import React from "react";
import { UseFormRegister, FieldValues, UseFormSetValue, UseFormGetValues, FieldErrors } from "react-hook-form";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdErrorOutline } from "react-icons/md";

interface Props {
  name: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  errors: FieldErrors<FieldValues>;
  value?: number;
}

const NumberInput = ({ register, name, setValue, getValues, errors, value }: Props) => {
  const error = errors[name]?.message;

  return (
    <>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          onClick={() => setValue(name, Math.max(Number(getValues(name)) - 1, 0))}
          type="button"
          className="bg-neutral-100 hover:bg-gray-100 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <TiMinus />
        </button>
        <input
          className="bg-neutral-100 border border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
          placeholder="0"
          type="text"
          defaultValue={value !== undefined ? value : 0}
          {...register(name, {
            onChange: (e) => setValue(name, e.target.value),
            required: "수량을 선택해주세요",
            pattern: { value: /^(?:\d{1,2}|99)$/, message: "1~99까지만 입력 가능합니다." }
          })}
        />
        <button
          type="button"
          onClick={() => setValue(name, Math.min(Number(getValues(name)) + 1, 99))}
          className="bg-neutral-100  hover:bg-gray-100 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <TiPlus />
        </button>
      </div>
      {error && (
        <div className="text-red-600 mt-1 flex items-center gap-1">
          <MdErrorOutline size={20} /> <span>{error as string}</span>
        </div>
      )}
    </>
  );
};

export default NumberInput;
