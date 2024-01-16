"use client";
import { useModalStore } from "@/store/modalStore";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const CreateModal = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { modalContent, closeModal, isModalOpen, title } = useModalStore();

  useEffect(() => {
    setMounted(true);
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      setMounted(false);
      document.body.style.overflowY = "";
    };
  }, [isModalOpen]);

  if (typeof window === "undefined") return <></>;

  if (!isModalOpen) return <></>;
  return mounted ? (
    <>
      {createPortal(
        <div className="fixed inset-0 bg-black z-10 opacity-65 cursor-pointer" onClick={closeModal} />,
        document.getElementById("back_drop") as HTMLElement
      )}
      {createPortal(
        <div className="fixed bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 rounded-lg overflow-hidden">
          {/* <div className="flex justify-between bg-[#3074F0] h-[60px] text-[20px] text-white items-center p-[20px]">
            <h1>{title}</h1>
            <IoClose className="text-white cursor-pointer" onClick={closeModal} size={30} />
          </div> */}
          {modalContent}
        </div>,
        document.getElementById("modal") as HTMLElement
      )}
    </>
  ) : (
    <></>
  );
};

export default CreateModal;
