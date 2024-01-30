"use client";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { useStore } from "zustand";
import { usealertStore } from "@/store/alertStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const AuthChage = () => {
  const { setAuth, auth } = useStore(useAuthStore);
  const supabaseAuth = createClientComponentClient<Database>();
  const { alertFire } = usealertStore();

  useEffect(() => {
    const test = supabaseAuth.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        if (session) {
          setAuth(session.user.id);
          if (!sessionStorage.getItem("login")) {
            alertFire("성공적으로 로그인 되었습니다", "success");
            sessionStorage.setItem("login", "true");
          }
        } else {
          setAuth("");
          sessionStorage.removeItem("login");
        }
        session ? setAuth(session.user.id) : setAuth("");
      }
      if (event === "SIGNED_OUT") {
        setAuth("");
        sessionStorage.removeItem("login");
      }
    });

    return () => {
      test;
    };
  }, [setAuth]);

  return <></>;
};

export default AuthChage;
