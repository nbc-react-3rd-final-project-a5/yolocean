import { RentInsert } from "@/types/db";
import { useModalStore } from "@/store/modalStore";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  rentData: RentInsert[];
}

const SuccessModal = (rentData: Props) => {
  const rentItems = rentData.rentData;
  const userId = rentItems[0].user_id;

  const { closeModal } = useModalStore();
  const router = useRouter();

  const handleBtn = (goto: string) => {
    router.push(`${goto}`);
    closeModal();
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-[400px] h-[250px] py-[50px] space-y-[30px]">
        <div className="text-center space-y-[30px]">
          <p className="text-point font-bold text-[20px]">성공적으로 결제되었습니다</p>
          <p>마이페이지에서 렌트내역을 확인하세요</p>
        </div>
        <div className="space-x-[12px] text-tc-middle">
          <button
            onClick={() => handleBtn(`/users/${userId}`)}
            className="border border-tc-middle w-[100px] h-[40px] rounded-[5px]"
          >
            마이페이지
          </button>
          <button onClick={() => handleBtn(`/`)} className="border border-tc-middle w-[100px] h-[40px] rounded-[5px]">
            홈으로
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
