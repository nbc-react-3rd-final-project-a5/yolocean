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
      <div className="relative flex items-center text-[14px] ">
        <button
          onClick={() => setValue(name, Math.max(Number(getValues(name)) - 1, 1))}
          type="button"
          className="border border-line h-[30px] w-[30px] flex justify-center items-center"
        >
          <TiMinus size={14} />
        </button>
        <input
          className="border border-line h-[30px] w-[30px] text-center"
          placeholder="1"
          type="text"
          defaultValue={value !== undefined ? value : 1}
          {...register(name, {
            onChange: (e) => setValue(name, e.target.value),
            required: "수량을 선택해주세요",
            min: { value: 1, message: "한개이상의 수량을 선택해주세요" },
            pattern: { value: /^(?:[1-9]|[1-9]\d)$/, message: "1~99까지만 입력 가능합니다." }
          })}
        />
        <button
          type="button"
          onClick={() => setValue(name, Math.min(Number(getValues(name)) + 1, 99))}
          className="border border-line h-[30px] w-[30px] flex justify-center items-center"
        >
          <TiPlus size={14} />
        </button>
      </div>
      {error && (
        <div className="text-red-400 text-[12px] mt-1 flex items-center gap-1">
          <MdErrorOutline size={14} /> <span>{error as string}</span>
        </div>
      )}
    </>
  );
};

export default NumberInput;
