import React, { useState } from "react";
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

  const uploadImage = async (file: File, bucket: string, imageId: string, targetId: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    formData.append("imageId", imageId);
    formData.append("targetId", targetId);

    const res = await fetch("/api/storage", {
      method: "POST",
      body: formData
    });

    return res;
  };

  const uploadMultipleImages = async (bucket: string, imageId: string[], targetId: string) => {
    const fetchUploadImages = imageFiles.map(async (n, i) => {
      const file = n.file;
      const res = await uploadImage(file, bucket, imageId[i], targetId);
      return res;
    });

    try {
      const res = await Promise.all(fetchUploadImages);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    imageFiles,
    onChangeImageFiles,
    OnDropFiles,
    onClickDeleteImage,
    uploadImage,
    uploadMultipleImages
  };
};

export default useImageFile;
