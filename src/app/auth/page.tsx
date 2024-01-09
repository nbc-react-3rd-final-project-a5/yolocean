"use client";
import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const page = () => {
  const [mode, setMode] = useState<boolean>(true);
  return <>{mode ? <SignIn mode={mode} setMode={setMode} /> : <SignUp mode={mode} setMode={setMode} />}</>;
};

export default page;
