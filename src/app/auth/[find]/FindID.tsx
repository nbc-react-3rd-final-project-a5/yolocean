import React, { useState } from "react";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/service/supabase";
import ResultID from "./ResultID";
import { createCertification } from "@/lib/portone";

interface Props {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValue {
  name: string;
  phone: string;
}

const linkList = [
  {
    name: "홈",
    url: "https://yolocean.store/"
  },
  {
    name: "로그인",
    url: "https://yolocean.store/auth"
  },
  {
    name: "아이디 찾기",
    url: "https://yolocean.store/auth/find"
  }
];

const FindID = ({ setMode }: Props) => {
  //찾기
  const [find, setFind] = useState(false);
  //찾기 결과
  const [result, setResult] = useState<boolean | string>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    clearErrors
  } = useForm<FormValue>({ mode: "onBlur" });

  // 본인 인증 전 아이디 찾기 버튼 disable 을 위해 존재하는 state
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  // 본인인증 전화번호 확인 이벤트 핸들러
  const handleCertificateClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const snapshotPhoneNumber = watch("phone");
    const { isPass, msg } = await createCertification(snapshotPhoneNumber);
    if (!isPass) {
      setError("phone", { type: "custom", message: msg });
    } else {
      clearErrors("phone");
    }
    setIsValidPhoneNumber(isPass);
  };

  const onSubmit: SubmitHandler<FormValue> = async (inputData) => {
    //아이디 찾기 버튼 눌렀을 때
    setFind(true);
    const { data, error } = await supabase
      .from("userinfo")
      .select("email")
      .match({ username: inputData.name, phone: inputData.phone });
    if (error) {
      window.confirm("supabase error");
    } else {
      setResult(data[0]?.email || false);
    }
  };
  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <div className="flex justify-center items-center space-x-[40px] text-center text-[25px] font-semibold mb-[80px] ">
        <h1>아이디 찾기</h1>
        <p onClick={() => setMode(false)} className="text-tc-light cursor-pointer">
          비밀번호 찾기
        </p>
      </div>

      <div className="flex flex-col justify-center items-center ">
        <div className="w-[345px]">
          {!find ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-[15px]">
                <label htmlFor="email" className="block mb-2">
                  Username
                  <span className="inline-block ml-2 text-[12px] text-red-600">{errors?.name?.message}</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "이름을 입력하세요."
                  })}
                  placeholder="이름"
                  className="block w-full h-[50px] border p-[15px]"
                />
              </div>

              <div className="mb-[20px]">
                <label htmlFor="phone" className="block mb-2">
                  Phone Number
                  <span className="inline-block ml-2 text-[12px]  text-red-600">{errors?.phone?.message}</span>
                </label>
                <div className="grid grid-cols-5 w-full  border">
                  <input
                    id="phone"
                    type="phone"
                    placeholder="휴대폰번호 11자리"
                    {...register("phone", {
                      required: "휴대폰번호를 입력하세요",
                      pattern: {
                        value: /^010[0-9]{8}$/,
                        message: "휴대폰번호 형식이 유효하지 않습니다."
                      }
                    })}
                    className="block col-span-4 h-[50px] p-[15px]"
                  />
                  <button
                    disabled={!/^(010[0-9]{8})$/.test(watch("phone"))}
                    className="border-l h-[50px] text-tc-middle font-normal disabled:bg-line disabled:text-tc-light"
                    onClick={handleCertificateClick}
                  >
                    인증하기
                  </button>
                </div>
              </div>
              <button
                disabled={!(isValid && isValidPhoneNumber)}
                type="submit"
                className="h-[50px] rounded-[5px] w-[100%] bg-point text-white  disabled:bg-line disabled:text-tc-light"
              >
                아이디 찾기
              </button>
            </form>
          ) : (
            <ResultID result={result} setFind={setFind} setMode={setMode} />
          )}
        </div>
      </div>
    </>
  );
};

export default FindID;
