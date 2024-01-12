import React from "react";
import { CustomImage } from "@/types/form";
import Image from "next/image";

interface Props {
  customImageList: CustomImage[];
  handleDeleteImageClick: (e: React.MouseEvent<HTMLImageElement, MouseEvent>, file: CustomImage) => void;
}

const InputImageView = ({ customImageList, handleDeleteImageClick }: Props) => {
  return (
    <div className="flex gap-[15px] min-h-[118px] flex-wrap ">
      {customImageList?.map((n, i) => {
        return (
          <div key={i} draggable="true" className="w-[118px] h-[118px] overflow-hidden bg-gray-100">
            <Image
              src={n.previewURL}
              alt=""
              className="w-auto h-[118px] mx-auto"
              width={118}
              height={118}
              onClick={(e) => handleDeleteImageClick(e, n)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default InputImageView;
