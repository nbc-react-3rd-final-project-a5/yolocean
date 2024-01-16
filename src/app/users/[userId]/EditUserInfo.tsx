import Avatar from "@/components/Avatar";
import useUserEditModeStore from "@/store/editUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const EditUserInfo = () => {
  const [name, setName] = useState<string>("");
  const { userId } = useParams() as { userId: string };
  const { setIsEditMode } = useUserEditModeStore();
  const queryClient = useQueryClient();

  const updateUser = async (data: { username: string }, userId: string) => {
    await fetch(`/api/users/${userId}`, { method: "PATCH", body: JSON.stringify(data) });
  };

  const updateUserMutation = useMutation({
    mutationFn: (data: { content: { username: string }; userId: string }) => updateUser(data.content, data.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const handleUpdateUserInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserMutation.mutate({ content: { username: name }, userId: userId });
    setIsEditMode(false);
  };

  return (
    <div>
      <div>{/* <Avatar size="lg" src="/a" /> */}</div>
      <form onSubmit={handleUpdateUserInfoSubmit}>
        <label htmlFor="name">이름</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">수정완료</button>
      </form>
    </div>
  );
};

export default EditUserInfo;
