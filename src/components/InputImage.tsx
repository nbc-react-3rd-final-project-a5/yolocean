"use client";

import React from "react";
import InputImageView from "./InputImageView";
import { CustomImage } from "@/types/form";

interface Props {
  customImageList: CustomImage[];
  isEnter: boolean;
  handler: {
    handleAddImageChange: (e: React.ChangeEvent<HTMLInputElement>) => null;
    handleDeleteImageClick: (e: React.MouseEvent<HTMLImageElement, MouseEvent>, customImage: CustomImage) => void;
    handleDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
    handleDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
    handleDragEnter: (e: React.DragEvent<HTMLLabelElement>) => void;
    handleDragLeave: (e: React.DragEvent<HTMLLabelElement>) => void;
  };
}

const InputImage = ({ customImageList, isEnter, handler }: Props) => {
  const activeColor = isEnter && "border-red-500";
  return (
    <label
      htmlFor="input__image"
      className={`block w-full border-[1px] border-[#E5E5E5] ${activeColor} p-[15px] hover:cursor-pointer`}
      onDrop={handler.handleDrop}
      onDragOver={handler.handleDragOver}
      onDragEnter={handler.handleDragEnter}
      onDragLeave={handler.handleDragLeave}
    >
      <div className="tracking-[-0.48px] leading-6 text-[#595959]">
        <p>
          <b>드래그 앤 드롭</b> 또는 <b>클릭</b>하여 업로드해주세요.
          <br />
          최대 <b>10mb 이하 jpeg, png, webp</b> 첨부 가능
          <br />
          <b>사진 삭제</b>를 원하시면 이미지를 <b>클릭</b>해 주세요.
        </p>
      </div>

      <hr className={`my-[15px] ${activeColor}`} />

      <InputImageView customImageList={customImageList} handleDeleteImageClick={handler.handleDeleteImageClick} />

      <input
        type="file"
        name="input__image"
        id="input__image"
        onChange={handler.handleAddImageChange}
        multiple
        className="hidden"
      />
    </label>
  );
};

export default InputImage;
