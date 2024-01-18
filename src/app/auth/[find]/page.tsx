"use client";
import React, { useState } from "react";
import FindID from "./FindID";
import FindPW from "./FindPW";

const AuthFindPage = () => {
  const [mode, setMode] = useState<boolean>(true);
  return <>{mode ? <FindID setMode={setMode} /> : <FindPW setMode={setMode} />}</>;
};

export default AuthFindPage;
