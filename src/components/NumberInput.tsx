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
}

const NumberInput = ({ register, name, setValue, getValues, errors }: Props) => {
  const error = errors[name]?.message;

  // 에러처리 ref나 onChange로 불가 여차하면 submit시 처리할것!
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
            required: "수량을 선택해주세요",
            pattern: { value: /^(?:\d{1,3}|999)$/, message: "1~999까지만 입력가능합니다." }
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
      {/* {error && (
        <div className={`flex items-center gap-1 text-red-400 ${error ? "opacity-100" : "opacity-0"}`}>
          <MdErrorOutline />
          <span className="text-sm">{error as string}.</span>
        </div>
      )} */}
    </>
  );
};

export default NumberInput;
