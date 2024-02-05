"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { confirmStore, closeConfirm } from "@/store/confirmStore";

const CreateConfirm: React.FC = () => {
  const { isConfirmOpen, title, question } = confirmStore();

  useEffect(() => {
    if (isConfirmOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }

    return () => {
      document.body.style.overflowY = "";
    };
  }, [isConfirmOpen]);

  const handleCloseConfirmClick = (answer: boolean) => {
    closeConfirm(answer);
  };

  return isConfirmOpen ? (
    <>
      {createPortal(
        <div className="fixed inset-0 bg-black z-[100] opacity-65 cursor-pointer" />,
        document.getElementById("back_drop") as HTMLElement
      )}
      {createPortal(
        <div className="fixed border overflow-hidden border-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col z-[110] bg-white rounded-xl w-[345px] ">
          <div>
            <h1 className="text-[20px] font-[700] line-clamp-2  text-center leading-tight text-point pt-[30px] pb-[15px]">
              {title}
            </h1>
          </div>
          <div className="text-center text-[16px] flex-1 font-[500] text-black mb-[30px]">
            <p>{question}</p>
          </div>
          <div className="flex  border-t border-line">
            <button
              className="flex-1 text-[18px] border-r border-line  py-[20px]  text-tc-base   "
              onClick={() => handleCloseConfirmClick(true)}
            >
              예
            </button>
            <button
              className="flex-1 text-[18px]   py-[20px]  text-tc-light  "
              onClick={() => handleCloseConfirmClick(false)}
            >
              아니요
            </button>
          </div>
        </div>,
        document.getElementById("confirm") as HTMLElement
      )}
    </>
  ) : null;
};

export default CreateConfirm;
