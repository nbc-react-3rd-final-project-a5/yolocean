import { v4 as uuidv4 } from "uuid";

const useStorage = () => {
  /**
   *  이미지 파일 업로드할 때 image의 이름을 생성하는 함수
   * @param fileList file의 Array
   * @returns uuid로 생성된 id Array
   */
  const createImagesId = (fileList: File[]): string[] => {
    const imageCount = Array.from(fileList).length;
    const imageIdList = new Array(imageCount);
    imageIdList.map((n) => (n = uuidv4()));
    return imageIdList;
  };

  /**
   * 이미지 파일을 업로드하는 함수
   * @param file 업로드할 파일
   * @param bucket storage의 bucktet명
   * @param imageId 지정할 파일 이미지명
   * @param targetId bucket의 path로 설정할 주소
   * @returns 이미지 URL
   */
  const uploadImage = async (file: File, bucket: string, imageId: string, targetId: string): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    formData.append("imageId", imageId);
    formData.append("targetId", targetId);

    const res = await fetch("/api/storage", {
      method: "POST",
      body: formData
    });

    const url = await res.json();

    return url;
  };

  /**
   * 여러 이미지 파일을 한번에 업로드하는 함수
   * @param fileList 업로드할 file의 Array
   * @param bucket storage의 bucktet명
   * @param imageId 지정할 파일 이미지명의 Array
   * @param targetId bucket의 path로 설정할 주소
   * @returns 이미지 URL의 Array
   */
  const uploadMultipleImages = async (
    fileList: File[],
    bucket: string,
    imageId: string[],
    targetId: string
  ): Promise<string[] | null> => {
    if (fileList.length === 0) {
      console.error("uploadMultipleImages : 업로드할 파일이 없습니다.");
      return null;
    }
    const promiseList = fileList.map(async (file, i) => {
      const res = await uploadImage(file, bucket, imageId[i], targetId);
      return res;
    });

    try {
      const res = await Promise.all(promiseList);
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { createImagesId, uploadImage, uploadMultipleImages };
};

export default useStorage;
