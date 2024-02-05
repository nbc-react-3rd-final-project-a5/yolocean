import CustomButton from "@/components/CustomButton";
import InputImage from "@/components/InputImage";
import { useCustomMutation, useImageInput } from "@/hook";
import { createCarousel, deleteCarousel, updateCarousel } from "@/service/table/carousel";
import { usealertStore } from "@/store/alertStore";
import { Carousel } from "@/types/db";
import useStorage from "@/utils/useStorage";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  selectCarousel?: Carousel;
  isCreateMode: boolean;
}

const CarouselForm = ({ selectCarousel, isCreateMode }: Props) => {
  const { alertFire } = usealertStore();
  const { uploadImage } = useStorage();
  const { customImageList, isEnter, handler, addPreImage } = useImageInput(1);
  const { mutate: createMutation } = useCustomMutation({
    queryKey: ["manageCarousel"],
    mutationFn: (data) => createCarousel(data)
  });
  const { mutate: updateMutation } = useCustomMutation({
    queryKey: ["manageCarousel"],
    mutationFn: (carousel: Carousel) => updateCarousel(carousel)
  });
  const { mutate: deleteMutation } = useCustomMutation({
    queryKey: ["manageCarousel"],
    mutationFn: () => deleteCarousel(selectCarousel!.id)
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Carousel>();

  useEffect(() => {
    if (selectCarousel) {
      setValue("id", selectCarousel?.id);
      setValue("url", selectCarousel?.url);
      addPreImage([selectCarousel.img as string]);
    }
  }, [selectCarousel]);

  useEffect(() => {
    if (isCreateMode) {
      setValue("url", "");
      if (customImageList[0]) {
        setValue("id", customImageList[0].id);
      } else {
        setValue("id", "");
      }
    }
  }, [isCreateMode, customImageList[0]]);

  const handleCreateSubmit = async (data: Omit<Carousel, "url">) => {
    try {
      if (customImageList[0].file) {
        data.id = customImageList[0].id;
        data.img = await uploadImage(customImageList[0].file, "promotion", data.id, "carousel");
      }

      createMutation(data);
      console.log(data);
      return alertFire("Carousel 업로드 성공", "success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSubmit = async (data: Omit<Carousel, "url">) => {
    try {
      if (customImageList[0].file) {
        data.img = await uploadImage(customImageList[0].file, "promotion", data.id, "carousel");
      }
      console.log(data);
      updateMutation(data);
      return alertFire("Carousel 업로드 성공", "success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={isCreateMode ? handleSubmit(handleCreateSubmit) : handleSubmit(handleUpdateSubmit)}
      >
        <div>
          <label htmlFor="Carousel-id" className="block mb-2 font-semibold">
            Carousel ID
          </label>
          <input id="Carousel-id" disabled {...register("id")} className="w-full p-2" />
        </div>

        <div>
          <label htmlFor="Carousel_link" className="block mb-2 font-semibold">
            Carousel 링크
          </label>
          <input id="Carousel_link" {...register("url")} className="w-full  p-2" />
        </div>
        {isCreateMode && selectCarousel && (
          <div>
            <p className=" mb-2 font-semibold">이미지 주소</p>
            <Link href={selectCarousel.img as string} target="_blank" className="w-full  p-2 text-[0.8rem] text-point">
              {selectCarousel.img}
            </Link>
          </div>
        )}

        <div>
          <label htmlFor="Carousel_image" className="block mb-2 font-semibold">
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

export default CarouselForm;
