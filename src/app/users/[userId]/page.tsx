import React from "react";
import UserInfoSection from "./UserInfoSection";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
const linkList = [
  {
    name: "홈",
    url: "https://yolocean.vercel.app/"
  },
  {
    name: "마이페이지",
    url: "https://yolocean.vercel.app/"
  }
];
const MyPage = () => {
  return (
    <div>
      <PageBreadCrumb linkList={linkList} />
      <UserInfoSection />
    </div>
  );
};

export default MyPage;
