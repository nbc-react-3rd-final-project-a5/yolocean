import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomImage } from "@/types/form";

// TODO : checkFileSize, checkImageType 추가
const validateImage = (imageFile: File) => {
  const checkFileType = imageFile.type.split("/")[0] === "image";
  const checkFileSize = true;
  const checkImageType = true;

  return checkFileType && checkFileSize && checkImageType;
};

const createCustomImage = (imageFile: File) => {
  const newCustomImage: CustomImage = {
    file: imageFile,
    previewURL: URL.createObjectURL(imageFile),
    id: uuidv4()
  };

  return newCustomImage;
};

export const useImageInput = (inputType: "single" | "multiple") => {
  const [customImage, setCustomImage] = useState<CustomImage>();
  const [customImageList, setCustomImageList] = useState<CustomImage[]>([]);
  const [isEnter, setIsEnter] = useState(false);

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

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = e.currentTarget.files;
    const currentImageFiles: CustomImage[] = [];
    if (!!currentFiles) {
      for (let i = 0; i < currentFiles?.length; i++) {
        if (validateImage(currentFiles[i])) {
          const newImageFile = createCustomImage(currentFiles[i]);
          currentImageFiles.push(newImageFile);
        }
      }
    }

    if (inputType === "single") {
      setCustomImage(currentImageFiles[0]);
      return (e.currentTarget.files = null);
    }
    currentImageFiles.length > 0 && setCustomImageList((prev) => [...prev, ...currentImageFiles]);
    return (e.currentTarget.files = null);
  };

  const handleAddImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const currentImageFiles: CustomImage[] = [];
    const data = e.dataTransfer.items;

    for (let i = 0; i < data.length; i++) {
      if (data[i].kind === "file" && data[i].type.match("^image/")) {
        const imageFile = data[i].getAsFile();

        if (!!imageFile && validateImage(imageFile)) {
          const newImageFile = createCustomImage(imageFile);
          currentImageFiles.push(newImageFile);
        }
      }
    }

    if (inputType === "single") {
      return setCustomImage(currentImageFiles[0]);
    }
    currentImageFiles.length > 0 && setCustomImageList((prev) => [...prev, ...currentImageFiles]);
  };

  const handleDeleteImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, customImage: CustomImage) => {
    e.preventDefault();
    setCustomImageList((prev) => [...prev.filter((n) => n.id !== customImage.id)]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    handleAddImageDrop(e);
    setIsEnter(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    setIsEnter(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    const relatedTarget = e.relatedTarget;
    if (e.currentTarget.contains(relatedTarget as Node)) return;
    setIsEnter(false);
  };

  const handler = {
    handleAddImageChange,
    handleDeleteImageClick,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop
  };

  return {
    customImage,
    customImageList,
    isEnter,
    handler,
    addPreImage
  };
};
