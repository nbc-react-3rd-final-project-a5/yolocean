"use client";
import { supabase } from "@/service/supabase";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect } from "react";
import { useStore } from "zustand";

const AuthChage = () => {
  const { setAuth, auth } = useStore(useAuthStore);

  useEffect(() => {
    const test = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        console.log(session);
        session ? setAuth(session.user.id) : setAuth("");
      }
    });

    return () => {
      test;
    };
  }, [setAuth]);

  return <div>AuthChage</div>;
};

export default AuthChage;
