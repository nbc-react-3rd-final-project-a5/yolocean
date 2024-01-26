import React from "react";

const Empty = ({ articleName }: { articleName: string }) => {
  return <div>😫 {articleName}가 없습니다</div>;
};

export default Empty;
