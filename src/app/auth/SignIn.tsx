import React, { useState } from "react";
import { supabase } from "@/service/supabase";

interface Props {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ mode, setMode }: Props) => {
  //로그인 확인
  async function getUser() {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
  }

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  //유효성 검사
  const emailValidChk = () => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    if (pattern.test(id) === false) {
      return false;
    } else {
      return true;
    }
  };
  const isValid = emailValidChk() && pw.length > 5 ? false : true;

  //이메일 로그인
  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: id,
      password: pw
    });
    console.log(data || error);
  };

  //카카오 로그인
  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao"
    });
    if (data) alert("성공");
    if (error) alert("error");
  }

  //구글 로그인
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        }
      }
    });
    console.log(data || error);
  }

  //로그아웃
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">로그인 </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="">
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
                  Password
                </label>
              </div>
              <div className="">
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
              <button
                onClick={signInWithEmail}
                type="submit"
                disabled={isValid}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
              >
                login
              </button>
              <br />
              <div className="grid grid-cols-2 gap-4 place-items-center">
                <button type="button" onClick={signInWithKakao}>
                  <img src="/images/kakao_login.png" className="h-10 w-44" />
                </button>

                <button type="button" onClick={signInWithGoogle}>
                  <img src="/images/google_login.png" />
                </button>
              </div>
            </div>
          </form>

          <p
            onClick={() => setMode(!mode)}
            className="mt-10 text-center text-sm text-blue-700 hover:text-blue-500 cursor-pointer"
          >
            회원가입 하기
          </p>
          <button onClick={signOut}>임시로그아웃</button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
