import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const FormFieldSet = ({ title, children }: Props) => {
  return (
    <fieldset className="block mt-[40px]">
      <legend className="block w-full  text-[20px] font-[600] leading-[0.6px] ">
        <div className="mb-[20px]">{title}</div>
      </legend>
      {children}
    </fieldset>
  );
};

export default FormFieldSet;
