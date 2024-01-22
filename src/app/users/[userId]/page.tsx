import React from "react";
import UserInfoSection from "./UserInfoSection";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
const linkList = [
  {
    name: "홈",
    url: "http://localhost:3000/"
  },
  {
    name: "마이페이지",
    url: "http://localhost:3000/"
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
