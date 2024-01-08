import React, { useState } from "react";
import { supabase } from "@/service/supabase";

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
      <div>
        <div>
          <div>
            <h2>회원가입</h2>
          </div>

          <div>
            <form onSubmit={signUpNewUser}>
              <div>
                <label htmlFor="email">
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
                    placeholder="  example@clione.com"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="password">
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
                    placeholder="  비밀번호를 입력하세요."
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="pwConfirm">
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
                    placeholder="  비밀번호 재입력"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="name">Username</label>
                </div>
                <div>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder="  clione에서 사용할 이름을 입력하세요"
                  />
                </div>
              </div>

              <div>
                <button type="submit" disabled={isValid}>
                  SignUp & Login
                </button>
              </div>
            </form>

            <div>
              <p onClick={() => setMode(!mode)}>로그인 하기</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
