import React, { useState } from "react";
import { supabase } from "@/service/supabase";

interface Props {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ mode, setMode }: Props) => {
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
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h2>로그인 </h2>
          </div>

          <div>
            <form>
              <div>
                <label htmlFor="email">Email address</label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={(e) => setId(e.target.value)}
                    placeholder="example@yolocean.com"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="비밀번호를 입력하세요."
                  />
                </div>
              </div>

              <div>
                <button onClick={signInWithEmail} type="submit" disabled={isValid}>
                  login
                </button>
                <br />
                <button type="button">카카오로그인</button>
                <br />

                <button type="button">구글로그인</button>
              </div>
            </form>

            <div>
              <p onClick={() => setMode(!mode)}>회원가입 하기</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
