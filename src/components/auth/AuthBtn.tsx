"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usealertStore } from "@/store/alertStore";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { useAuthStore } from "@/store/authStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const AuthBtn = () => {
  //로그인 상태
  const { auth, setAuth } = useAuthStore();
  //유저 햄버거 열기
  const [menu, setMenu] = useState(false);

  const router = useRouter();

  const supabaseAuth = createClientComponentClient<Database>();

  //alert
  const { alertFire } = usealertStore();

  //로그아웃
  async function signOut() {
    const { error } = await supabaseAuth.auth.signOut();
    setAuth("");
    alertFire("성공적으로 로그아웃 되었습니다", "success");
    router.push("/");
  }

  useEffect(() => {
    if (!menu) return;
    const closeMenu = () => setMenu(false);

    const closeMenuTimer = setTimeout(() => {
      window.addEventListener("click", closeMenu);
    }, 200);

    return () => {
      clearTimeout(closeMenuTimer);
      window.removeEventListener("click", closeMenu);
    };
  }, [menu]);

  const UserMenu = () => {
    return (
      <>
        <div
          id="dropdown"
          className={
            menu
              ? "absolute space-y-2 z-10 p-2 bg-white rounded-sm shadow w-32 text-end mobile:left-0 mobile:w-full mobile:text-center mobile:mt-7"
              : "hidden"
          }
        >
          <ul className="cursor-pointer text-sm">
            {auth === `${process.env.NEXT_PUBLIC_ADMIN}` ? (
              <Link href={`/admin`} aria-label="관리자페이지로 이동">
                <li className="p-2 hover:underline decoration-wavy decoration-point">관리자 페이지</li>
              </Link>
            ) : (
              <>
                <Link href={`/cart/${auth}`} aria-label="장바구니로 이동">
                  <li className="hidden mobile:p-2 mobile:block">장바구니</li>
                </Link>
                <Link href={`/users/${auth}`} aria-label="마이페이지로 이동">
                  <li className="p-2 hover:underline decoration-wavy decoration-point">마이 페이지</li>
                </Link>
              </>
            )}
            <li onClick={signOut} className="p-2 hover:underline decoration-wavy decoration-point">
              로그아웃
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      {auth !== "" ? (
        <div onClick={() => setMenu(!menu)} className="">
          <AiOutlineUser size="22" id="userDropDown" className="cursor-pointer mt-[5px] mobile:mt-0" color="#3074F0" />
          <div className="flex flex-col items-end">
            <UserMenu />
          </div>
        </div>
      ) : (
        <Link href={"/auth"} aria-label="로그인 페이지로 이동">
          <AiOutlineUser size="22" className="cursor-pointer mt-[5px] mobile:mt-0" color="#3074F0" />
        </Link>
      )}
    </>
  );
};

export default AuthBtn;
