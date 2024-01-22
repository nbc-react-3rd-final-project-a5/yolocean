"use client";
import Link from "next/link";

import { AiOutlineShopping } from "react-icons/ai";
import useLogedInStore from "@/store/logedStore";
import { useAuthStore } from "@/store/authStore";
import { usealertStore } from "@/store/alertStore";

const HeaderCart = () => {
  //로그인 여부 확인
  const { logedIn } = useLogedInStore();
  //userId
  const { auth } = useAuthStore();
  //alert
  const { alertFire } = usealertStore();

  return (
    <>
      {logedIn ? (
        <Link href={`/cart/${auth}`}>
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
