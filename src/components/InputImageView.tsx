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
          <figure key={i} draggable="true" className="w-[354px] h-[118px] overflow-hidden bg-gray-100">
            <Image
              src={n.previewURL}
              alt=""
              className="w-auto h-[118px] mx-auto border border-line rounded-[5px]"
              width={1920}
              height={640}
              onClick={(e) => handleDeleteImageClick(e, n)}
            />
          </figure>
        );
      })}
    </div>
  );
};

export default InputImageView;
