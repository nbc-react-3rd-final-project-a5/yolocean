import React, { Suspense } from "react";
import UserInfoSection from "./UserInfoSection";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import UserTab from "./UserTab";
import UserReviewList from "./(tabContent)/UserReviewList";
import UserQnaList from "./(tabContent)/UserQnaList";
import UserRentList from "./(tabContent)/UserRentList";
import { Metadata } from "next";
import { getUser } from "@/service/table";
import UserRentPulse from "@/components/pulse/UserRentPulse";

interface Props {
  params: { userId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const userId = params.userId;
  const userData = await getUser({ userId });

  return {
    title: `YOLOCEAN | 반갑습니다! ${userData.username} 님!`,
    openGraph: {
      images: ["/opengraph-image.png"]
    }
  };
}

type article = "예약내역" | "렌트완료" | "작성한 리뷰" | "Q&A";

const linkList = [
  {
    name: "홈",
    url: "https://yolocean.store/"
  },
  {
    name: "마이페이지",
    url: "https://yolocean.store/"
  }
];

const MyPage = ({ params, searchParams }: Props) => {
  const { userId } = params;
  const article = searchParams?.article;
  const currentPage = Number(searchParams?.page) || 1;

  const currentTap = (article: string | string[] | undefined) => {
    switch (article as article) {
      case "렌트완료":
        return (
          <Suspense fallback={<UserRentPulse />}>
            <UserRentList userId={userId} article={"렌트완료"} isReturn={true} page={currentPage} />
          </Suspense>
        );
      case "작성한 리뷰":
        return (
          <Suspense fallback={<UserRentPulse />}>
            <UserReviewList userId={userId} article={"작성한 리뷰"} page={currentPage} />
          </Suspense>
        );
      case "Q&A":
        return (
          <Suspense fallback={<UserRentPulse />}>
            <UserQnaList userId={userId} article={"Q&A"} page={currentPage} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<UserRentPulse />}>
            <UserRentList userId={userId} article={"예약내역"} isReturn={false} page={currentPage} />
          </Suspense>
        );
    }
  };
  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <UserInfoSection />
      <UserTab className="mt-[78px] mb-[40px]" />
      {currentTap(article)}
    </>
  );
};

export default MyPage;
