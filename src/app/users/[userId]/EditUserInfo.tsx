import Avatar from "@/components/Avatar";
import useUserEditModeStore from "@/store/editUserStore";
import { UserInfo } from "@/types/db";
import useStorage from "@/utils/useStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { MdPhotoCameraBack } from "react-icons/md";

const EditUserInfo = ({ user }: { user: UserInfo | undefined }) => {
  const [name, setName] = useState<string>(`${user!.username}`);
  // const [profileURL, setProfileURL] = useState<string | null>(`${user!.avatar_url}`);
  const [newProfileImage, setNewProfileImage] = useState<File>();

  const { userId } = useParams() as { userId: string };
  const { setIsEditMode } = useUserEditModeStore();
  const { uploadImage } = useStorage();
  const queryClient = useQueryClient();

  const updateUser = async (data: { username: string; avatar_url: string }, userId: string) => {
    await fetch(`/api/users/${userId}`, { method: "PATCH", body: JSON.stringify(data) });
  };

  const updateUserMutation = useMutation({
    mutationFn: (data: { content: { username: string; avatar_url: string }; userId: string }) =>
      updateUser(data.content, data.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const handleUpdateUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = await uploadImage(newProfileImage!, "user", "profile", user!.id);
    // setProfileURL(url);
    updateUserMutation.mutate({ content: { username: name, avatar_url: url }, userId: userId });
    setIsEditMode(false);
  };

  const handleUserImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!e.target.files) {
      const newProfileImage = e.target.files[0];
      setNewProfileImage(newProfileImage);
      console.log(newProfileImage);
      return (e.target.files = null);
    }
  };

  return (
    <div className="flex gap-[20px] justify-center items-center">
      <div>
        <div className="">
          <Avatar size="lg" src={user!.avatar_url} />
        </div>
        <input type="file" className="" onChange={handleUserImgChange} />
        {/* <label className=" top-0 w-[200px] h-[200px] flex flex-col justify-center items-center text-white transition-opacity cursor-pointer rounded-full backdrop-blur-sm backdrop-brightness-50 opacity-0 hover:opacity-100">
          <input
            className="hidden"
            type="file"
            onChange={handleUserImgChange}
            name="profile__img-input"
            id="profile__img-input"
          />
          <MdPhotoCameraBack className="text-[4rem] mx-auto" />
          <p className="font-bold">이미지 변경</p>
        </label> */}
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
