import React from "react";

interface IProps {
  params: { productId: string };
}

const page = ({ params: { productId } }: IProps) => {
  console.log(productId);
  return <div>page</div>;
};

export default page;
