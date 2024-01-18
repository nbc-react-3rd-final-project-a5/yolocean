import { ExtendReview } from "@/types/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  userId?: string;
  reviewId?: string;
  productId?: string;
}

interface UpdateReview {
  user_id: string;
  title: string;
  content: string;
  url: string[];
}

enum FetchCase {
  Error,
  AllReviewList,
  UserReviewList,
  UserReview,
  ProductReviewList
}

const useReview = ({ userId, reviewId, productId }: Props = {}) => {
  const queryClient = useQueryClient();
  let fetchCase: FetchCase;

  if (!userId && !reviewId && !productId) {
    fetchCase = FetchCase.AllReviewList;
  } else if (userId && reviewId && !productId) {
    fetchCase = FetchCase.UserReview;
  } else if (userId && !reviewId && !productId) {
    fetchCase = FetchCase.UserReviewList;
  } else if (!userId && !reviewId && productId) {
    fetchCase = FetchCase.ProductReviewList;
  } else {
    fetchCase = FetchCase.Error;
  }

  const getFetchPath = () => {
    if (typeof window === "undefined") return null;
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
      case FetchCase.ProductReviewList:
        return `${window.location.origin}/api/review/products/${productId}`;
      default:
        console.error("💥💥💥 useReview : switchFetchPath의 switch 문에서 에러 발생 💥💥💥");
        return null;
    }
  };
  const fetchPath = getFetchPath();

  //
  const getReview = async () => {
    const res = await fetch(`${fetchPath}`);
    const data = await res.json();
    return data;
  };

  const patchReview = async (formData: UpdateReview) => {
    const res = await fetch(`${fetchPath}`, {
      method: "PATCH",
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    return data;
  };

  const deleteReview = async () => {
    const res = await fetch(`${fetchPath}`, {
      method: "DELETE"
    });
    const data = await res.json();
    return data;
  };

  const {
    data: reviewData,
    isLoading,
    isError
  } = useQuery<ExtendReview[]>({
    queryKey: ["review"],
    queryFn: getReview,
    enabled: fetchPath !== null
  });

  const updateReviewMutation = useMutation({
    mutationFn: patchReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["review"] })
  });

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["review"] })
  });

  return { reviewData, isLoading, isError, updateReviewMutation, deleteReviewMutation };
};

export default useReview;
