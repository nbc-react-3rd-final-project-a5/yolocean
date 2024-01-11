import React from "react";
import { supabase } from "@/service/supabase";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import useLogedInStore from "@/store/logedStore";

interface Props {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValue {
  id: string;
  pw: string;
}

const SignIn = ({ mode, setMode }: Props) => {
  const router = useRouter();
  const { setLogedIn } = useLogedInStore();

  //이메일 로그인
  const signInWithEmail = async (id: string, pw: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: id,
      password: pw
    });
    console.log(data || error);
  };

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValue>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<FormValue> = (inputData) => {
    signInWithEmail(inputData.id, inputData.pw);
    setLogedIn(true);
    router.push("/");
  };

  //카카오 로그인
  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao"
    });
    console.log(data || error);
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

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">로그인</h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
                <span className="text-xs text-red-600">{errors?.id?.message}</span>
              </label>
              <div>
                <input
                  id="email"
                  type="email"
                  {...register("id", {
                    required: "   이메일을 입력하세요.",
                    pattern: {
                      value: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/,
                      message: "   이메일 형식이 유효하지 않습니다."
                    }
                  })}
                  placeholder="example@yolocean.com"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                  <span className="text-xs text-red-600">{errors?.pw?.message}</span>
                </label>
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  {...register("pw", {
                    required: "   비밀번호를 입력하세요."
                  })}
                  placeholder="비밀번호를 입력하세요."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
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
        </div>
      </div>
    </>
  );
};

export default SignIn;
