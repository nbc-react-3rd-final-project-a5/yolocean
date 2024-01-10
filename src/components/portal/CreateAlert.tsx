"use client";
import { usealertStore } from "@/store/alertStore";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CreateAlert = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { alertFire, message, type } = usealertStore();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        alertFire(null, "success");
      }, 1500);
    }
  }, [message, alertFire]);

  if (typeof window === "undefined") return <></>;

  return mounted && message !== null ? (
    createPortal(
      <div
        className={`fixed ${
          type === "success" ? "bg-green-400" : "bg-red-400"
        } top-4 left-[50%] translate-x-[-50%] p-3 text-white rounded-lg z-10 text-center `}
      >
        {message}
      </div>,
      document.getElementById("alert") as HTMLElement
    )
  ) : (
    <></>
  );
};

export default CreateAlert;
