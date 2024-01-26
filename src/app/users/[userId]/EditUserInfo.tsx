import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import ProfilePulse from "@/components/pulse/ProfilePulse";
import { useCustomMutation, useImageInput } from "@/hook";
import { updateUser } from "@/service/table";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import useStorage from "@/utils/useStorage";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { MdPhotoCameraBack } from "react-icons/md";

const EditUserInfo = ({ user, refetch }: { user: UserInfo | undefined; refetch: any }) => {
  const [name, setName] = useState<string>(`${user!.username}`);
  const { userId } = useParams() as { userId: string };
  const { setIsEditMode } = useUserEditModeStore();
  const { uploadImage, deleteImage } = useStorage();
  const { customImage, handler } = useImageInput("single");

  const updateUserMutation = useCustomMutation({
    mutationFn: async (data: { content: { username: string; avatar_url?: string | null } }) =>
      await updateUser({ userId: userId, body: JSON.stringify(data.content) }),
    queryKey: ["user"]
  });

  const handleUpdateUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && user!.avatar_url) {
      await deleteImage("user", user.avatar_url);
    }
    if (customImage) {
      const url = await uploadImage(customImage?.file!, "user", customImage!.id, user!.id);

      updateUserMutation.mutate({
        content: { username: name, avatar_url: url }
      });
      setIsEditMode(false);
    } else {
      updateUserMutation.mutate({
        content: { username: name }
      });
      setIsEditMode(false);
    }
  };

  useEffect(() => {}, [customImage]);

  if (updateUserMutation.isPending) {
    return <ProfilePulse />;
  }
  return (
    <div className="flex gap-[40px] justify-center items-center pt-[114px]">
      <div className="relative">
        <Avatar size="lg" src={customImage ? customImage.previewURL : user?.avatar_url!} />
        <label className="absolute top-0 w-full h-full flex flex-col justify-center items-center text-white transition-opacity cursor-pointer rounded-full backdrop-blur-sm backdrop-brightness-50 opacity-0 hover:opacity-100">
          <input type="file" className="hidden" onChange={handler.handleAddImageChange} />
          <MdPhotoCameraBack className="text-[4rem] mx-auto" />
          <p className="font-bold">이미지 변경</p>
        </label>
      </div>
      <form
        className="flex flex-col min-w-[274px] h-[170px] my-[10px] gap-[46px]"
        onSubmit={handleUpdateUserInfoSubmit}
      >
        <div className="flex flex-col gap-[122px]">
          <div className="flex gap-[12px]">
            <label htmlFor="name" className="w-[89px] h-[16px]">
              이름
            </label>
            <input
              className="border border-black h-[24px] "
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-[5px]">
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
