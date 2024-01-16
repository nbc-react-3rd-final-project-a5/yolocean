import Avatar from "@/components/Avatar";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import React from "react";

const UserInfo = ({ user }: { user: UserInfo | undefined }) => {
  const { setIsEditMode } = useUserEditModeStore();
  console.log("user avatar", user?.avatar_url);
  if (typeof user === "undefined") {
    return <div>로딩 중..</div>;
  }
  return (
    <div className="flex gap-[20px] justify-center items-center">
      <Avatar size="lg" src={user.avatar_url as string} />
      <div className="flex flex-col gap-[10px]">
        <p>이름: {user.username}</p>
        <p>전화번호:</p>
        <p>이메일:{user.email}</p>
        <button
          className="border border-black mt-5"
          type="button"
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
