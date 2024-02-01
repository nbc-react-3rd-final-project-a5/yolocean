import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomImage } from "@/types/form";
import { usealertStore } from "@/store/alertStore";
import { validateCount, validateFileSize, validateFileType } from "@/utils/vaildateImage";

/**
 * customImageList에 추가시킬 데이터를 만드는 함수
 * @param imageFile imageState에 추가시킬 이미지 파일
 * @returns CustomImage 타입의 데이터
 */
const createCustomImage = (imageFile: File) => {
  const newCustomImage: CustomImage = {
    file: imageFile,
    previewURL: URL.createObjectURL(imageFile),
    id: uuidv4()
  };
  return newCustomImage;
};

export const useImageInput = (limitCount: number = 1) => {
  const [customImageList, setCustomImageList] = useState<CustomImage[]>([]);
  const [isEnter, setIsEnter] = useState(false);
  const { alertFire } = usealertStore();

  /**
   * DB에서 가져온 데이터의 이미지를 state에 추가하는 함수
   * @param urlList 이미지 URL
   */
  const addPreImage = (urlList: string[]) => {
    const storageImageList = urlList.map((url) => {
      const imageId = url.split("/").reverse()[0];
      return {
        file: null,
        previewURL: url,
        id: imageId
      };
    });
    setCustomImageList((pre) => [...pre, ...storageImageList]);
  };

  /**
   * 선택한 이미지를 state 에 추가하는 함수
   * limitCount 가 1일 경우 state를 새로운 이미지로 변경
   * limitCount 가 1이 아닐 경우 state를 새로운 이미지로 변경 X
   * @param e onChange 이벤트
   */
  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = e.target.files;
    let stateLenght = customImageList.length;
    if (!currentFiles) return;

    if (limitCount === 1) {
      const validateFileSizeResult = validateFileSize(currentFiles[0], 10);
      const validateFileTypeResult = validateFileType(currentFiles[0]);
      if (!validateFileSizeResult.isPass) {
        alertFire(validateFileSizeResult.msg, "error");
      } else if (!validateFileTypeResult.isPass) {
        alertFire(validateFileTypeResult.msg, "error");
      } else {
        const newImageFile = createCustomImage(currentFiles[0]);
        setCustomImageList([newImageFile]);
      }
    }

    if (limitCount > 1) {
      for (let i = 0; i < currentFiles.length; i++) {
        const validateFileSizeResult = validateFileSize(currentFiles[i], 10);
        const validateFileTypeResult = validateFileType(currentFiles[i]);
        const validateCountResult = validateCount(stateLenght, limitCount);

        if (!validateFileSizeResult.isPass) {
          alertFire(validateFileSizeResult.msg, "error");
          break;
        } else if (!validateFileTypeResult.isPass) {
          alertFire(validateFileTypeResult.msg, "error");
          break;
        } else if (!validateCountResult.isPass) {
          alertFire(validateCountResult.msg, "error");
          break;
        } else {
          const newImageFile = createCustomImage(currentFiles[i]);
          stateLenght++;
          setCustomImageList((prev) => [...prev, newImageFile]);
        }
      }
    }
    e.target.value = "";
  };

  /**
   * 선택한 이미지를 drop 으로 추가시키는 함수
   * @param e onDrop 이벤트
   */
  const handleAddImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.items;
    let stateLenght = customImageList.length;
    for (let i = 0; i < data.length; i++) {
      const imageFile = data[i].getAsFile();
      if (!imageFile) return;

      const validateFileSizeResult = validateFileSize(imageFile, 10);
      const validateFileTypeResult = validateFileType(imageFile);
      const validateCountResult = validateCount(stateLenght, limitCount);

      if (!validateFileSizeResult.isPass) {
        alertFire(validateFileSizeResult.msg, "error");
        break;
      } else if (!validateFileTypeResult.isPass) {
        alertFire(validateFileTypeResult.msg, "error");
        break;
      } else if (!validateCountResult.isPass) {
        alertFire(validateCountResult.msg, "error");
        break;
      } else {
        const newImageFile = createCustomImage(imageFile);
        stateLenght++;
        setCustomImageList((prev) => [...prev, newImageFile]);
      }
    }
    setIsEnter(false);
  };

  /**
   * 선택한 이미지를 state에서 제외시키는 함수
   * @param e onClick 이벤트
   * @param customImage 선택한 이미지
   */
  const handleDeleteImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, customImage: CustomImage) => {
    e.preventDefault();
    setCustomImageList((prev) => [...prev.filter((n) => n.id !== customImage.id)]);
  };

  /**
   * [스타일 관련] drageOver의 이벤트를 prevent 하는 함수
   * @param e : onDragOver 이벤트
   */
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  /**
   * [스타일 관련] DragEnter를 감지하는 함수
   * @param e : onDragEnter 이벤트
   */
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsEnter(true);
  };

  /**
   * [스타일 관련] DragLeave를 감지하는 함수
   * @param e : onDragLeave이벤트
   */
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    const relatedTarget = e.relatedTarget;
    if (e.currentTarget.contains(relatedTarget as Node)) return;
    setIsEnter(false);
  };

  const handler = {
    handleAddImageChange,
    handleAddImageDrop,
    handleDeleteImageClick,
    handleDragEnter,
    handleDragLeave,
    handleDragOver
  };

  return {
    customImageList,
    isEnter,
    handler,
    addPreImage
  };
};
