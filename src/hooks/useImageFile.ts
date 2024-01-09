import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
interface CustomImageFile {
  file: File;
  url: string;
  id: string;
}

// TODO : checkFileSize, checkImageType 추가
const validateFile = (imageFile: File) => {
  const checkFileType = imageFile.type.split("/")[0] === "image";
  const checkFileSize = true;
  const checkImageType = true;

  return checkFileType && checkFileSize && checkImageType;
};

const createImageFileObj = (imageFile: File) => {
  const newImageFile: CustomImageFile = {
    file: imageFile,
    url: URL.createObjectURL(imageFile),
    id: uuidv4()
  };

  return newImageFile;
};

const useImageFile = () => {
  const [imageFiles, setImageFiles] = useState<CustomImageFile[]>([]);

  const onChangeImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = e.currentTarget.files;
    const currentImageFiles: CustomImageFile[] = [];
    if (!!currentFiles) {
      for (let i = 0; i < currentFiles?.length; i++) {
        if (validateFile(currentFiles[i])) {
          const newImageFile = createImageFileObj(currentFiles[i]);
          currentImageFiles.push(newImageFile);
        }
      }
    }

    currentImageFiles.length > 0 && setImageFiles((prev) => [...prev, ...currentImageFiles]);
    return (e.currentTarget.files = null);
  };

  const OnDropFiles = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const currentImageFiles: CustomImageFile[] = [];
    const data = e.dataTransfer.items;

    for (let i = 0; i < data.length; i++) {
      if (data[i].kind === "file" && data[i].type.match("^image/")) {
        const imageFile = data[i].getAsFile();

        if (!!imageFile && validateFile(imageFile)) {
          const newImageFile = createImageFileObj(imageFile);
          currentImageFiles.push(newImageFile);
        }
      }
    }
    currentImageFiles.length > 0 && setImageFiles((prev) => [...prev, ...currentImageFiles]);
  };

  const onClickDeleteImage = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, file: CustomImageFile) => {
    e.preventDefault();
    setImageFiles((prev) => [...prev.filter((n) => n.id !== file.id)]);
  };

  return {
    imageFiles,
    onChangeImageFiles,
    OnDropFiles,
    onClickDeleteImage
  };
};

export default useImageFile;
