import React from "react";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { useForm, SubmitHandler } from "react-hook-form";

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
    url: "http://localhost:3000/"
  },
  {
    name: "로그인",
    url: "http://localhost:3000/auth"
  },
  {
    name: "아이디 찾기",
    url: "http://localhost:3000/auth/find"
  }
];

const FindID = ({ setMode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValue>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<FormValue> = (inputData) => {
    //아이디 찾기 버튼 눌렀을 때
    console.log(inputData);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[15px]">
              <label htmlFor="email" className="">
                Username
                <span className="text-xs text-red-600">{errors?.name?.message}</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "   이름을 입력하세요."
                })}
                placeholder="이름"
                className="block w-full h-[50px] border p-[15px]"
              />
            </div>

            <div className="mb-[20px]">
              <label htmlFor="phone" className="">
                Phone Number
                <span className="text-xs text-red-600">{errors?.phone?.message}</span>
              </label>
              <div className="grid grid-cols-5 w-full  border">
                <input
                  id="phone"
                  type="phone"
                  placeholder="휴대폰번호"
                  {...register("phone", {
                    required: "   휴대폰번호를 입력하세요"
                  })}
                  className="block col-span-4 h-[50px] p-[15px]"
                />
                <button className="border-l h-[50px] text-tc-middle font-normal">인증하기</button>
              </div>
            </div>
            <button type="submit" className="h-[50px] rounded-[5px] w-[100%] bg-point text-white">
              아이디 찾기
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FindID;
