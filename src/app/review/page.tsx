import ReviewForm from "@/components/form/ReviewForm";
import React from "react";

const page = () => {
  return (
    <div className="p-4 border-2 border-black">
      <ReviewForm
        bucket="review"
        userId="3255837d-277c-4e5d-9e52-6956be86f182"
        productId="17f56560-5065-4dd4-b32a-4e99a9b6c00c"
        isReview={true}
      />
    </div>
  );
};

export default page;
