"use client";

import { useImageInput } from "@/legacyHook";
import useStorage from "@/utils/useStorage";
import React, { useRef, useState } from "react";

const DragAndDropImageBox = () => {
  const imageWrap = useRef(null);
  const [isEnter, setIsEnter] = useState(false);
  const { customImage, handler, addPreImage, customImageList, isEnter: inputEnter } = useImageInput("multiple");
  const { uploadMultipleImages } = useStorage();

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    handler.handleDrop(e);
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

  // const onDragStartImage = (e: React.DragEvent<HTMLDivElement>) => {
  //   console.log("이미지 드래그");
  //   // console.log(e.target);
  // };

  // const onDragEndImage = (e: React.DragEvent<HTMLDivElement>) => {
  //   console.log("이미지 드래그 종료");
  //   console.log(e.dataTransfer.dropEffect);
  // };

  // const onDropImage = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

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
          onChange={handler.handleAddImageChange}
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

      <div className="flex gap-4 min-h-[100px] border-2 border-yellow-500" ref={imageWrap}>
        {customImageList?.map((n, i) => {
          return (
            <div
              key={i}
              // onDragStart={onDragStartImage}
              // onDragEnd={onDragEndImage}
              // onDrop={onDropImage}
              draggable="true"
              className=""
            >
              <img
                src={n.previewURL}
                alt=""
                className="w-[100px] h-[100px]"
                onClick={(e) => handler.handleDeleteImageClick(e, n)}
              />
            </div>
          );
        })}
      </div>
      <div>
        {/* <button onClick={() => uploadMultipleImages("product", ["pi1", "pi2"], "productName1")}>업로드</button> */}
      </div>
    </div>
  );
};

export default DragAndDropImageBox;
