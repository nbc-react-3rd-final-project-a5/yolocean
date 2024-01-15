import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export const Postcode = ({ setAddress }: { setAddress: React.Dispatch<React.SetStateAction<string>> }) => {
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress);
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type="button" className="border border-black w-[200px] mx-auto bg-slate-300" onClick={handleClick}>
      주소 검색하기
    </button>
  );
};
