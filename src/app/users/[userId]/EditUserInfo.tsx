import Avatar from "@/components/Avatar";
import { useImageInput } from "@/hooks";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import useStorage from "@/utils/useStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdPhotoCameraBack } from "react-icons/md";

const EditUserInfo = ({ user, refetch }: { user: UserInfo | undefined; refetch: any }) => {
  const [name, setName] = useState<string>(`${user!.username}`);

  const { userId } = useParams() as { userId: string };
  const { setIsEditMode } = useUserEditModeStore();
  const { uploadImage, deleteImage } = useStorage();
  const { customImage, handler, addPreImage } = useImageInput("single");
  const queryClient = useQueryClient();

  const updateUser = async (data: { username: string; avatar_url: string | null }, userId: string) => {
    await fetch(`/api/users/${userId}`, { method: "PATCH", body: JSON.stringify(data) });
  };

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: (data: { content: { username: string; avatar_url: string | null }; userId: string }) =>
      updateUser(data.content, data.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const handleUpdateUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && user!.avatar_url) {
      await deleteImage("user", user.avatar_url);
    }

    const url = await uploadImage(customImage?.file!, "user", customImage!.id, user!.id);

    updateUserMutation({
      content: { username: name, avatar_url: url },
      userId: userId
    });
    setIsEditMode(false);
  };

  useEffect(() => {
    refetch();
  }, [customImage]);

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
            <label htmlFor="name" className="w-[89px]">
              이름
            </label>
            <input className="border border-black " id="name" value={name} onChange={(e) => setName(e.target.value)} />
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
