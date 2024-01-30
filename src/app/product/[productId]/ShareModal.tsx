import { getProduct } from "@/service/table";
import { usealertStore } from "@/store/alertStore";
import { useModalStore } from "@/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { IoShareSharp, IoClose } from "react-icons/io5";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useStore } from "zustand";
const ShareModal = () => {
  const { closeModal } = useStore(useModalStore);
  const { alertFire } = useStore(usealertStore);

  const { productId } = useParams();
  const { data: product, isLoading } = useQuery({
    queryFn: async () => await getProduct({ productId: productId as string }),
    queryKey: ["product", productId]
  });

  const handleShearToKakao = () => {
    if (isLoading) return;
    const { Kakao, location } = window;

    Kakao.Share.sendDefault({
      objectType: "feed",
      installTalk: true,
      content: {
        title: product.name,
        description: "욜루오션에서 더 많은 상품을 만나보세요!",
        imageUrl: product.thumbnail,
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href
        }
      }
    });
  };

  return (
    <div
      className="w-[345px] h-[165px] py-[15px] flex flex-col bg-white rounded-md mobile:absolute mobile:top-[50%] mobile:left-[50%] mobile:translate-x-[-50%]
    mobile:translate-y-[-50%]
    "
    >
      <div className="flex justify-center items-center relative">
        <h1 className="font-[700] text-[20px] flex-1 text-center text-point">공유하기</h1>
        <IoClose onClick={closeModal} size={25} className="absolute right-[15px] cursor-pointer" />
      </div>
      <div className="flex justify-center items-center gap-[35px] flex-1">
        <div className="flex flex-col gap-[7px]">
          <button className="border py-[9px] px-[10px] rounded-full" onClick={handleShearToKakao}>
            <RiKakaoTalkFill size={36} />
          </button>
          <p className="font-[400] text-[15px]">카카오톡</p>
        </div>
        <div className="flex flex-col gap-[7px]">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              closeModal();
              alertFire("클립보드 저장이 완료되었습니다", "success");
            }}
            className="border py-[9px] px-[10px] rounded-full"
          >
            <IoShareSharp size={36} />
          </button>
          <p className="font-[400] text-[15px]">URL 복사</p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
