"use client";

import React, { useEffect } from "react";
import UserInfo from "./UserInfo";
import EditUserInfo from "./EditUserInfo";
import useUserEditModeStore from "@/store/editUserStore";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/service/table";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ProfilePulse from "@/components/pulse/ProfilePulse";

const UserInfoSection = () => {
  const router = useRouter();
  const { isEditMode, setIsEditMode } = useUserEditModeStore();
  const { userId } = useParams<{ userId: string }>();
  const { auth } = useAuthStore();

  // url id로 유저 정보 가져오기
  const {
    data: user,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getUser({ userId })
  });

  useEffect(() => {
    setIsEditMode(false);
  }, []);

  if (isLoading) {
    return <ProfilePulse />;
  }

  if (auth === userId) {
    return <div>{!isEditMode ? <UserInfo user={user} /> : <EditUserInfo user={user} refetch={refetch} />}</div>;
  } else {
    return <div>올바른 접근방식이 아닙니다.</div>;
  }
};

export default UserInfoSection;
