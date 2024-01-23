import React from "react";
import UserInfoSection from "./UserInfoSection";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import UserTab from "./UserTab";
import UserReviewList from "./(tabContent)/UserReviewList";
import UserQnaList from "./(tabContent)/UserQnaList";
import UserReservationList from "./(tabContent)/UserReservationList";
import UserRentList from "./(tabContent)/UserRentList";

interface Props {
  params: { userId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

enum EnumTabList {
  reservation = "예약내역",
  rent = "렌트완료",
  review = "작성한 리뷰",
  qna = "Q&A"
}

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

const MyPage = ({ params, searchParams }: Props) => {
  const { userId } = params;
  const activeTab = searchParams?.activeTab;

  const currentTap = (activeTab: string | string[] | undefined) => {
    switch (activeTab) {
      case "rent":
        return <UserRentList />;
      case "review":
        return <UserReviewList userId={userId} />;
      case "qna":
        return <UserQnaList userId={userId} />;
      default:
        return <UserReservationList userId={userId} />;
    }
  };
  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <UserInfoSection />
      {/* <UserTab className="mt-[78px] mb-[40px]" /> */}
      {currentTap(activeTab)}
    </>
  );
};

export default MyPage;
