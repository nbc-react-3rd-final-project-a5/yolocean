"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { supabase } from "@/service/supabase";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import useLogedInStore from "@/store/logedStore";

const logedInCheck = async (setLogedIn: (state: boolean) => void) => {
  const { data, error } = await supabase.auth.getSession();
  // console.log(data);
  if (data.session !== null) {
    setLogedIn(true);
  }
};

const AuthBtn = () => {
  //로그인 상태
  const { logedIn, setLogedIn } = useLogedInStore();

  //유저 햄버거 열기
  const [menu, setMenu] = useState(false);

  const router = useRouter();

  //로그아웃
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setLogedIn(false);
    router.push("/");
  }

  useEffect(() => {
    logedInCheck(setLogedIn);

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
        <ul className="absolute p-1 mt-1 ml-7 text-right w-32 z-50 right-0 bg-white shadow-md cursor-pointer">
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
      {logedIn ? (
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
