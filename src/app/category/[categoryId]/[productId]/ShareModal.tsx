import { useModalStore } from "@/store/modalStore";
import React from "react";
import { IoShareSocial, IoShareSharp, IoClose } from "react-icons/io5";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useStore } from "zustand";
const ShareModal = () => {
  const { closeModal } = useStore(useModalStore);

  return (
    <div className="w-[345px] h-[165px] py-[15px] flex flex-col">
      <div className="flex justify-center items-center relative">
        <h1 className="font-[700] text-[20px] flex-1 text-center text-point">공유하기</h1>
        <IoClose onClick={closeModal} size={25} className="absolute right-[15px] cursor-pointer" />
      </div>
      <div className="flex justify-center items-center gap-[35px] flex-1">
        <div className="flex flex-col gap-[7px]">
          <button className="border py-[9px] px-[10px] rounded-full">
            <RiKakaoTalkFill size={36} />
          </button>
          <p className="font-[400] text-[15px]">카카오톡</p>
        </div>
        <div className="flex flex-col gap-[7px]">
          <button className="border py-[9px] px-[10px] rounded-full">
            <IoShareSharp size={36} />
          </button>
          <p className="font-[400] text-[15px]">URL 복사</p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
