import React from "react";
import AdminReview from "./AdminReview";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const AdminReviewPage = ({ searchParams }: Props) => {
  return (
    <>
      <AdminReview searchParams={searchParams} />
    </>
  );
};

export default AdminReviewPage;
