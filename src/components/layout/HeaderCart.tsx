"use client";
import Link from "next/link";

import { AiOutlineShopping } from "react-icons/ai";
import { useAuthStore } from "@/store/authStore";
import { usealertStore } from "@/store/alertStore";

const HeaderCart = () => {
  //로그인 여부 확인, userId
  const { auth } = useAuthStore();
  //alert
  const { alertFire } = usealertStore();

  return (
    <>
      {auth !== "" ? (
        <Link href={`/cart/${auth}`} aria-label="장바구니로 이동">
          <AiOutlineShopping size="22" className="mt-[5px]" color="#3074F0" />
        </Link>
      ) : (
        <div onClick={() => alertFire("로그인 후 이용하세요", "error")}>
          <AiOutlineShopping size="22" className="mt-[5px]" color="#3074F0" />
        </div>
      )}
    </>
  );
};

export default HeaderCart;
