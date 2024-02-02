import React from "react";
import { AdminReview } from "@/types/db";
import Image from "next/image";
import dayjs from "dayjs";
import CustomButton from "@/components/CustomButton";
import { createFixedReview, deleteFixedReview, updateBlindReview } from "@/service/table";
import { useCustomMutation } from "@/hook";

interface Props {
  review: AdminReview;
  cate: string;
}

const ReviewItem = ({ review, cate }: Props) => {
  const { product, userinfo, store, title, content, url: ReviewImgList, fixed_review, blind } = review;
  const date = dayjs(review.created_at);
  const fixed = fixed_review?.id ?? false;

  const { mutate: deleteFixedMutate } = useCustomMutation({
    mutationFn: async () => deleteFixedReview({ reviewId: review.id }),
    queryKey: ["review"]
  });
  const { mutate: createFixedMutate } = useCustomMutation({
    mutationFn: async () => createFixedReview({ reviewId: review.id, body: JSON.stringify({ id: review.id }) }),
    queryKey: ["review"]
  });
  const { mutate: updateBlindMutate } = useCustomMutation({
    mutationFn: async (blind: boolean) => updateBlindReview({ reviewId: review.id, body: JSON.stringify(blind) }),
    queryKey: ["review"]
  });

  return (
    <>
      {cate === "no_category" || cate === product.category_id ? (
        <div className="border rounded-[5px] p-[20px] space-y-[10px] min-w-[800px]">
          <div className="mb-[15px]">
            <div className="flex justify-between mb-[10px] pb-[10px] border-b">
              <div className="flex flex-row space-x-[10px]">
                <Image src={product.thumbnail} width={50} height={50} alt="상품이미지" />
                <p className="py-[16px]">{product.name}</p>
              </div>
              <p className="py-[16px]">{store.name}</p>
            </div>

            <div className="flex flex-row justify-between mb-[15px]">
              <p>{userinfo.username}</p>
              <p>작성일: {date.format("YYYY-MM-DD")}</p>
            </div>

            <div className="space-y-[10px] p-[5px]">
              <p className="font-semibold text-[18px]">{title}</p>
              <p>{content}</p>
              <div className="flex flex-row">
                {ReviewImgList &&
                  ReviewImgList.map((img, idx) => (
                    <Image src={img} width={100} height={100} alt="리뷰 이미지" key={idx} />
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-[5px]">
            {fixed ? (
              <CustomButton size="sm" className="bg-tc-light border-tc-light" onClick={() => deleteFixedMutate({})}>
                고정 해제하기
              </CustomButton>
            ) : (
              <CustomButton size="sm" onClick={() => createFixedMutate({})}>
                리뷰 고정하기
              </CustomButton>
            )}
            {!blind ? (
              <CustomButton size="sm" onClick={() => updateBlindMutate(true)}>
                리뷰 블라인드
              </CustomButton>
            ) : (
              <CustomButton size="sm" className="bg-tc-light border-tc-light" onClick={() => updateBlindMutate(false)}>
                블라인드 해제
              </CustomButton>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ReviewItem;
