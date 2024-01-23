import React from "react";
import { supabase } from "@/service/supabase";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLogedInStore from "@/store/logedStore";
import Section from "@/components/layout/Section";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { SlArrowRight } from "react-icons/sl";
import { usealertStore } from "@/store/alertStore";

const linkList = [
  {
    name: "홈",
    url: "http://localhost:3000/"
  },
  {
    name: "로그인",
    url: "http://localhost:3000/auth"
  }
];

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
  const { alertFire } = usealertStore();

  //이메일 로그인
  const signInWithEmail = async (id: string, pw: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: id,
      password: pw
    });
    if (error) {
      alertFire("아이디와 비밀번호를 확인해주세요", "error");
    } else {
      setLogedIn(true);
      router.push("/");
      console.log(data);
    }
  };

  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValue>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<FormValue> = (inputData) => {
    signInWithEmail(inputData.id, inputData.pw);
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
      <PageBreadCrumb linkList={linkList} />

      <Section title={"로그인"} isCenter={true}>
        <div className="flex flex-col justify-center items-center ">
          <div className="w-[345px]">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[345px]">
              <div className="mb-[15px]">
                <label htmlFor="email" className="">
                  Email address
                  <span className="text-xs text-red-600">{errors?.id?.message}</span>
                </label>

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
                  placeholder="이메일"
                  className="block w-full h-[50px] border p-[15px]"
                />
              </div>

              <div>
                <label htmlFor="password" className="">
                  Password
                  <span className="text-xs text-red-600">{errors?.pw?.message}</span>
                </label>

                <input
                  id="password"
                  type="password"
                  {...register("pw", {
                    required: "   비밀번호를 입력하세요."
                  })}
                  placeholder="비밀번호"
                  className="block w-full h-[50px] border p-[15px]"
                />
              </div>

              <div className="text-point my-[20px] text-right">
                <Link href={"/auth/find"}>
                  {"아이디 / 비밀번호 찾기"}
                  <SlArrowRight className="inline-block mb-1 ml-[10px]" size={10} />
                </Link>
              </div>

              <div className="space-y-[10px] pb-[20px] border-b">
                <button type="submit" className="h-[50px] rounded-[5px] w-[100%] bg-point text-white">
                  login
                </button>

                <div className="grid grid-cols-2 gap-[10px] place-items-center">
                  <button type="button" onClick={signInWithKakao}>
                    <img src="/images/kakao_login.png" className="h-10 w-44" />
                  </button>

                  <button type="button" onClick={signInWithGoogle}>
                    <img src="/images/google_login.png" />
                  </button>
                </div>
              </div>
            </form>
            <button
              type="button"
              onClick={() => setMode(!mode)}
              className="h-[50px] rounded-[5px] w-[100%] mt-[20px] border"
            >
              회원가입 하기
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default SignIn;
