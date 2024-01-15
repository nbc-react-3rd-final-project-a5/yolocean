import { ExtendReview } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

interface Props {
  userId?: string;
  reviewId?: string;
}

enum FetchCase {
  Error,
  AllReviewList,
  UserReviewList,
  UserReview
}

const useReview = ({ userId, reviewId }: Props = {}) => {
  const getFetchPath = () => {
    if (typeof window === "undefined") return null;
    let fetchCase: FetchCase;

    if (!userId && !reviewId) {
      fetchCase = FetchCase.AllReviewList;
    } else if (userId && reviewId) {
      fetchCase = FetchCase.UserReview;
    } else if (userId && !reviewId) {
      fetchCase = FetchCase.UserReviewList;
    } else {
      fetchCase = FetchCase.Error;
    }

    switch (fetchCase) {
      case FetchCase.Error:
        console.error("💥💥💥 useReview : switchFetchPath 내 if 조건문 에러 💥💥💥");
        return null;
      case FetchCase.AllReviewList:
        return `${window.location.origin}/api/review`;
      case FetchCase.UserReviewList:
        return `${window.location.origin}/api/review/users/${userId}`;
      case FetchCase.UserReview:
        return `${window.location.origin}/api/review/users/${userId}/${reviewId}`;
      default:
        console.error("💥💥💥 useReview : switchFetchPath의 switch 문에서 에러 발생 💥💥💥");
        return null;
    }
  };
  const fetchPath = getFetchPath();
  const getReviewList = async () => {
    const response = await fetch(`${fetchPath}`);
    const data = await response.json();
    return data;
  };

  const {
    data: reviewData,
    isLoading,
    isError
  } = useQuery<ExtendReview[]>({
    queryKey: ["review"],
    queryFn: getReviewList,
    enabled: fetchPath !== null
  });

  return { reviewData, isLoading, isError };
};

export default useReview;
