"use client";

import React, { useState } from "react";
import { createCertification, createPayment } from "@/lib/portone";
import { useStore } from "zustand";
import { usealertStore } from "@/store/alertStore";

const TestPage = () => {
  const [isPass, setIsPass] = useState(false);
  const [pn, setPn] = useState<string>();
  const { alertFire } = useStore(usealertStore);

  const onClick = async (pn: string) => {
    const { isPass, msg } = await createCertification(pn);
    alertFire(msg, isPass ? "success" : "error");
    return setIsPass(isPass);
  };

  const onClickCredit = async () => {
    const { isPass, msg } = await createPayment({ amount: 1000, buyer_tel: "010-5762-8254" });
    alertFire(msg, isPass ? "success" : "error");
  };
  return (
    <div>
      <input type="text" className="border-2 border-line p-4" onChange={(e) => setPn(e.target.value)} />
      <br />
      <button
        onClick={() => pn && onClick(pn)}
        className="border-2 border-line p-4 disabled:bg-gray-200 disabled:text-gray-300"
        disabled={!pn}
      >
        인증버튼
      </button>
      <br />
      <button
        onClick={onClickCredit}
        className="mt-[40px] border-2 border-line p-4 disabled:bg-gray-200 disabled:text-gray-300"
      >
        결제하기
      </button>
    </div>
  );
};

export default TestPage;
