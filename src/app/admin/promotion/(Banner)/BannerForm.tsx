import CustomButton from "@/components/CustomButton";
import InputImage from "@/components/InputImage";
import { useCustomMutation, useImageInput } from "@/hook";
import { createBanner, deleteBanner, updateBanner } from "@/service/table/banner";
import { Banner } from "@/types/db";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  selectBanner?: Banner;
}

const BannerForm = ({ selectBanner }: Props) => {
  const { customImageList, isEnter, handler, addPreImage } = useImageInput(1);
  const { mutate: createMutation } = useCustomMutation({ queryKey: ["ManageBanner"], mutationFn: createBanner });
  const { mutate: updateMutation } = useCustomMutation({
    queryKey: ["ManageBanner"],
    mutationFn: (data) => updateBanner(selectBanner!.banner_name, data)
  });
  const { mutate: deleteMutation } = useCustomMutation({
    queryKey: ["ManageBanner"],
    mutationFn: () => deleteBanner(selectBanner!.banner_name)
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Omit<Banner, "url">>();

  useEffect(() => {
    if (selectBanner) {
      setValue("id", selectBanner?.id);
      setValue("banner_link", selectBanner?.banner_link);
      setValue("banner_name", selectBanner?.banner_name);
      addPreImage([selectBanner.banner_url]);
    }
  }, [selectBanner]);

  return (
    <>
      {selectBanner ? (
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="banner-id" className="block mb-2 font-semibold">
              배너 ID
            </label>
            <input id="banner-id" disabled {...register("id")} className="w-full p-2" />
          </div>

          <div>
            <label htmlFor="banner_name" className="block mb-2 font-semibold">
              배너 위치
            </label>
            <input id="banner_name" {...register("banner_name")} className="w-full  p-2" />
          </div>
          <div>
            <label htmlFor="banner_link" className="block mb-2 font-semibold">
              이동 링크
            </label>
            <input id="banner_link" {...register("banner_link")} className="w-full  p-2" />
          </div>
          <div>
            <label htmlFor="banner_image" className="block mb-2 font-semibold">
              이미지
            </label>

            <InputImage customImageList={customImageList} isEnter={isEnter} handler={handler} />
          </div>
          <div className="flex gap-4">
            <CustomButton type="submit">수정하기</CustomButton>
            <CustomButton color="red">삭제하기</CustomButton>
          </div>
        </form>
      ) : (
        <p>선택한 배너가 없습니다.</p>
      )}
    </>
  );
};

export default BannerForm;
