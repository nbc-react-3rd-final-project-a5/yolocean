import { ExtendReview } from "@/types/db";
import { useQuery } from "@tanstack/react-query";

interface Props {
  productId?: string;
  userId?: string;
  reviewId?: string;
}

enum FetchCase {
  Error,
  AllReviewList,
  ProductReviewList,
  UserReviewList,
  UserReview
}

const useReview = ({ productId, userId, reviewId }: Props = {}) => {
  const getFetchPath = () => {
    const defaultReviewApiPath = `${window.location.origin}/api/review`;
    let fetchCase: FetchCase;

    if (!productId && !userId && !reviewId) {
      fetchCase = FetchCase.AllReviewList;
    } else if (productId && !userId && !reviewId) {
      fetchCase = FetchCase.ProductReviewList;
    } else if (!productId && userId && reviewId) {
      fetchCase = FetchCase.UserReview;
    } else if (!productId && userId && !reviewId) {
      fetchCase = FetchCase.UserReviewList;
    } else {
      fetchCase = FetchCase.Error;
    }

    switch (fetchCase) {
      case FetchCase.Error:
        console.error("💥💥💥 useReview : switchFetchPath 내 if 조건문 에러 💥💥💥");
        return null;
      case FetchCase.AllReviewList:
        return `${defaultReviewApiPath}`;
      case FetchCase.ProductReviewList:
        return `${defaultReviewApiPath}/products/${productId}`;
      case FetchCase.UserReviewList:
        return `${defaultReviewApiPath}/users/${userId}`;
      case FetchCase.UserReview:
        return `${defaultReviewApiPath}/users/${userId}/${reviewId}`;
      default:
        console.error("💥💥💥 useReview : switchFetchPath의 switch 문에서 에러 발생 💥💥💥");
        return null;
    }
  };
  const fetchPath = getFetchPath();

  const {
    data: reviewData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["review"],
    queryFn: async (): Promise<ExtendReview[]> => {
      const response = await fetch(`${fetchPath}`);
      const data = await response.json();
      return data;
    },
    enabled: fetchPath !== null
  });

  return { reviewData, isLoading, isError };
};

export default useReview;
