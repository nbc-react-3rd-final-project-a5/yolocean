import React from "react";
import QnaForm from "./(form)/QnaForm";
import ReviewForm from "./(form)/ReviewForm";
import { ExtendQna, ExtendReview } from "@/types/db";

interface Props {
  formtype: string | undefined;
  productId: string;
  reivewData: ExtendReview;
  qnaData: ExtendQna;
  storeId: string;
}

const FormSwitch = ({ formtype, productId, reivewData, qnaData, storeId }: Props) => {
  return (
    <>
      {formtype === "review" ? (
        <ReviewForm productId={productId} reviewData={reivewData} storeId={storeId} />
      ) : (
        <QnaForm productId={productId} qnaData={qnaData} />
      )}
    </>
  );
};

export default FormSwitch;
