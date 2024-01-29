"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
interface Props {
  title: string;
  body: string;
}

// 하나만 열리게 수정필요하면 해야함

const Accordion = ({ title, body }: Props) => {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div className="h-full border-b border-line rounded-sm " onClick={() => setIsopen((prev) => !prev)}>
      <div className=" overflow-hidden text-[16px]   ">
        <div className="flex border-b border-line justify-between items-center py-[20px] px-2">
          <h1 className="flex items-center">
            <strong className="text-point">Q.&nbsp;</strong> {title}
          </h1>
          <IoIosArrowDown size={30} className={`transition-all ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
        <div
          className={`${isOpen ? "max-h-[500px] h-fit p-[20px]" : "max-h-[0px] overflow-hidden"} bg-bg transition-all `}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
