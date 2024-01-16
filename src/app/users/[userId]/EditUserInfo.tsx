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
  const [profileURL, setProfileURL] = useState<string | null>("");
  const [newProfileImage, setNewProfileImage] = useState<File>();

  const { userId } = useParams() as { userId: string };
  const { setIsEditMode } = useUserEditModeStore();
  const { uploadImage, deleteImage } = useStorage();
  const { customImage, handler, addPreImage } = useImageInput("single");
  const queryClient = useQueryClient();

  const updateUser = async (data: { username: string; avatar_url: string | null }, userId: string) => {
    await fetch(`/api/users/${userId}`, { method: "PATCH", body: JSON.stringify(data) });
  };

  const {
    mutate: updateUserMutation,
    isError,
    isSuccess,
    isPending
  } = useMutation({
    mutationFn: (data: { content: { username: string; avatar_url: string | null }; userId: string }) =>
      updateUser(data.content, data.userId),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }, 1000);
    }
  });

  const handleUpdateUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // deleteImage('user',)
    const url = await uploadImage(customImage?.file!, "user", customImage?.id!, user!.id);

    updateUserMutation({
      content: { username: name, avatar_url: url },
      userId: userId
    });
    setIsEditMode(false);
    // console.log("customImage", customImage);
  };

  const handleUserImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // if(typeof customImageList[0].file === File){
    //   const url = await uploadImage(customImageList[0].file, "user", "profile", user!.id);
    // }

    console.log("file", customImage?.file);
    console.log("file URL", customImage?.previewURL);
    // const url = await uploadImage(customImage?.file!, "user", "profile", user!.id);
    // console.log("url", url);
    // setProfileURL(url);

    // console.log("file", customImage?.file);
    // const url = await uploadImage(customImage?.file!, "user", "profile", user!.id);
    // console.log("url", url);
    // setProfileURL(url);
  };

  useEffect(() => {
    // console.log("data", customImage);
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
