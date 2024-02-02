import CustomButton from "@/components/CustomButton";
import InputImage from "@/components/InputImage";
import { useCustomMutation, useImageInput } from "@/hook";
import { createBanner, deleteBanner, updateBanner } from "@/service/table/banner";
import { usealertStore } from "@/store/alertStore";
import { Banner } from "@/types/db";
import useStorage from "@/utils/useStorage";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface Props {
  selectBanner?: Banner;
  isCreateMode: boolean;
}

const BannerForm = ({ selectBanner, isCreateMode }: Props) => {
  const { alertFire } = usealertStore();
  const { uploadImage } = useStorage();
  const { customImageList, isEnter, handler, addPreImage } = useImageInput(1);
  const { mutate: createMutation } = useCustomMutation({
    queryKey: ["ManageBanner"],
    mutationFn: (data) => createBanner(data)
  });
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

  useEffect(() => {
    if (isCreateMode) {
      setValue("id", "");
      setValue("banner_link", "");
      setValue("banner_name", "");
    }
  }, [isCreateMode]);

  useEffect(() => {
    if (customImageList[0]) {
      setValue("id", customImageList[0].id);
    } else {
      setValue("id", "");
    }
  }, [customImageList[0]]);

  const handleCreateSubmit = async (data: Omit<Banner, "url">) => {
    const storagePath = `promotion/banner`;

    try {
      if (customImageList[0].file) {
        data.id = customImageList[0].id;
        data.banner_url = await uploadImage(customImageList[0].file, "promotion", data.id, storagePath);
      }

      createMutation(data);
      return alertFire("배너 업로드 성공", "success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateSubmit)}>
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
        {isCreateMode && selectBanner && (
          <div>
            <p className=" mb-2 font-semibold">이미지 주소</p>
            <Link href={selectBanner.banner_url} target="_blank" className="w-full  p-2 text-[0.8rem] text-point">
              {selectBanner.banner_url}
            </Link>
          </div>
        )}

        <div>
          <label htmlFor="banner_image" className="block mb-2 font-semibold">
            이미지
          </label>
          <InputImage customImageList={customImageList} isEnter={isEnter} handler={handler} />
        </div>
        <div className="flex gap-4">
          <CustomButton type="submit">수정하기</CustomButton>
          <CustomButton type="button" color="red">
            삭제하기
          </CustomButton>
        </div>
      </form>
    </>
  );
};

export default BannerForm;
