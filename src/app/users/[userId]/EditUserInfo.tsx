import Avatar from "@/components/Avatar";
import { useImageInput } from "@/hooks";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import useStorage from "@/utils/useStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    <div className="flex gap-[20px] justify-center items-center">
      <div>
        <div className="">
          <Avatar size="lg" src={customImage ? customImage.previewURL : user?.avatar_url!} />
        </div>
        <input
          type="file"
          className=""
          onChange={(e) => {
            handler.handleAddImageChange(e);
            console.log("customImage before", customImage);
          }}
        />
      </div>
      <form className="flex flex-col gap-[10px]" onSubmit={handleUpdateUserInfoSubmit}>
        <div>
          <label htmlFor="name">이름</label>
          <input className="border border-black " id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button className="border border-black mt-5" type="submit">
          수정완료
        </button>
        <button className="border border-black mt-5" type="button" onClick={() => setIsEditMode(false)}>
          취소
        </button>
      </form>
    </div>
  );
};

export default EditUserInfo;
