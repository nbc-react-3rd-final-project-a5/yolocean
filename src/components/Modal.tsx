"use client";
import React, { JSXElementConstructor, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactNode }) => {
  return <Portal>{children}</Portal>;
};

export default Modal;

function Portal({ children }: { children: ReactNode }) {
  const [domNode, setDomNode] = useState<null | HTMLElement>();

  useEffect(() => {
    setDomNode(document.getElementById("portal"));
  }, [domNode]);

  return <div>{domNode && createPortal(children, domNode)}</div>;
}
