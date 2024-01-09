import React, { useState } from "react";
import { supabase } from "@/service/supabase";
import { useForm } from "react-hook-form";

interface Props {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp = ({ mode, setMode }: Props) => {
  //이메일, 패스워드, 닉네임, 프로필 이미지 입력
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [name, setName] = useState<string>("");
  // const [img, setImg] = useState<string>("");

  //유효성 검사
  const emailValidChk = () => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    if (pattern.test(id) === false) {
      return false;
    } else {
      return true;
    }
  };
  const pwValid = pwCheck !== "" && pw === pwCheck ? true : false;
  const isValid = pwValid && emailValidChk() && pw.length > 5 && name !== "" ? false : true;

  //회원가입 함수
  async function signUpNewUser(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: id,
      password: pw,
      options: {
        data: {
          name: name,
          avatar_url: null
        }
      }
    });
    console.log(data || error);
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">회원가입</h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={signUpNewUser} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address{" "}
                {emailValidChk() ? (
                  <span>✅</span>
                ) : (
                  <span className="text-xs text-red-600"> 이메일 형식이 유효하지 않습니다.</span>
                )}
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => setId(e.target.value)}
                  placeholder="example@yolocean.com"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password{" "}
                  {pw.length < 6 ? (
                    <span className="text-xs text-red-600"> 6자리 이상 입력하세요</span>
                  ) : (
                    <span> ✅</span>
                  )}
                </label>
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="비밀번호를 입력하세요."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="pwConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                  Password 확인{" "}
                  {!pwValid ? (
                    <span className="text-xs text-red-600">비밀번호가 일치하지 않습니다.</span>
                  ) : (
                    <span>✅</span>
                  )}
                </label>
              </div>
              <div>
                <input
                  id="pwConfirm"
                  name="pwConfirm"
                  type="password"
                  required
                  onChange={(e) => setPwCheck(e.target.value)}
                  placeholder="비밀번호 재입력"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
              </div>
              <div>
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder="yolocean에서 사용할 이름을 입력하세요"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isValid}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
              >
                SignUp & Login
              </button>
            </div>
          </form>

          <div>
            <p
              onClick={() => setMode(!mode)}
              className="mt-10 text-center text-sm text-blue-700 hover:text-blue-500 cursor-pointer"
            >
              로그인 하기
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
