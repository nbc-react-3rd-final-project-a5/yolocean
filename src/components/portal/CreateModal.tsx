"use client";
import { useModalStore } from "@/store/modalStore";
import React, { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CreateModal = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { modalContent, closeModal } = useModalStore();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === "undefined") return <></>;

  return mounted ? (
    createPortal(
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black w-[500px] h-[500px]">
        {modalContent}
      </div>,
      document.getElementById("modal") as HTMLElement
    )
  ) : (
    <></>
  );
};

export default CreateModal;
