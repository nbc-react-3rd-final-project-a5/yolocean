"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
interface Props {
  title: string;
  body: string;
  index: number | undefined;
}

const Accordion = ({ title, body, index }: Props) => {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div className="h-full border rounded-sm " onClick={() => setIsopen((prev) => !prev)}>
      <div className=" overflow-hidden text-[16px]  ">
        <div className="flex justify-between py-[20px] px-2">
          <h1 className=" ">
            {index ? `Q${index}.` : null} {title}
          </h1>
          <IoIosArrowDown size={30} className={`transition-all ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
        <div
          className={`${
            isOpen ? "max-h-[500px] h-fit p-[20px]" : "max-h-[0px] overflow-hidden"
          } bg-[#F5F5F5] transition-all `}
        >
          {index ? `A${index}. ` : null}
          {body}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
