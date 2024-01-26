import Avatar from "@/components/Avatar";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import React from "react";

const UserInfo = ({ user }: { user: UserInfo }) => {
  const { setIsEditMode } = useUserEditModeStore();
  const certificatePhoneNumber = (phoneNumber: string) => {};

  return (
    <div className="flex gap-[40px] justify-center items-center pt-[114px]">
      <div>
        <Avatar size="lg" src={user.avatar_url as string} />
      </div>
      <div className="flex flex-col min-w-[274px] h-[170px] my-[10px]   gap-[46px]">
        <div className="flex flex-col gap-[20px] text-[18px] font-medium">
          <div className="flex gap-[12px]">
            <div className="w-[89px]">이름</div>
            <p>{user.username}</p>
          </div>
          <div className="flex gap-[12px] items-center">
            <div className="w-[89px]">전화번호</div>
            <p>{user.phone || "휴대전화 인증이 되지 않았습니다"}</p>
          </div>
          <div className="flex gap-[12px]">
            <div className="w-[89px]">이메일</div>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="flex gap-[5px] text-[14px]">
          <button
            className="px-6 py-2 bg-point text-white rounded-[5px]"
            type="button"
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            회원정보 수정
          </button>
          <button
            className="px-6 py-2 bg-point text-white rounded-[5px]"
            type="button"
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            {user.phone ? "핸드폰 번호 변경" : "핸드폰 번호 인증"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
