import React, { useRef } from "react";
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
  pwCheck: string;
  name: string;
}

const SignUp = ({ mode, setMode }: Props) => {
  const router = useRouter();
  const { setLogedIn } = useLogedInStore();

  //회원가입 함수
  async function signUpNewUser(id: string, pw: string, name: string) {
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

  const onSubmit: SubmitHandler<FormValue> = (inputData) => {
    signUpNewUser(inputData.id, inputData.pw, inputData.name);
    setLogedIn(true);
    router.push("/");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">회원가입</h2>
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
                    required: "   비밀번호를 입력하세요.",
                    minLength: {
                      value: 6,
                      message: "   6자리 이상 입력하세요."
                    }
                  })}
                  placeholder="비밀번호를 입력하세요."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="pwConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                  Password 확인 <span className="text-xs text-red-600">{errors?.pwCheck?.message}</span>
                </label>
              </div>
              <div>
                <input
                  id="pwConfirm"
                  type="password"
                  {...register("pwCheck", {
                    required: true,
                    validate: (value) => (value === passwordRef.current ? true : "   비밀번호가 일치하지 않습니다.")
                  })}
                  placeholder="비밀번호 확인"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                  <span className="text-xs text-red-600">{errors?.name?.message}</span>
                </label>
              </div>
              <div>
                <input
                  id="name"
                  type="name"
                  placeholder="yolocean에서 사용할 이름을 입력하세요"
                  {...register("name", {
                    required: "   이름을 입력하세요"
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                // disabled={isValid}
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
