"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";
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
        <div className="fixed inset-0 bg-black z-10 opacity-65 cursor-pointer" />,
        document.getElementById("back_drop") as HTMLElement
      )}
      {createPortal(
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col z-20 bg-white rounded-xl w-full h-full max-w-[500px] max-h-[300px]">
          <div className="text-2xl font-medium flex justify-between items-center px-4 py-4">
            <h1>{title}</h1>
            <IoMdCloseCircle className="cursor-pointer" onClick={() => handleCloseConfirmClick(false)} />
          </div>
          <div className="bg-neutral-200 border px-4 flex-1 flex items-center">
            <p>{question}</p>
          </div>
          <div className="flex py-4 justify-end gap-2 px-4">
            <button className="p-2 bg-green-400 rounded-lg text-white " onClick={() => handleCloseConfirmClick(true)}>
              그래
            </button>
            <button className="p-2 bg-red-400 rounded-lg text-white " onClick={() => handleCloseConfirmClick(false)}>
              아니
            </button>
          </div>
        </div>,
        document.getElementById("confirm") as HTMLElement
      )}
    </>
  ) : null;
};

export default CreateConfirm;
