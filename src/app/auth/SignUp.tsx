import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import Section from "@/components/layout/Section";
import { createCertification, vaildateMobileCertification } from "@/lib/portone";
import { usealertStore } from "@/store/alertStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useAuthStore } from "@/store/authStore";

const linkList = [
  {
    name: "홈",
    url: "https://yolocean.store/"
  },
  {
    name: "회원가입",
    url: "https://yolocean.store/auth"
  }
];

interface Props {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValue {
  id: string;
  pw: string;
  pwCheck: string;
  name: string;
  phone: string;
  agree: boolean;
}

const SignUp = ({ mode, setMode }: Props) => {
  const router = useRouter();
  const supabaseAuth = createClientComponentClient<Database>();

  const { alertFire } = usealertStore();
  const { setAuth } = useAuthStore();

  //회원가입 함수
  async function signUpNewUser(id: string, pw: string, name: string, phone: string) {
    const { data, error } = await supabaseAuth.auth.signUp({
      email: id,
      password: pw,
      options: {
        data: {
          name: name,
          avatar_url: null,
          phone: phone
        },
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    });
    if (error) {
      alertFire("회원가입 실패", "error");
    } else {
      setAuth(data.user?.id ?? "");
      router.push("/");
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    clearErrors,
    getValues,
    setValue,
    setFocus
  } = useForm<FormValue>({ mode: "onChange" });

  //비밀번호 유효성 검사를 위해 pw 입력값 확인
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("pw");

  // 모바일에서 회원가입 진행시 리다이렉션 searchParams
  const searchParams = useSearchParams();
  const imp_uid = searchParams.get("imp_uid");
  const success = searchParams.get("success");
  const merchant_uid = searchParams.get("merchant_uid");

  const onSubmit: SubmitHandler<FormValue> = async (inputData) => {
    // searchParams가 있을 시 모바일로 간주하고 URL 조작여부가 있을 수도 있기에 검증하는 과정
    if (imp_uid || success || merchant_uid) {
      const snapshotPhoneNumber = watch("phone");
      const vaildationUrl = await vaildateMobileCertification(window.location.href, snapshotPhoneNumber);
      if (!vaildationUrl) alertFire("회원가입 실패", "error");
    }

    signUpNewUser(inputData.id, inputData.pw, inputData.name, inputData.phone);
  };

  // 회원가입버튼 disable 을 위해 존재하는 state
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  // 본인인증 전화번호 확인 이벤트 핸들러
  const handleCertificateClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFormSessionStorage();
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

  const setFormSessionStorage = () => {
    const formData = getValues();
    sessionStorage.setItem("yoloceanSignUp", JSON.stringify(formData));
  };

  useEffect(() => {
    const sessionStorageFormData = sessionStorage.getItem("yoloceanSignUp");

    if (imp_uid && success && merchant_uid && sessionStorageFormData) {
      const formData: FormValue = JSON.parse(sessionStorageFormData);
      const formKeys: (keyof FormValue)[] = ["id", "name", "phone", "pw", "pwCheck"];
      formKeys.map((key) => setValue(key, formData[key]));

      if (!JSON.parse(success)) {
        setError("phone", { type: "custom", message: "본인인증에 실패하였습니다." });
      }
      setIsValidPhoneNumber(JSON.parse(success));
      setFocus("agree");

      return sessionStorage.removeItem("yoloceanSignUp");
    }
  }, [setValue, searchParams, imp_uid, merchant_uid, success, setError, setFocus]);

  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <Section title={"회원가입"} isCenter={true}>
        <div className="flex flex-col justify-center items-center ">
          <div className="w-[345px]">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[345px] space-y-[15px]">
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email address
                  <span className="inline-block ml-2 text-[12px]  text-red-600">{errors?.id?.message}</span>
                </label>

                <input
                  id="email"
                  type="email"
                  {...register("id", {
                    required: "이메일을 입력하세요.",
                    pattern: {
                      value: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/,
                      message: "이메일 형식이 유효하지 않습니다."
                    }
                  })}
                  placeholder="이메일"
                  className="block w-full h-[50px] border p-[15px]"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2">
                  Password
                  <span className="inline-block ml-2 text-[12px]  text-red-600">{errors?.pw?.message}</span>
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

              <div>
                <label htmlFor="pwConfirm" className="block mb-2">
                  Password 확인{" "}
                  <span className="inline-block ml-2 text-[12px]  text-red-600">{errors?.pwCheck?.message}</span>
                </label>

                <input
                  id="pwConfirm"
                  type="password"
                  {...register("pwCheck", {
                    required: true,
                    validate: (value) => (value === passwordRef.current ? true : "   비밀번호가 일치하지 않습니다.")
                  })}
                  placeholder="비밀번호 확인"
                  className="block w-full h-[50px] border p-[15px]"
                />
              </div>

              <div>
                <label htmlFor="name" className="block mb-2">
                  Username
                  <span className="inline-block ml-2 text-[12px]  text-red-600">{errors?.name?.message}</span>
                </label>

                <input
                  id="name"
                  type="name"
                  placeholder="이름"
                  {...register("name", {
                    required: "이름을 입력하세요",
                    maxLength: {
                      value: 10,
                      message: "10자리 이하로 입력하세요."
                    }
                  })}
                  className="block w-full h-[50px] border p-[15px]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2">
                  Phone Number
                  <span className="inline-block ml-2 text-[12px]  text-red-600">{errors?.phone?.message}</span>
                </label>

                <div className="grid grid-cols-5 w-full  border">
                  <input
                    id="phone"
                    type="phone"
                    placeholder="휴대폰번호 11자리"
                    disabled={isValidPhoneNumber}
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
                    disabled={!/^(010[0-9]{8})$/.test(watch("phone")) || isValidPhoneNumber}
                    className="border-l h-[50px] text-tc-middle font-normal disabled:bg-line disabled:text-tc-light"
                    onClick={handleCertificateClick}
                  >
                    인증하기
                  </button>
                </div>
              </div>

              <div className="py-[5px] flex items-center">
                <input
                  id="agree"
                  type="checkbox"
                  required
                  {...register("agree", {
                    required: true
                  })}
                  className="w-5 h-5 mr-[10px]"
                />
                <label htmlFor="agree" className="text-tc-middle">
                  전체 동의 (필수)
                </label>
              </div>

              <button
                disabled={!(isValid && isValidPhoneNumber)}
                type="submit"
                className="h-[50px] rounded-[5px] w-[100%] bg-point text-white  disabled:bg-line disabled:text-tc-light"
              >
                SignUp & Login
              </button>
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
      </Section>
    </>
  );
};

export default SignUp;
