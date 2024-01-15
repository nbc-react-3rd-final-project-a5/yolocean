import React from "react";
import UserInfoSection from "./UserInfoSection";

const MyPage = ({ params }: { params: { userId: string } }) => {
  return (
    <div>
      <UserInfoSection />
    </div>
  );
};

export default MyPage;
