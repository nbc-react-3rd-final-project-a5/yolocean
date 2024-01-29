import React from "react";

const Empty = ({ articleName }: { articleName: string }) => {
  return <div className="mt-[40px] font-[600] text-[18px] text-center">작성된 {articleName}가 없습니다 😅</div>;
};

export default Empty;
