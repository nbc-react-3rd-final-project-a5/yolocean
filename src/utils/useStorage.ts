const useStorage = () => {
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

  const deleteImage = async (bucket: string, url: string) => {
    const chunk = url.split("/").reverse();
    // userId, productId, imageId 순서
    // path : userId + productId
    const imageId = chunk[0];
    const path = chunk[2].length === 36 ? `${chunk[2]}/${chunk[1]}` : chunk[1];

    const imageInfo = {
      bucket,
      path,
      imageId
    };
    try {
      const res = await fetch("/api/storage", {
        method: "DELETE",
        body: JSON.stringify(imageInfo)
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("💥💥💥 useStorage : deleteImage 오류 발생 💥💥💥");
      return null;
    }
  };

  const deleteMultipleImage = async (bucket: string, urlList: string[]) => {
    const promiseList = urlList.map(async (url) => {
      const res = await deleteImage(bucket, url);
      return res;
    });

    try {
      const res = await Promise.all(promiseList);
      return res;
    } catch (error) {
      console.error("💥💥💥 useStorage : deleteMultipleImage 오류 발생 💥💥💥");
      return null;
    }
  };

  return { uploadImage, uploadMultipleImages, deleteImage, deleteMultipleImage };
};

export default useStorage;
