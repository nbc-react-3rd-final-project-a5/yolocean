import Avatar from "@/components/Avatar";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import React from "react";

const UserInfo = ({ user }: { user: UserInfo | undefined }) => {
  const { setIsEditMode } = useUserEditModeStore();

  if (typeof user === "undefined") {
    return <div>로딩 중..</div>;
  }
  return (
    <div className="flex gap-[40px] justify-center items-center pt-[114px]">
      <div>
        <Avatar size="lg" src={user.avatar_url as string} />
      </div>
      <div className="flex flex-col min-w-[274px] h-[170px] my-[10px] gap-[46px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[12px]">
            <div className="w-[89px]">이름</div>
            <p>{user.username}</p>
          </div>
          <div className="flex gap-[12px]">
            <div className="w-[89px]">전화번호</div>
            <p>{user.phone}</p>
          </div>
          <div className="flex gap-[12px]">
            <div className="w-[89px]">이메일</div>
            <p>{user.email}</p>
          </div>
        </div>
        <div>
          <button
            className="w-[125px] h-[30px] bg-point text-white rounded-[5px]"
            type="button"
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            회원정보 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
