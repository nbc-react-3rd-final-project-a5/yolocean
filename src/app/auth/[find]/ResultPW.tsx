import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { secretbase } from "@/service/supabase";
import Section from "@/components/layout/Section";
import { usealertStore } from "@/store/alertStore";

interface Props {
  result: string;
  setFind: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValue {
  pw: string;
  pwCheck: string;
}

const ResultPW = ({ result, setFind }: Props) => {
  const router = useRouter();
  const { alertFire } = usealertStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError
  } = useForm<FormValue>({ mode: "onBlur" });

  //비밀번호 유효성 검사를 위해 pw 입력값 확인
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("pw");

  const onSubmit: SubmitHandler<FormValue> = async (inputData) => {
    const { data: user, error } = await secretbase.auth.admin.updateUserById(result, {
      password: inputData.pw
    });
    if (error) {
      alertFire("비밀번호 재설정 실패", "error");
    } else {
      alertFire("비밀번호 재설정 성공", "success");
      router.push("/auth");
    }
  };

  return (
    <>
      {result ? (
        <Section title={"비밀번호 재설정"} isCenter={true}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[15px]">
              <label htmlFor="password" className="block mb-2">
                Password
                <span className="inline-block ml-2 text-[12px] text-red-600">{errors?.pw?.message}</span>
              </label>

              <input
                id="password"
                type="password"
                {...register("pw", {
                  required: "비밀번호를 입력하세요.",
                  minLength: {
                    value: 6,
                    message: "6자리 이상 입력하세요."
                  }
                })}
                placeholder="비밀번호"
                className="block w-full h-[50px] border p-[15px]"
              />
            </div>

            <div className="mb-[20px]">
              <label htmlFor="pwConfirm" className="block mb-2">
                Password 확인
                <span className="inline-block ml-2 text-[12px] text-red-600">{errors?.pwCheck?.message}</span>
              </label>

              <input
                id="pwConfirm"
                type="password"
                {...register("pwCheck", {
                  required: true,
                  validate: (value) => (value === passwordRef.current ? true : "비밀번호가 일치하지 않습니다.")
                })}
                placeholder="비밀번호 확인"
                className="block w-full h-[50px] border p-[15px]"
              />
            </div>
            <button type="submit" className="h-[50px] rounded-[5px] w-[100%] bg-point text-white">
              비밀번호 재설정
            </button>
          </form>
        </Section>
      ) : (
        <div>
          <p className="mb-[40px] text-center text-[18px] font-semibold">입력한 정보를 다시 확인해주세요</p>
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

export default ResultPW;
