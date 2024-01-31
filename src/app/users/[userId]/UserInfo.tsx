import Avatar from "@/components/Avatar";
import CustomButton from "@/components/CustomButton";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import React from "react";

const UserInfoItem = ({ title, content }: { title: string; content: string | null }) => {
  return (
    <li>
      <span className="inline-block w-[89px] mr-[12px]">{title}</span>
      {content}
    </li>
  );
};

const UserInfo = ({ user }: { user: UserInfo }) => {
  const { imageURL, setIsEditMode } = useUserEditModeStore();

  return (
    <div className="flex gap-[40px] justify-center items-center pt-[78px] flex-wrap ">
      <div>
        <Avatar size="lg" src={imageURL ? imageURL : (user.avatar_url as string)} />
      </div>
      <div className="flex flex-col min-w-[274px] h-[170px] my-[10px]   gap-[46px]">
        <ul className="flex flex-col gap-[20px] text-[18px] font-medium">
          <UserInfoItem title={"이름"} content={user.username} />
          <UserInfoItem title={"이메일"} content={user.email} />
        </ul>
        <div className="flex gap-[5px] text-[14px]">
          <CustomButton
            size="sm"
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            회원정보 수정
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
