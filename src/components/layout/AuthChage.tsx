"use client";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { useStore } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

const AuthChage = () => {
  const { setAuth, auth } = useStore(useAuthStore);
  const supabaseAuth = createClientComponentClient<Database>();

  useEffect(() => {
    const test = supabaseAuth.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        session ? setAuth(session.user.id) : setAuth("");
      }
      console.log(auth);
    });

    return () => {
      test;
    };
  }, [setAuth]);

  return <></>;
};

export default AuthChage;
