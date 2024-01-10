"use client";
import Link from "next/link";
import React, { useState } from "react";
import { supabase } from "@/service/supabase";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";

const AuthBtn = () => {
  //로그인 상태 (수정 필)
  const [isLogedIn, setIsLogedIn] = useState(false);

  //유저 햄버거 열기
  const [menu, setMenu] = useState(false);

  const router = useRouter();

  //로그아웃
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setIsLogedIn(false);
    router.push("/");
  }

  const UserMenu = () => {
    return (
      <>
        <ul className="absolute p-1 mt-2 text-right w-32 z-50 right-0 bg-white border-2 rounded-xl border-gray-300 cursor-pointer">
          <li className="mr-1">
            <Link href={"/user"}>마이 페이지</Link>
          </li>
          <li className="mr-1" onClick={signOut}>
            로그아웃
          </li>
        </ul>
      </>
    );
  };

  return (
    <>
      {isLogedIn ? (
        <div onClick={() => setMenu(!menu)} className="relative">
          <AiOutlineUser size="22" className="cursor-pointer" />
          {menu && <UserMenu />}
        </div>
      ) : (
        <Link href={"/auth"}>
          <AiOutlineUser size="22" />
        </Link>
      )}
    </>
  );
};

export default AuthBtn;
