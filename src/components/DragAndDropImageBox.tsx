"use client";

import useImageFile from "@/hooks/useImageFile";
import React, { useState } from "react";

const DragAndDropImageBox = () => {
  const [isEnter, setIsEnter] = useState(false);
  const { imageFiles, onChangeImageFiles, OnDropFiles, onClickDeleteImage } = useImageFile();

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    OnDropFiles(e);
    setIsEnter(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    setIsEnter(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    const relatedTarget = e.relatedTarget;
    if (e.currentTarget.contains(relatedTarget as Node)) return;
    setIsEnter(false);
  };

  return (
    <div>
      <label
        htmlFor="input__image"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        className="block w-full h-[100px] border-2 border-yellow-500"
      >
        <input
          type="file"
          name="input__image"
          id="input__image"
          onChange={onChangeImageFiles}
          multiple
          className="hidden"
        />
        <div className={`${isEnter ? "bg-red-300" : "bg-yellow-300"}  h-[80px]`}>
          <p>
            <b>드래그 앤 드롭</b> 또는 <b>클릭</b>하여 업로드해주세요.
          </p>
          <p>
            최대 <b>10mb 이하</b> <b>jpeg, png, webp</b> 첨부 가능
          </p>
        </div>
      </label>

      <div className="flex">
        {imageFiles?.map((n, i) => {
          return (
            <img src={n.url} alt="" key={i} className="w-[100px] h-[100px]" onClick={(e) => onClickDeleteImage(e, n)} />
          );
        })}
      </div>
    </div>
  );
};

export default DragAndDropImageBox;
