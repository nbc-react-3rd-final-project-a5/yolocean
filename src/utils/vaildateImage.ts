interface ValidateReturn {
  isPass: boolean;
  msg: EnumReturnMsg;
}

enum EnumReturnMsg {
  valid = "성공",
  inValidSize = "허용되는 이미지 크기를 초과했습니다.",
  inValidType = "허용되는 이미지 타입이 아닙니다.",
  inValidCount = "허용되는 이미지의 개수를 초과했습니다."
}

const validType = ["image/png", "image/webp", "image/jpeg"];

const createReturn = (isPass: boolean, type: keyof typeof EnumReturnMsg): ValidateReturn => {
  return {
    isPass: isPass,
    msg: EnumReturnMsg[type]
  };
};

const validateFileSize = (imageFile: File, maxFileSizeMB: number): ValidateReturn => {
  const validFileSize = 1048 * 1048 * maxFileSizeMB;
  const isValid = imageFile.size <= validFileSize;

  return isValid ? createReturn(true, "valid") : createReturn(false, "inValidSize");
};

const validateFileType = (imageFile: File): ValidateReturn => {
  const isValid = validType.includes(imageFile.type);
  return isValid ? createReturn(true, "valid") : createReturn(false, "inValidType");
};

const validateCount = (stateCount: number, limitCount: number): ValidateReturn => {
  const isValid = stateCount < limitCount;
  console.log("stateCount", stateCount);
  console.log("maxCount", limitCount);
  return isValid ? createReturn(true, "valid") : createReturn(false, "inValidCount");
};

export type { ValidateReturn };
export { validateFileSize, validateFileType, validateCount };
