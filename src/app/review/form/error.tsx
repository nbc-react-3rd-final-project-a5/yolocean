"use client";

import { useEffect } from "react";

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>에러발생</p>
      <p>상품코드를 다시 확인해주세요</p>
      <button className="p-4 bg-red-200" onClick={() => reset()}>
        다시 시도하기
      </button>
    </div>
  );
};

export default ErrorPage;
