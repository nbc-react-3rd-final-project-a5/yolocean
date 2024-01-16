import Avatar from "@/components/Avatar";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const UserInfo = () => {
  const { userId } = useParams<{ userId: string }>();
  const { setIsEditMode } = useUserEditModeStore();

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

  return (
    <div>
      <div>{/* <Avatar size="lg" src="/a" /> */}</div>
      <div>
        <p>이름: {user?.username}</p>
        <p>전화번호:</p>
        <p>이메일:{user?.email}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsEditMode(true);
        }}
      >
        수정하기
      </button>
    </div>
  );
};

export default UserInfo;
