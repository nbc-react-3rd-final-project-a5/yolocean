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
      <div
        className="w-[345px] h-[200px] py-[30px] flex flex-col bg-white rounded-md mobile:absolute mobile:top-[50%] mobile:left-[50%] mobile:translate-x-[-50%]
    mobile:translate-y-[-50%]
    "
      >
        <div className="flex flex-col items-center justify-center space-y-[30px] bg-white">
          <div className="text-center space-y-[30px]">
            <p className="text-point font-bold text-[20px] mobile:text-[18px]">성공적으로 결제되었습니다</p>
            <p className="mobile:text-[14px]">마이페이지에서 렌트내역을 확인하세요</p>
          </div>
          <div className="space-x-[12px] text-tc-middle mobile:text-[14px]">
            <button
              onClick={() => handleBtn(`/users/${userId}`)}
              className="border border-tc-middle w-[100px] h-[40px] rounded-[5px] mobile:w-[80px] mobile:h-[35px]"
            >
              마이페이지
            </button>
            <button
              onClick={() => handleBtn(`/`)}
              className="border border-tc-middle w-[100px] h-[40px] rounded-[5px] mobile:w-[80px] mobile:h-[35px]"
            >
              홈으로
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
