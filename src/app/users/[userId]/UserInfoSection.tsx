"use client";

import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import EditUserInfo from "./EditUserInfo";
import useUserEditModeStore from "@/store/editUserStore";
import useLogedInStore from "@/store/logedStore";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks";

const UserInfoSection = () => {
  const { isEditMode } = useUserEditModeStore();
  const { logedIn } = useLogedInStore();
  const { userId } = useParams();
  const { getLoginUser } = useAuth();

  const { data: loginUser, isLoading } = useQuery({
    queryKey: ["loginUser"],
    queryFn: getLoginUser
  });

  if (logedIn && loginUser?.session?.user.id === userId) {
    return <div>{!isEditMode ? <UserInfo /> : <EditUserInfo />}</div>;
  } else if (isLoading) {
    return <div>로딩 중...</div>;
  } else {
    return <div>올바른 접근방식이 아닙니다.</div>;
  }
};

export default UserInfoSection;
