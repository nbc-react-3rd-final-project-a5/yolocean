"use client";
import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const page = () => {
  const [mode, setMode] = useState<boolean>(false); //회원가입 페이지 구현 후 기본값 true로 변경
  return <>{mode ? <SignIn mode={mode} setMode={setMode} /> : <SignUp mode={mode} setMode={setMode} />}</>;
};

export default page;
