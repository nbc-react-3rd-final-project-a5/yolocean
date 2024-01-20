import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  result: string | boolean;
  setFind: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultID = ({ result, setFind, setMode }: Props) => {
  const router = useRouter();

  return (
    <>
      {result ? (
        <div>
          <p className="mb-[40px] text-center text-[18px] font-semibold">아이디 찾기가 완료되었습니다.</p>

          <p className="px-[15px] py-[25px] mb-[20px] text-[16px] font-normal border">{result}</p>

          <div className="flex justify-center space-x-[9px]">
            <button
              onClick={() => router.push("/auth")}
              className="w-[168px] h-[50px] rounded-[5px] bg-point text-white"
            >
              로그인
            </button>
            <button
              onClick={() => setMode(false)}
              className="w-[168px] h-[50px] rounded-[5px] text-point border border-point"
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-[40px] text-center text-[18px] font-semibold">고객님 명의로 찾은 아이디가 없습니다.</p>
          <div className="flex justify-center space-x-[9px]">
            <button onClick={() => setFind(false)} className="w-[168px] h-[50px] rounded-[5px] bg-point text-white">
              다시 찾기
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-[168px] h-[50px] rounded-[5px] text-point border border-point"
            >
              홈으로 이동
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultID;
