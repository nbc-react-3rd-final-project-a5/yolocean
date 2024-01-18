"use client";
import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const AuthPage = () => {
  const [mode, setMode] = useState<boolean>(true);
  return <>{mode ? <SignIn mode={mode} setMode={setMode} /> : <SignUp mode={mode} setMode={setMode} />}</>;
};

export default AuthPage;
