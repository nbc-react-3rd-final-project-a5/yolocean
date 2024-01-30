"use client";
import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
  const [mode, setMode] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const imp_uid = searchParams.get("imp_uid");

  useEffect(() => {
    if (imp_uid) return setMode(false);
  }, [imp_uid]);

  return <>{mode ? <SignIn mode={mode} setMode={setMode} /> : <SignUp mode={mode} setMode={setMode} />}</>;
};

export default AuthPage;
