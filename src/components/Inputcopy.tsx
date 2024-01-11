"use client";
import React, { ReactNode, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { UseFormRegister, FieldValues, Validate } from "react-hook-form";

interface Props {
  children: ReactNode;
  label: string;
  name: string;
  errorMessage?: string;
  validate?: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>>;
  type?: string;
  register?: UseFormRegister<FieldValues>;
  formStateErrors: Record<string, any>;
  observerValue?: string;
  setError: any;
  watch: any;
  clearErrors: any;
  min?: number;
  max?: number;
}

const InputCopy = ({
  children,
  label,

  validate,
  errorMessage,
  type,
  name,
  register,
  formStateErrors,
  observerValue,
  setError,
  watch,
  clearErrors,
  min,
  max
}: Props) => {
  const isError = formStateErrors[name]?.message;

  useEffect(() => {
    if (!observerValue) return;

    if (watch(observerValue) !== watch(name) && watch(observerValue)) {
      setError(name, {
        type: `${observerValue}-mismatch`,
        message: `${observerValue}가 일치하지않습니다.`
      });
    } else {
      clearErrors(name);
    }
  }, [watch(name), observerValue && watch(observerValue), clearErrors, name, observerValue, setError, watch]);

  console.log(formStateErrors);
  console.log(isError);
  return (
    <>
      {label && (
        <label htmlFor={`${name}_input`} className="text-sm font-semibold">
          {label}
        </label>
      )}

      <div
        className={` flex flex-col px-2 p-1.5 border-neutral-300 border-2  rounded-md ${
          isError ? "focus-within:border-red-400" : "focus-within:border-black"
        }`}
      >
        {children}
      </div>
      <div className={`flex items-center gap-1 text-red-400 ${isError ? "opacity-100" : "opacity-0"}`}>
        <MdErrorOutline />
        <span className="text-sm">{isError}.</span>
      </div>
    </>
  );
};

export default InputCopy;
