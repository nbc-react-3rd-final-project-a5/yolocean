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
  const { isEditMode, setIsEditMode } = useUserEditModeStore();
  const { logedIn } = useLogedInStore();
  const { userId } = useParams();
  const { getLoginUser } = useAuth();

  // 현재 로그인한 유저 정보 가져오기
  const { data: loginUser, isLoading } = useQuery({
    queryKey: ["loginUser"],
    queryFn: getLoginUser
  });
  // url id로 유저 정보 가져오기
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<UserInfo> => {
      const result = await fetch(`/api/users/${userId}`, { method: "GET" });
      if (!result.ok) {
        throw new Error("유저 정보 불러오기 실패");
      }
      return await result.json();
    }
  });

  useEffect(() => {
    setIsEditMode(false);
  }, []);

  if (logedIn && loginUser?.session?.user.id === userId) {
    return <div>{!isEditMode ? <UserInfo user={user} /> : <EditUserInfo user={user} />}</div>;
  } else if (isLoading) {
    return <div>로딩 중...</div>;
  } else {
    return <div>올바른 접근방식이 아닙니다.</div>;
  }
};

export default UserInfoSection;
