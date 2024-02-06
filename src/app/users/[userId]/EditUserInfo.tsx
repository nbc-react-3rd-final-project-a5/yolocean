import Avatar from "@/components/Avatar";
import { useCustomMutation, useImageInput } from "@/hook";
import { updateUser } from "@/service/table";
import { usealertStore } from "@/store/alertStore";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import useStorage from "@/utils/useStorage";
import { useParams } from "next/navigation";

import React, { useState } from "react";
import { MdPhotoCameraBack } from "react-icons/md";

const EditUserInfo = ({ user, refetch }: { user: UserInfo | undefined; refetch: any }) => {
  const { alertFire } = usealertStore();
  const [name, setName] = useState<string>(`${user!.username}`);
  const { userId } = useParams() as { userId: string };
  const { setIsEditMode } = useUserEditModeStore();
  const { uploadImage, deleteImage } = useStorage();
  const { customImageList, handler } = useImageInput(1);
  const { setImageURL } = useUserEditModeStore();
  const updateUserMutation = useCustomMutation({
    mutationFn: async (data: { content: { username: string; avatar_url?: string | null } }) =>
      await updateUser({ userId: userId, body: JSON.stringify(data.content) }),
    queryKey: ["user"]
  });

  const handleUpdateUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    let newUserImageUrl;
    // 사진 변경을 했을 경우
    try {
      if (user?.avatar_url && customImageList?.[0]?.file) {
        await deleteImage("user", user.avatar_url);
        newUserImageUrl = await uploadImage(customImageList?.[0].file, "user", customImageList?.[0].id, user.id);
        setImageURL(customImageList?.[0].previewURL);
      }
      updateUserMutation.mutate({
        content: { username: name, avatar_url: newUserImageUrl }
      });

      return setIsEditMode(false);
    } catch (error) {
      alertFire("회원정보 수정 중 오류가 발생하였습니다.", "error");
    }
  };

  return (
    <div className="flex gap-[40px] justify-center items-center pt-[78px] flex-wrap">
      <div className="relative">
        <Avatar size="lg" src={customImageList?.[0] ? customImageList?.[0].previewURL : user?.avatar_url!} />
        <label className="absolute top-0 w-full h-full flex flex-col justify-center items-center text-white transition-opacity cursor-pointer rounded-full backdrop-blur-sm backdrop-brightness-50 opacity-0 hover:opacity-100">
          <input type="file" className="hidden" onChange={handler.handleAddImageChange} accept="image/*" />
          <MdPhotoCameraBack className="text-[4rem] mx-auto" />
          <p className="font-bold">이미지 변경</p>
        </label>
      </div>
      <form
        className="flex flex-col min-w-[274px] h-[170px] my-[10px] gap-[46px]"
        onSubmit={handleUpdateUserInfoSubmit}
      >
        <div className="flex flex-col gap-[110px] mobile:gap-[30px]">
          <div className="flex flex-col gap-1">
            <div className="flex gap-[12px]">
              <label htmlFor="name" className="w-[89px] h-[16px]">
                이름
              </label>
              <input
                className="border border-black h-[24px] "
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                maxLength={10}
              />
            </div>
            <p className="text-end font-light text-tc-light text-[12px]">{name.length}/10</p>
          </div>

          <div className="flex gap-[5px] justify-center">
            <button className="w-[125px] h-[30px] bg-point text-white rounded-[5px]" type="submit">
              수정완료
            </button>
            <button
              className="w-[125px] h-[30px] border border-point text-point rounded-[5px]"
              type="button"
              onClick={() => setIsEditMode(false)}
            >
              취소
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
